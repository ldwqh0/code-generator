import config from '../config/config'
import VueGenerator from './lib-vue/VueGenerator'
import DataReader from './DataConverter'
import path from 'path'

export function generate () {
  let entities = DataReader.readData()
  let vueGenerator: VueGenerator = new VueGenerator({ target: path.resolve(config.target, 'vue') })
  vueGenerator.generate(entities)
}
