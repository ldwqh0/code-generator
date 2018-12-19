import config from '../config/config'
import JavaGenerator from './lib-java/JavaGenerator'
import DataReader from './DataReader'
import path from 'path'

export function generate () {
  let entities = DataReader.readData(config)
  let javaGenerator: JavaGenerator = new JavaGenerator({ target: path.resolve(config.target, 'java') })
  javaGenerator.generate(entities)
}
