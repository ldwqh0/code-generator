import path from 'path'
import fs from 'fs'

export default abstract class AbstractGenerator {
  target: string

  constructor ({ target }: { target: string }) {
    this.target = target
  }

  generate (cls: Entity) {
    let content = this.getContent(cls)
    let target = path.resolve(this.target)
    let filename = this.getFileName(this.target, cls)
    fs.mkdir(path.dirname(filename), { recursive: true }, () => {
      let fileName = filename
      fs.writeFile(fileName, content, 'utf8', err => {
        if (err) {
          console.error(err)
        }
      })
    })
  }

  abstract getContent (cls: Entity): string

  abstract getFileName (target: string, cls: Entity): string
}
