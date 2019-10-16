import {Entity, Options} from '../typings'
import path from 'path'
import fs from 'fs'
// import

export default class ListGenerator {
  generate ({entities, option}: { entities: Entity[], option: Options }): void {
    let content = getContent(entities)
    let dir = path.resolve(option.target, 'route')
    fs.mkdir(dir, {recursive: true}, (err) => {
      if (!err) {
        fs.writeFile(path.resolve(path.resolve(dir, `route.js`)), content, err => {
          if (err) {
            console.error('generate form vue route file success', err)
          }
        })
      }
    })
  }
}

function getContent (entities: Entity[]): string {
  let route: string[] = []
  entities.forEach(({name}) => {
    let lName = name.slice(0, 1).toLowerCase() + name.slice(1)
    route.push(`{
    name: '${lName}s',
    path: '${lName}s',
    component: () => import('../component/${name}s')
  }`)
  })
  return `[${route.join(',')}]`
}
