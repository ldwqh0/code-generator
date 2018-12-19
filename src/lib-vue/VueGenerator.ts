import FormGenerator from './FormGenerator'
import ListGenerator from './ListGenerator'

export default class VueGenerator {
  formGenerator: FormGenerator
  listGenerator: ListGenerator

  constructor ({ target }: { target: string }) {
    this.formGenerator = new FormGenerator(target)
    this.listGenerator = new ListGenerator(target)
  }

  generate (entities: Entity[]) {
    for (let entity of entities) {
      this.formGenerator.generate(entity)
      // this.listGenerator.generate(entity)
    }
  }
}
