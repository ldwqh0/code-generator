import { upcaseFirstChar } from '../utils'
import path from 'path'
import fs from 'fs'

export default class RouterGenerator {
  target: string

  constructor (target: string) {
    this.target = target
  }

  generate (entities: Entity[]) {
    let content = this.getContent(entities)
    let filename = path.resolve(this.target, 'route', 'index.js')
    fs.mkdir(path.dirname(filename), { recursive: true }, () => {
      fs.writeFile(filename, content, 'utf8', err => {
        if (err) {
          console.error(err)
        }
      })
    })
  }

  getContent (entity: Entity[]) {
    return `export default [${entity.map(this.getRoute).join(',')}]`
  }

  getRoute (entity: Entity) {
    return `{
      // ${entity.className} ${entity.comment}
      name: '${upcaseFirstChar(entity.className)}s',
      path: '${upcaseFirstChar(entity.className)}s',
      component: () => import('../component/${entity.className}s')
    }`
  }
}
