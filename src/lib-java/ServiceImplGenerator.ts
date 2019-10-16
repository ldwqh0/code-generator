import {Entity, Options} from '../typings'
import fs from 'fs'
import path from 'path'

export default class ServiceImplGenerator {
  generate ({entity, option}: { entity: Entity, option: Options }) {
    let f = getContent(entity, option)
    let dir = path.resolve(option.target, 'service', 'impl')
    fs.mkdir(dir, {recursive: true}, (err) => {
      if (!err) {
        fs.writeFile(path.resolve(dir, `${entity.name}ServiceImpl.java`), f, (error) => {
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

  let content = `package ${packageName}.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.dm.common.converter.AbstractConverter;
import com.dm.data.show.converter.${name}Converter;
import com.dm.data.show.dto.cs.${name}Dto;
import com.dm.data.show.entity.cs.${name};
import com.dm.data.show.repository.${name}Repository;
import com.dm.data.show.service.${name}Service;

@Service
public class ${name}ServiceImpl extends BaseIndexServiceImpl<${name}, ${name}Dto> implements ${name}Service {

\t@Autowired
\tprivate ${name}Repository ${lName}Repository;

\t@Autowired
\tprivate ${name}Converter ${lName}Converter;

\t@Override
\tprotected JpaRepository<${name}, Long> getRepository() {
\t\treturn ${lName}Repository;
\t}

\t@Override
\tprotected AbstractConverter<${name}, ${name}Dto> getConverter() {
\t\treturn ${lName}Converter;
\t}

\t@Override
\tprotected ${name} newModel() {
\t\treturn new ${name}();
\t}

\t@Override
\tpublic Page<${name}> search(String keywords, Pageable pageable) {
\t\t// TODO Auto-generated method stub
\t\treturn null;
\t}

}
`
  return content
}
