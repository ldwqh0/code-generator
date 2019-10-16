import {Entity, Options} from '../typings'
import path from 'path'
import fs from 'fs'
// import

export default class ListGenerator {
  generate ({entities, option}: { entities: Entity[], option: Options }): void {
    let content = getContent(entities)
    let dir = path.resolve(option.target, 'vuex')
    fs.mkdir(dir, {recursive: true}, (err) => {
      if (!err) {
        fs.writeFile(path.resolve(path.resolve(dir, `vuex.js`)), content, err => {
          if (err) {
            console.error('generate form vue route file success', err)
          }
        })
      }
    })
  }
}

function getContent (entities: Entity[]): string {
  let vuex: string[] = []
  entities.forEach(({name}) => {
    let lName = name.slice(0, 1).toLowerCase() + name.slice(1)
    vuex.push(`${lName}: new BaseState({url: \`\${BASE_PATH}/${lName}s\`})`)
  }
  )
  return `{${vuex.join(',\r\n')}}`
}
