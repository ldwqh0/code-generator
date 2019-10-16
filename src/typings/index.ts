export interface Field {
  name: string,
  type: string
}

export interface Entity {
  name: string,
  file: string,
  // valueType: string,
  fields: Field[]
}

export interface Options {
  source: string,
  target: string,
  packageName?: string
}
