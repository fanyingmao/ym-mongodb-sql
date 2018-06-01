import MongodbSql from './index'

let a = MongodbSql.find("tlf_user", { id: { $in: [] } }, { name: 1 });
console.log(a.sql + "   " + a.valueArr);