/**
 * Container options.
 */
export interface SqlRes {
  sql: string;
  valueArr: string[];
}

export default class MongodbSql {
  static dealQuery(query: any): SqlRes;

  static find(tableName: string, query: any, fields: any, optSql?: string): SqlRes;

  static delete(tableName: string, query: any, fields: any, optSql?: string): SqlRes;

  static update(tableName: string, query: any, setObj: any, optSql?: string): SqlRes;
}
