import AbstractGenerator from './AbstractGenerator'

export default class ServiceGenerator extends AbstractGenerator {
  constructor (path: string) {
    super({ path, subPackage: 'service', classSuffix: 'Service' })
  }

  getContent (cls: Entity): string {
    return `package ${cls.packageName}.${this.subPackage};

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ${cls.packageName}.dto.${cls.className}Dto;
import ${cls.packageName}.entity.${cls.className};

public interface ${cls.className}Service {

	public Optional<${cls.className}> findById(Long id);

	public ${cls.className} save(${cls.className}Dto data);

	public ${cls.className} update(Long id, ${cls.className}Dto data);

	public void delete(Long id);

	public Page<${cls.className}> find(Pageable pageable);
}

    `
  }

}
