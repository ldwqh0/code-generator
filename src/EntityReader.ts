import { Entity, Options } from './typings'
import fs from 'fs'
import path from 'path'

export default class EntityReader {
  listEntities (option: Options): Promise<Entity[]> {
    return this.listFiles(option.source).then((entities) => {
      return entities
    })
  }

  listFiles (source: string): Promise<Entity[]> {
    return new Promise<Entity[]>((resolve, reject) => {
      fs.readdir(source, (error, files) => {
        if (error) {
          reject(new Error('读取目录时出错'))
        } else {
          let entities: Entity[] = files.filter(file => file.endsWith('.java'))
            .map(file => ({
              file: path.resolve(source, file),
              name: file.replace('.java', ''),
              fields: [],
              valueType: ''
            }))
          let all = entities.map(entity => listFields(entity))
          Promise.all(all).then((results) => {
            resolve(results)
          })
        }
      })
    })
  }
}

function listFields (entity: Entity): Promise<Entity> {
  return new Promise<Entity>((resolve, reject) => {
    fs.readFile(entity.file, 'utf8', (error, content) => {
      if (!error) {
        let lines = content.split('\n')
          .map(line => line.replace('\t', ''))
          .map(line => line.replace('\r', ''))
          .map(line => line.replace(';', ''))
          .map(line => line.trim())
          .filter(line => line.indexOf('static final') < 0)
          .filter(line => line.startsWith('private'))
          .map(line => line.split(' '))
          .map(([p, type, name]) => ({ type, name }))
        entity.fields = lines
        let [valueType] = content.split('\n')
          .filter(line => line.indexOf('class') > 0)
          .map(line => line.split('<'))
          .map(([a, b]) => b)
          .map(line => line.split('>'))
          .map(([a]) => a)
        entity.valueType = valueType
        resolve(entity)
      } else {
        reject(error)
      }
    })
  })
}
