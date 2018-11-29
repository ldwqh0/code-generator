declare module 'node-xlsx' {
  export interface WorkSheet {
    name: string,
    data: any[]
  }

  export function parse (file: string): WorkSheet[]

}

declare interface Field {
  /**
   * 字段的名称
   */
  name: string,
  /**
   * 字段的注释
   */
  comment?: string
  /**
   * 字段的类型
   */
  type?: string,
  /**
   * 字段的长度
   */
  length?: number,
  /**
   * 是否为空
   */
  nullable?: boolean,
  /**
   * 字段名称
   */
  columnName: string

}

declare interface Entity {
  /**
   * 父类
   */
  superClass: string,
  /**
   * 名字
   */
  eintityName: string,

  /**
   * 类名称
   */
  className: string,
  /**
   * 注释
   */
  comment?: string,
  /**
   * 字段列表
   */
  fields?: Field[],
  /**
   * 包名称
   */
  packageName: string,

  idClass?: string
}

interface JavaGeneratorConfig {
  target: string
  packageName: string,
  source: string,
  superClass: string,
  idClass: string
}
