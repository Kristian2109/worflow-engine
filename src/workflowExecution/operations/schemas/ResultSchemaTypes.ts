export default interface ResultSchemaType {
  dataType: 'string' | 'json' | 'csv',
}

export interface StringSchema {
  dataType: 'string'
}

export interface JsonSchema {
  dataType: 'json',
  schema: JSON,
}

export interface CsvSchema {
  dataType: 'csv',
  columns: string[],
}
