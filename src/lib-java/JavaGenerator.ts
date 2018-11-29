import EntityGenerator from './EntityGenerator'
import DtoGenerator from './DtoGenerator'
import ConverterGenerator from './ConverterGenerator'
import ServiceGenerator from './ServiceGenerator'
import ServiceImplGenerator from './ServiceImplGenerator'
import RepositoryGenerator from './RepositoryGenerator'
import ControllerGenerator from './ControllerGenerator'

export default class JavaGenerator {
  entityGenerator: EntityGenerator
  dtoGenerator: DtoGenerator
  converterGenerator: ConverterGenerator
  serviceGenerator: ServiceGenerator
  serviceImplGenerator: ServiceImplGenerator
  repositoryGenerator: RepositoryGenerator
  controllerGenerator: ControllerGenerator

  constructor ({ target }: { target: string }) {
    this.entityGenerator = new EntityGenerator(target)
    this.dtoGenerator = new DtoGenerator(target)
    this.converterGenerator = new ConverterGenerator(target)
    this.serviceGenerator = new ServiceGenerator(target)
    this.serviceImplGenerator = new ServiceImplGenerator(target)
    this.repositoryGenerator = new RepositoryGenerator(target)
    this.controllerGenerator = new ControllerGenerator(target)
  }

  generate (entities: Entity[]) {
    for (let entity of entities) {
      this.entityGenerator.generate(entity)
      this.dtoGenerator.generate(entity)
      this.converterGenerator.generate(entity)
      this.serviceGenerator.generate(entity)
      this.serviceImplGenerator.generate(entity)
      this.repositoryGenerator.generate(entity)
      this.controllerGenerator.generate(entity)
    }
  }
}
