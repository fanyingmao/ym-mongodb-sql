// index.js
// Created by fanyingmao 五月/01/2018
//
class MongodbSql {
  static dealItem(key, itme,) {
    let queryItem = [], values = [];
    if (typeof itme === 'object') {
      let valueKeys = Object.keys(itme);
      valueKeys.forEach(key2 => {
          switch (key2) {
            case
            '$in':
              let arr = itme[key2];
              values.push(...arr
              );
              queryItem.push(key + ' in (' + arr.map(m => {
                return '?'
              }).join(',') + ')'
              );
              break;
            case
            '$regex':
              values.push(itme[key2]);
              queryItem.push(key + ' regexp ' + '?');
              break;
          }
        }
      )
      ;
    }
    else {
      values.push(itme);
      queryItem.push(key + ' = ?');
    }
    return {queryItem: queryItem.join(' and '), values: values};
  };

  static dealQuery(query) {
    let queryKeys = Object.keys(query);
    let querySql;
    let valueArr = [];//参数统一放入数组，防止sql注入
    if (queryKeys.length === 0) {
      querySql = '';
    }
    else {
      querySql = ' where ';
      let queryArr = [];
      queryKeys.forEach(key => {
          switch (key) {
            case
            '$or'
            :
              let $orQuery = [];
              query[key].forEach(item => {
                Object.keys(item).forEach(key2 => {
                  let {queryItem, values} = MongodbSql.dealItem(key2, item[key2]);
                  valueArr.push(...values
                  )
                  ;
                  $orQuery.push(queryItem);
                })
                ;
              })
              ;
              if ($orQuery.length > 0) {
                queryArr.push('(' + $orQuery.join(' or ') + ')');
              }
              break;
            case
            '$nor'
            :
              let $norQuery = [];
              query[key].forEach(item => {
                Object.keys(item).forEach(key2 => {
                  let {queryItem, values} = MongodbSql.dealItem(key2, item[key2]);
                  valueArr.push(...values
                  )
                  ;
                  $norQuery.push(queryItem);
                })
                ;
              })
              ;
              if ($norQuery.length > 0) {
                queryArr.push('!(' + $norQuery.join(' or ') + ')');
              }
              break;
            default:
              let {queryItem, values} = MongodbSql.dealItem(key, query[key]);
              valueArr.push(...values
              )
              ;
              queryArr.push(queryItem);
              break;
          }
        }
      )
      ;
      querySql += queryArr.join(' and ');
    }
    return {querySql, valueArr}
  }

  /**
   * 生成sql查询语句
   * @param tableName 表名
   * @param query 相等查询
   * @param fields 字段筛选
   * @param optSql 其它sql语句
   * @returns {*} promise结果返回
   */
  static find(tableName, query, fields, optSql) {
    let fieldsKeys;
    if (!fields) {
      fieldsKeys = [];
    }
    else {
      fieldsKeys = Object.keys(fields);
    }
    let fieldSql;
    if (fieldsKeys.length === 0) {
      fieldSql = '*';
    }
    else {
      fieldSql = fieldsKeys.join(',');
    }

    let {querySql, valueArr} = MongodbSql.dealQuery(query);
    if (!optSql) {
      optSql = '';
    }
    else {
      optSql = ' ' + optSql;
    }
    let sql = 'select ' + fieldSql + ' from ' + tableName + ' ' + querySql + optSql + ';';
    return {sql, valueArr};
  };

  static delete(tableName, query, optSql) {
    let {querySql, valueArr} = MongodbSql.dealQuery(query);
    if (!optSql) {
      optSql = '';
    }
    else {
      optSql = ' ' + optSql;
    }
    let sql = 'delete ' + ' from ' + tableName + ' ' + querySql + optSql + ';';
    return {sql, valueArr};
  };

  static update(tableName, query, setObj, optSql) {
    let {querySql, valueArr} = MongodbSql.dealQuery(query);
    if (!optSql) {
      optSql = '';
    }
    else {
      optSql = ' ' + optSql;
    }

    let setKeys = Object.keys(setObj);

    let setSql = setKeys.map(item => item + ' = ?').join(',');

    valueArr = [...setKeys.map(item => setObj[item]), valueArr];
    let sql = 'update ' + tableName + ' set ' + setSql + ' ' + querySql + optSql + ';';
    return {sql, valueArr};
  };

}

module.exports = MongodbSql;
