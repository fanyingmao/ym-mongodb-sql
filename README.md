# ym-mongodb-sql
将mongodb的json参数转换为sql语句，通过较少的更改实现[mogodb](https://www.npmjs.com/package/mongodb)模块到mysql数据库的替换
## 安装
```
npm i ym-mongodb-sql
```
或者可通过npm的github安装方式安装模块
```
npm i fanyingmao/ym-mongodb-sql
```
## 使用
### find方法
```javaScript
let ym = require("ym-mogodb-sql");

let {sql, valueArr} = ym.find("tlf_user", {
  $or: [{email: {$regex: "*", $options: 'g'}, eail: {$regex: "*", $options: 'g'}}],
  $nor: [{mobile: {$regex: "*", $options: 'g'}, emil: {$regex: "*", $options: 'g'}}],
  id: {$in: [1, 2, "3"]}
}, {name: 1});

console.log("sql : " + sql);
console.log("valueArr : " + valueArr);

// sql : select name from tlf_user  where (email regexp ? or eail regexp ?) and !(mobile regexp ? or emil regexp ?) and id in (?,?,?);
// valueArr : *,*,*,*,1,2,3

```
### delete方法
```javaScript
let ym = require("./index");

let {sql, valueArr} = ym.delete("tlf_user", {
  $or: [{email: {$regex: "*", $options: 'g'}, eail: {$regex: "*", $options: 'g'}}],
  $nor: [{mobile: {$regex: "*", $options: 'g'}, emil: {$regex: "*", $options: 'g'}}],
  id: {$in: [1, 2, "3"]}
});

console.log("sql : " + sql);
console.log("valueArr : " + valueArr);
// sql : delete  from tlf_user  where (email regexp ? or eail regexp ?) and !(mobile regexp ? or emil regexp ?) and id in (?,?,?);
// valueArr : *,*,*,*,1,2,3
```
### update方法
```javaScript
let ym = require('./index');

let {sql, valueArr} = ym.update('tlf_user', {
  $or: [{email: {$regex: '*', $options: 'g'}, eail: {$regex: '*', $options: 'g'}}],
  $nor: [{mobile: {$regex: '*', $options: 'g'}, emil: {$regex: '*', $options: 'g'}}],
  id: {$in: [1, 2, '3']}
},{name : 'mysql',email:'123456@qq.com'});

console.log('sql : ' + sql);
console.log('valueArr : ' + valueArr);
// sql : update tlf_user set name = ?,email = ?  where (email regexp ? or eail regexp ?) and !(mobile regexp ? or emil regexp ?) and id in (?,?,?);
// valueArr : mysql,123456@qq.com,*,*,*,*,1,2,3
```
### insert方法
```javaScript
let ym = require('./index');

let {sql, valueArr} = ym.insert('tlf_user',{name : 'mysql',email:'123456@qq.com'});

console.log('sql : ' + sql);
console.log('valueArr : ' + valueArr);

// sql : insert into tlf_user (name,email) values (?,?);
// valueArr : mysql,123456@qq.com
```
其它方法和查询条件当前项目未用到所以还有待开发

### TS支持例子
```typeScript

import MongodbSql from './index'

let a = MongodbSql.find("tlf_user", { id: { $in: [] } }, { name: 1 });
console.log(a.sql + "   " + a.valueArr);
```


## 扩展
实际上已经有类似更加完善的项目[mongo-sql](https://www.npmjs.com/package/mongo-sql)，但其转出的sql语句好像无法直接使用，且传参并没有和[mogodb](https://www.npmjs.com/package/mongodb)一致所以不太适用我的场景。
