import {Entity, Options} from '../typings'
import fs from 'fs'
import path from 'path'

export default class ServiceInterfaceGenerator {
  generate ({entity, option}: { entity: Entity, option: Options }) {
    let f = getContent(entity, option)
    let dir = path.resolve(option.target, 'service')
    fs.mkdir(dir, {recursive: true}, (err) => {
      if (!err) {
        fs.writeFile(path.resolve(dir, `${entity.name}Service.java`), f, (error) => {
          if (error) {
            console.error('generate service interface success', entity, error)
          }
        })
      }
    })
  }
}

// packageName com.dm.data.show

function getContent ({name}: Entity, {packageName}: Options) {
  let content = `package ${packageName}.service;

import ${packageName}.dto.cs.${name}Dto;
import ${packageName}.entity.cs.${name};

public interface ${name}Service extends BaseIndexService<${name}, ${name}Dto> {

}`

  return content
}
