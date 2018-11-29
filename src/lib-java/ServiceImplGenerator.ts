import AbstractGenerator from './AbstractGenerator'

export default class ServiceImplGenerator extends AbstractGenerator {

  constructor (path: string) {
    super({ path,  subPackage: 'service.impl', classSuffix: 'ServiceImpl' })
  }

  getContent (cls: Entity): string {
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
	private ${cls.className}Repository ${cls.className}Repository;

	@Autowired
	private ${cls.className}Converter ${cls.className}Converter;

	@Override
	public Optional<${cls.className}> findById(Long id) {
		return ${cls.className}Repository.findById(id);
	}

	@Override
	@Transactional
	public ${cls.className} save(${cls.className}Dto data) {
		${cls.className} entity = new ${cls.className}();
		${cls.className}Converter.copyProperties(entity, data);
		return ${cls.className}Repository.save(entity);
	}

	@Override
	@Transactional
	public ${cls.className} update(Long id, ${cls.className}Dto data) {
		${cls.className} entity = ${cls.className}Repository.getOne(id);
		${cls.className}Converter.copyProperties(entity, data);
		return entity;
	}

	@Override
	public void delete(Long id) {
		${cls.className}Repository.deleteById(id);
	}

	@Override
	public Page<${cls.className}> find(Pageable pageable) {
		return ${cls.className}Repository.findAll(pageable);
	}

}

    `
  }

}
