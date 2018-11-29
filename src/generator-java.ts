import config from '../config/config'
import JavaGenerator from './lib-java/JavaGenerator'
import DataReader from './DataReader'

export function generate () {
  let entities = DataReader.readData(config)
  let javaGenerator: JavaGenerator = new JavaGenerator({ target: config.target })
  javaGenerator.generate(entities)

}
