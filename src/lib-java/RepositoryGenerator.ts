import { Entity, Options } from '../typings'
import path from 'path'
import fs from 'fs'

export default class RepositoryGenerator {
  generate ({ entity, option }: { entity: Entity, option: Options }) {
    let content = getContent(entity, option)
    let dir = path.resolve(option.target, 'repository')
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (!err) {
        fs.writeFile(path.resolve(path.resolve(dir, `${entity.name}Repository.java`)), content, err => {
          if (err) {
            console.error('generate repository interface success', entity, err)
          }
        })
      }
    })
  }
}

function getContent ({ name, fields, file }: Entity, { packageName }: Options) {
  return `package ${packageName}.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import ${packageName}.entity.${name};

public interface ${name}Repository extends JpaRepository<${name}, Long>, QuerydslPredicateExecutor<${name}> {

\tpublic Optional<${name}> findTopByOrderByIdDesc();

}

`
}
