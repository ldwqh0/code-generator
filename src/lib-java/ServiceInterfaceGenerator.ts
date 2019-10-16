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

import java.util.Optional;

import org.springframework.data.domain.Pageable;

import com.dm.common.dto.RangePage;
import ${packageName}.dto.${name}Dto;
import ${packageName}.entity.${name};

public interface ${name}Service {

\tpublic ${name} save(${name}Dto dto);

\tpublic ${name} update(Long id, ${name}Dto dto);

\tpublic void delete(Long id);

\tpublic Optional<${name}> findById(Long id);

\tpublic RangePage<${name}> list(Long maxId, Pageable pageable);
}
`

  return content
}
