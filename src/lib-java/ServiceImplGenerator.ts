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

import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dm.common.dto.RangePage;
import com.querydsl.core.BooleanBuilder;
import ${packageName}.converter.${name}Converter;
import ${packageName}.dto.${name}Dto;
import ${packageName}.entity.${name};
import ${packageName}.repository.${name}Repository;
import ${packageName}.service.${name}Service;

import ${packageName}.entity.Q${name};

@Service
public class ${name}ServiceImpl implements ${name}Service {

\t@Autowired
\tprivate ${name}Repository ${lName}Repository;

\t@Autowired
\tprivate ${name}Converter ${lName}Converter;

\tprivate final Q${name} q${name} = Q${name}.${lName};

\t@Override
\t@Transactional
\tpublic ${name} save(${name}Dto dto) {
\t\t${name} model = new ${name}();
\t\t${lName}Converter.copyProperties(model, dto);
\t\treturn ${lName}Repository.save(model);
\t}

\t@Override
\t@Transactional
\tpublic ${name} update(Long id, ${name}Dto dto) {
\t\t${name} model = ${lName}Repository.getOne(id);
\t\t${lName}Converter.copyProperties(model, dto);
\t\treturn ${lName}Repository.save(model);
\t}

\t@Override
\t@Transactional
\tpublic void delete(Long id) {
\t\t${lName}Repository.deleteById(id);
\t}

\t@Override
\tpublic Optional<${name}> findById(Long id) {
\t\treturn ${lName}Repository.findById(id);
\t}

\t@Override
\tpublic RangePage<${name}> list(Long maxId, Pageable pageable) {
\t\tlong maxToSet = Long.MIN_VALUE;
\t\tBooleanBuilder query = new BooleanBuilder();
\t\tif (Objects.isNull(maxId)) {
\t\t\tOptional<${name}> optionalMax = ${lName}Repository.findTopByOrderByIdDesc();
\t\t\tif (optionalMax.isPresent()) {
\t\t\t\tmaxToSet = optionalMax.get().getId();
\t\t\t}
\t\t} else {
\t\t\tmaxToSet = maxId;
\t\t}
\t\tquery.and(q${name}.id.loe(maxId));
\t\tPage<${name}> result = ${lName}Repository.findAll(query, pageable);
\t\treturn RangePage.of(maxToSet, result);
\t}

}`
  return content
}
