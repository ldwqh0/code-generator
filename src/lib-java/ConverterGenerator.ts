import {Entity, Options} from '../typings'
import path from 'path'
import fs from 'fs'

export default class ConverterGenerator {
  generate ({entity, option}: { entity: Entity, option: Options }) {
    let content = getContent(entity, option)
    let dir = path.resolve(option.target, 'converter')
    fs.mkdir(dir, {recursive: true}, (err) => {
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

function getContent ({name, fields, file, valueType}: Entity, {packageName}: Options) {
  let p = ''
  if (name.startsWith('Day')) {
    p = 'AbstractDayDataConverter'
  } else if (name.startsWith('Hour')) {
    p = 'AbstractHourDataConverter'
  } else if (name.startsWith('Month')) {
    p = 'AbstractMonthDataConverter'
  } else if (name.startsWith('Year')) {
    p = 'AbstractYearDataConverter'
  }
  return `package ${packageName}.converter;

import org.springframework.stereotype.Component;

import ${packageName}.converter.core.${p};
import ${packageName}.dto.cs.${name}Dto;
import ${packageName}.entity.cs.${name};

@Component
public class ${name}Converter extends ${p}<${name}, ${name}Dto, ${valueType}> {

\t@Override
\tprotected ${name}Dto getDto() {
\t\treturn new ${name}Dto();
\t}

${getToDtoFunction({name, fields, file, valueType})}

${generateCopyPropertiesFunction({name, fields, file, valueType})}

}`
}

function getToDtoFunction ({name, fields}: Entity) {
  if (fields.length > 0) {
    return `\t@Override
\tprotected ${name}Dto toDtoActual(${name} model) {
\t\t${name}Dto dto = super.toDtoActual(model);
    ${
  fields.map(({name, type}) => {
    return name.slice(0, 1).toUpperCase() + name.slice(1)
  }).map(name => `\t\tdto.set${name}(model.get${name}());`).join(`\r\n`)
}
\t\treturn dto;
\t}`
  } else {
    return ''
  }
}

function generateCopyPropertiesFunction ({name, fields}: Entity) {
  if (fields.length > 0) {
    return `\t@Override
\tpublic ${name} copyProperties(${name} model, ${name}Dto dto) {
\t\t${name} model_ = super.copyProperties(model, dto);
${
  fields.map(({name, type}) => {
    return name.slice(0, 1).toUpperCase() + name.slice(1)
  }).map(name => `\t\tmodel_.set${name}(dto.get${name}());`).join(`\r\n`)

}
\t\treturn model_;
\t}`
  } else {
    return ``
  }
}
