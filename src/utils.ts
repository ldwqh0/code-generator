export function upcaseFirstChar (str: string): string {
  return str.substring(0, 1).toUpperCase() + str.substring(1)
}

export function lowcaseFirstChar (str: string): string {
  try {
    return str.substring(0, 1).toLocaleLowerCase() + str.substring(1)
  } catch (e) {
    console.error('转换小写错误', str, e)
    return ''
  }
}

export function getClassName (name: string): string {
  return name.split('_').map(str => upcaseFirstChar(str)).join('')
}

export function getFieldName (name: string): string {
  return lowcaseFirstChar(name.split('_').map(str => upcaseFirstChar(str)).join(''))
}
