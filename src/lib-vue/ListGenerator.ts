import AbstractGenerator from './AbstractGenerator'

export default class ListGenerator extends AbstractGenerator {
  constructor (target: string) {
    super({ target })
  }

  getContent (cls: Entity): string {
    return ''
  }

}
