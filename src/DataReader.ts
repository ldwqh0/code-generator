// import './@types'
import xlsx, { WorkSheet } from 'node-xlsx'
import config from '../config/config'

const typeMap = new Map<string, string>()
typeMap.set('bigint', 'Long')
typeMap.set('int', 'Integer')
typeMap.set('date', 'LocalDate')
typeMap.set('datetime', 'ZonedDateTime')
typeMap.set('varchar', 'String')
typeMap.set('float', 'Float')

function upcaseFirstChar (str: string): string {
  return str.substring(0, 1).toUpperCase() + str.substring(1)
}

function lowcaseFirstChar (str: string): string {
  try {
    return str.substring(0, 1).toLocaleLowerCase() + str.substring(1)
  } catch (e) {
    console.error('转换小写错误', str, e)
    return ''
  }
}

function getColumnDefine (columnStr: string): { type: string, length?: number } {
  let defines = columnStr.split(/(\(|\))/)
  let [sqlType, , length] = defines
  let javaType: string = typeMap.get(sqlType.toLocaleLowerCase())
  if (javaType !== undefined) {
    if (javaType === 'String') {
      return {
        type: javaType,
        length: Number.parseInt(length)
      }
    } else {
      return { type: javaType }
    }
  } else {
    console.error(sqlType, 'not found')
  }

}

function getClassName (name: string): string {
  return name.split('_').map(str => upcaseFirstChar(str)).join('')
}

function getFieldName (name: string): string {
  return lowcaseFirstChar(name.split('_').map(str => upcaseFirstChar(str)).join(''))
}

export default {
  readData ({ source, packageName, superClass }: JavaGeneratorConfig): Entity[] {
    let worksheets: WorkSheet[] = xlsx.parse(source)
    let result: Entity[] = []
    for (let { name, data } of worksheets) {
      let fields: Field[] = []
      for (let i = 1; i < data.length; i++) {
        let col = data[i]
        try {
          let { type, length } = getColumnDefine(col[1])
          let filed: Field = {
            name: getFieldName(col[0]),
            columnName: col[0],
            type: type,
            comment: col[3],
            nullable: col[2] === 'NO' ? true : false
          }
          if (length !== undefined) {
            filed.length = length
          }
          fields.push(filed)
        } catch (e) {
          console.error('读取错误,发生在sheet', name, '第', i, '行')
        }
      }

      result.push({
        eintityName: name,
        superClass,
        className: getClassName(name),
        comment: '',
        idClass: config.idClass,
        packageName,
        fields
      })
    }
    return result
  }
}
