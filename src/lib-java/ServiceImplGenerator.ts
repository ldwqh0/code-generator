import AbstractGenerator from './AbstractGenerator'

export default class ServiceImplGenerator extends AbstractGenerator {

  constructor (path: string) {
    super({ path, subPackage: 'service.impl', classSuffix: 'ServiceImpl' })
  }

  getContent (cls: Entity): string {
    let repositoryName = `${this.lowCaseFirstChar(cls.className)}Repository`
    let converterName = `${this.lowCaseFirstChar(cls.className)}Converter`
    return `package ${cls.packageName}.${this.subPackage};

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ${cls.packageName}.converter.${cls.className}Converter;
import ${cls.packageName}.dto.${cls.className}Dto;
import ${cls.packageName}.entity.${cls.className};
import ${cls.packageName}.repository.${cls.className}Repository;
import ${cls.packageName}.service.${cls.className}Service;

@Service
public class ${cls.className}ServiceImpl implements ${cls.className}Service {

	@Autowired
	private ${cls.className}Repository ${repositoryName};

	@Autowired
	private ${cls.className}Converter ${converterName};

	@Override
	public Optional<${cls.className}> findById(Long id) {
		return ${repositoryName}.findById(id);
	}

	@Override
	@Transactional
	public ${cls.className} save(${cls.className}Dto data) {
		${cls.className} entity = new ${cls.className}();
		${converterName}.copyProperties(entity, data);
		return ${repositoryName}.save(entity);
	}

	@Override
	@Transactional
	public ${cls.className} update(Long id, ${cls.className}Dto data) {
		${cls.className} entity = ${repositoryName}.getOne(id);
		${converterName}.copyProperties(entity, data);
		return entity;
	}

	@Override
	public void delete(Long id) {
		${repositoryName}.deleteById(id);
	}

	@Override
	public Page<${cls.className}> find(Pageable pageable) {
		return ${repositoryName}.findAll(pageable);
	}

}

    `
  }

}
