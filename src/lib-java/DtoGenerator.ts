import { Entity, Field, Options } from '../typings'
import path from 'path'
import fs from 'fs'
import BaseTypes from './BaseTypes'

export default class DtoGenerator {
  generate ({ entity, option }: { entity: Entity, option: Options }) {
    let content = getContent(entity, option)
    let dir = path.resolve(option.target, 'dto')
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (!err) {
        fs.writeFile(path.resolve(path.resolve(dir, `${entity.name}Dto.java`)), content, err => {
          if (err) {
            console.error('generate converter interface success', entity, err)
          }
        })
      }
    })
  }
}

function getContent ({ name, fields }: Entity, { packageName }: Options) {
  return `package ${packageName}.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.math.BigDecimal;

import lombok.Data;

@Data
public class ${name}Dto implements Serializable {

\tprivate static final long serialVersionUID = 1L;
\tprivate Long id;
${fields.map(getFiled).join('\r\n')}
}
`
}

function getFiled ({ type, name }: Field) {
  if (BaseTypes.includes(type)) {
    return `\tprivate ${type} ${name};`
  } else {
    return `\t // TODO 需要手动处理
    // ${type} ${name};`
  }
}

