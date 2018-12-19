import path from 'path'
import fs from 'fs'

export default abstract class AbstractGenerator {
  path: string
  packageName: string
  classSuffix: string
  subPackage: string

  constructor ({ path, subPackage, classSuffix }: { path: string, subPackage: string, classSuffix: string }) {
    this.path = path
    this.subPackage = subPackage
    this.classSuffix = classSuffix
  }

  lowCaseFirstChar (str: string) {
    return str.substring(0, 1).toLowerCase() + str.substring(1)
  }

  generate (cls: Entity) {
    let content = this.getContent(cls)
    let target = path.resolve(this.path, ...this.subPackage.split('.'))
    fs.mkdir(target, { recursive: true }, () => {
      let fileName = path.resolve(target, `${cls.className}${this.classSuffix}.java`)
      fs.writeFile(fileName, content, 'utf8', err => {
        if (err) {
          console.log()
        }
      })
    })
  }

  abstract getContent (cls: Entity): string
}
