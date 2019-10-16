import { Entity, Field, Options } from '../typings'
import path from 'path'
import fs from 'fs'
import BaseTypes from './BaseTypes'
import utils from '../utils'

export default class ConverterGenerator {
  generate ({ entity, option }: { entity: Entity, option: Options }) {
    let content = getContent(entity, option)
    let dir = path.resolve(option.target, 'converter')
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (!err) {
        fs.writeFile(path.resolve(path.resolve(dir, `${entity.name}Converter.java`)), content, err => {
          if (err) {
            console.error('generate converter interface success', entity, err)
          }
        })
      }
    })
  }
}

function getContent ({ name, fields, file }: Entity, { packageName }: Options) {
  return `package ${packageName}.converter;

import org.springframework.stereotype.Component;

import com.dm.common.converter.AbstractConverter;
import ${packageName}.dto.${name}Dto;
import ${packageName}.entity.${name};

@Component
public class ${name}Converter extends AbstractConverter<${name}, ${name}Dto> {

\t@Override
\tprotected ${name}Dto toDtoActual(${name} model) {
\t\t${name}Dto dto = new ${name}Dto();
\t\tdto.setId(model.getId());
${fields.map(field => copyFunction(field, { source: 'model', target: 'dto' })).join('\r\n')}
\t\treturn dto;
\t}

\t@Override
\tpublic ${name} copyProperties(${name} model, ${name}Dto dto) {
${fields.map(field => copyFunction(field, { source: 'dto', target: 'model' })).join('\r\n')}
\t\treturn model;
\t}
}`
}

function copyFunction ({ name, type }: Field, { target, source }: { target: string, source: string }) {
  if (BaseTypes.includes(type)) {
    return `\t\t${target}.set${utils.upCaseFirstChar(name)}(${source}.get${utils.upCaseFirstChar(name)}());`
  } else {
    return `\t\t// TODO 需要手动处理
    // ${target}.set${utils.upCaseFirstChar(name)}();`
  }
}


