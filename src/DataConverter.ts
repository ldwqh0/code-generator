import config from '../config/config'
import { getClassName, getFieldName } from './utils'
import datas from '../test.json'

function converterField ({ autoincrement, columnName, comment, dataType, length, nullable, type }: any): Field {
  return {
    name: getFieldName(columnName),
    comment: comment,
    type: type,
    length: length,
    nullable: nullable,
    columnName: columnName
  }

}

function converterTable ({ comment, catalog, schema, tableName, columns }: any): Entity {
  let fields = columns.map(converterField)
  return {
    superClass: config.superClass,
    eintityName: tableName,
    className: getClassName(tableName),
    comment,
    packageName: config.packageName,
    idClass: config.idClass,
    fields
  }
}

export default {
  readData (): Entity[] {
    return datas.map(converterTable)
  }
}
