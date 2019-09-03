# ym-mongodb-sql

将 mongodb 的 json 参数转换为 sql 语句，通过较少的更改实现[mogodb](https://www.npmjs.com/package/mongodb)数据库向 mysql 数据库的迁移

## 安装

```sh
npm i ym-mongodb-sql
```

或者可通过 npm 的 github 安装方式安装模块

```sh
npm i fanyingmao/ym-mongodb-sql
```

## 使用

### find 方法

```js
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

### delete 方法

```js
let ym = require("ym-mogodb-sql");

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

### update 方法

```js
let ym = require('ym-mogodb-sql');

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

### insert 方法

```js
let ym = require('ym-mogodb-sql');

let {sql, valueArr} = ym.insert('tlf_user',{name : 'mysql',email:'123456@qq.com'});

console.log('sql : ' + sql);
console.log('valueArr : ' + valueArr);

// sql : insert into tlf_user (name,email) values (?,?);
// valueArr : mysql,123456@qq.com
```

其它方法和查询条件当前项目未用到所以还有待开发

### Typescript 例子，这里只有 find 例子，其它方法类似

```ts
import MongodbSql from 'ym-mogodb-sql'

let res = MongodbSql.find("tlf_user", { id: { $in: [] } }, { name: 1 });
console.log('sql : ' + res.sql);
console.log('valueArr : ' + res.valueArr);
```
