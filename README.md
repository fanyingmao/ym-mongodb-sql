# ym-mongodb-sql
将mongodb的json参数转换为sql语句，通过较少的更改实现[mogodb](https://www.npmjs.com/package/mongodb)模块到mysql数据库的替换
## 安装
由于项目不完全就没提交至npm，可通过npm的github安装方式安装模块
```
npm i fanyingmao/ym-mongodb-sql
```
## 使用
### find方法
```
let ym = require("ym-mogodb-sql");

let {sql, valueArr} = ym.find("tlf_user", {
  $or: [{email: {$regex: "*", $options: 'g'}, eail: {$regex: "*", $options: 'g'}}],
  $nor: [{mobile: {$regex: "*", $options: 'g'}, emil: {$regex: "*", $options: 'g'}}],
  id: {$in: [1, 2, "3"]}
}, {name: 1});

console.log("sql : " + sql);
console.log("valueArr : " + valueArr);

//sql : select name from tlf_user  where (email regexp * or eail regexp *) and !(mobile regexp * or emil regexp *) and id in (?,?,?);
//valueArr : 1,2,3

```
其它方法和查询条件当前项目未用到所以还有待开发
## 扩展
实际上已经有类似更加完善的项目[mongo-sql](https://www.npmjs.com/package/mongo-sql)，但其转出的sql语句好像无法直接使用，且传参并没有和[mogodb](https://www.npmjs.com/package/mongodb)一致所以不太适用我的场景。
