import { Options } from '../typings'
import ServiceInterfaceGenerator from './ServiceInterfaceGenerator'
import EntityReader from '../EntityReader'
import ConverterGenerator from './ConverterGenerator'
import RepositoryGenerator from './RepositoryGenerator'
import ServiceImplGenerator from './ServiceImplGenerator'
import ControllerGenerator from './ControllerGenerator'
import DtoGenerator from './DtoGenerator'

export function generate (option: Options) {
  let dtoGenerator = new DtoGenerator()
  let serviceInterfaceGenerator = new ServiceInterfaceGenerator()
  let converterGenerator = new ConverterGenerator()
  let repositoryGenerator = new RepositoryGenerator()
  let serviceImplGenerator = new ServiceImplGenerator()
  let controllerGenerator = new ControllerGenerator()
  let reader = new EntityReader()
  reader.listEntities(option).then(entities => {
    entities.forEach(entity => {
      // console.log(entity)
      dtoGenerator.generate({ entity, option })
      serviceInterfaceGenerator.generate({ entity, option })
      converterGenerator.generate({ entity, option })
      repositoryGenerator.generate({ entity, option })
      serviceImplGenerator.generate({ entity, option })
      controllerGenerator.generate({ entity, option })
    })
  })

  //
  // serviceInterfaceGenerator.generate(entity, option)
}
