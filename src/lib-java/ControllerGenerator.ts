import {Entity, Options} from '../typings'
import fs from 'fs'
import path from 'path'

export default class ControllerGenerator {
  generate ({entity, option}: { entity: Entity, option: Options }) {
    let f = getContent(entity, option)
    let dir = path.resolve(option.target, 'controller')
    fs.mkdir(dir, {recursive: true}, (err) => {
      if (!err) {
        fs.writeFile(path.resolve(dir, `${entity.name}Controller.java`), f, (error) => {
          if (error) {
            console.error('generate service impl success', entity, error)
          }
        })
      }
    })
  }
}

// packageName com.dm.data.show

function getContent ({name}: Entity, {packageName}: Options) {
  let lName = name.slice(0, 1).toLowerCase() + name.slice(1)

  let content = `package ${packageName}.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dm.common.converter.AbstractConverter;
import ${packageName}.converter.${name}Converter;
import ${packageName}.dto.cs.${name}Dto;
import ${packageName}.entity.cs.${name};
import ${packageName}.service.BaseIndexService;
import ${packageName}.service.${name}Service;

@RestController
@RequestMapping("${lName}s")
public class ${name}Controller extends BaseIndexController<${name}, ${name}Dto> {

\t@Autowired
\tprivate ${name}Converter ${lName}Converter;

\t@Autowired
\tprivate ${name}Service ${lName}Service;

\t@Override
\tprotected AbstractConverter<${name}, ${name}Dto> getConverter() {
\t\treturn ${lName}Converter;
\t}

\t@Override
\tprotected BaseIndexService<${name}, ${name}Dto> getService() {
\t\treturn ${lName}Service;
\t}

}`
  return content
}
