import {Options} from '../typings'

import ListGenerator from './ListGenerator'
import EntityReader from '../EntityReader'
import FormGenerator from './FormGenerator'
import RouteGenerator from './RouteGenerator'
import VuexGenerator from './VuexGenerator'

export function generate (option: Options) {
  let listGenerator = new ListGenerator()
  let formGenerator = new FormGenerator()
  let routeGenerator = new RouteGenerator()
  let vuexGenerator = new VuexGenerator()
  let reader = new EntityReader()
  reader.listEntities(option).then(entities => {
    entities.forEach(entity => {
      listGenerator.generate({entity, option})
      formGenerator.generate({entity, option})
    })
    routeGenerator.generate({entities, option})
    vuexGenerator.generate({entities, option})
  })
}
