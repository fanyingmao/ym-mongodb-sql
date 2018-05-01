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
          case '$in':
            let arr = itme[key2];
            values.push(...arr);
            queryItem.push(key + ' in (' + arr.map(m => {
              return '?'
            }).join(',') + ')');
            break;
          case '$regex':
            values.push();
            queryItem.push(key + ' regexp ' + itme[key2]);
            break;
        }
      });
    }
    else {
      values.push(itme);
      queryItem.push(key + ' = ?');
    }
    return {queryItem: queryItem.join(' and '), values: values};
  };

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
          case '$or':
            let $orQuery = [];
            query[key].forEach(item => {
              Object.keys(item).forEach(key2 => {
                let {queryItem, values} = MongodbSql.dealItem(key2, item[key2]);
                valueArr.push(...values);
                $orQuery.push(queryItem);
              });
            });
            queryArr.push('(' + $orQuery.join(' or ') + ')');
            break;
          case '$nor':
            let $norQuery = [];
            query[key].forEach(item => {
              Object.keys(item).forEach(key2 => {
                let {queryItem, values} = MongodbSql.dealItem(key2, item[key2]);
                valueArr.push(...values);
                $norQuery.push(queryItem);
              });
            });
            queryArr.push('!(' + $norQuery.join(' or ') + ')');
            break;
          default:
            let {queryItem, values} = MongodbSql.dealItem(key, query[key]);
            valueArr.push(...values);
            queryArr.push(queryItem);
            break;
        }
      });
      querySql += queryArr.join(' and ');
    }
    if (!optSql) {
      optSql = '';
    }
    else {
      optSql = ' ' + optSql;
    }
    let sql = 'select ' + fieldSql + ' from ' + tableName + ' ' + querySql + optSql + ';';
    // 显示带参数sql语句
    // for (let i = 0; i < valueArr.length; i++) {
    //   sql = sql.replace("?", valueArr[i]);
    // }
    // console.log('sql : ' + sql);
    return {sql,valueArr};
  };
}

module.exports = MongodbSql;
