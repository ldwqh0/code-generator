import FormGenerator from './FormGenerator'
import ListGenerator from './ListGenerator'
import RouterGenerator from './RouterGenerator'

export default class VueGenerator {
  formGenerator: FormGenerator
  listGenerator: ListGenerator
  routerGenerator: RouterGenerator

  constructor ({ target }: { target: string }) {
    this.formGenerator = new FormGenerator(target)
    this.listGenerator = new ListGenerator(target)
    this.routerGenerator = new RouterGenerator(target)
  }

  generate (entities: Entity[]) {
    for (let entity of entities) {
      this.formGenerator.generate(entity)
      this.listGenerator.generate(entity)
    }
    this.routerGenerator.generate(entities)
  }
}
