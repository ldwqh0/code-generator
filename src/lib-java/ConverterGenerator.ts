import AbstractGenerator from './AbstractGenerator'

function upCaseFirstChar (str: string): string {
  return str.substring(0, 1).toUpperCase() + str.substring(1)
}

export default class ConverterGenerator extends AbstractGenerator {
  constructor (path: string) {
    super({ path, subPackage: 'converter', classSuffix: 'Converter' })
  }

  private toSetMethod (field: Field) {
    return `dto.set${upCaseFirstChar(field.name)}(model.get${upCaseFirstChar(field.name)}());`
  }

  getContent (cls: Entity): string {
    return `package ${cls.packageName}.${this.subPackage};

import org.springframework.stereotype.Component;

import com.dm.common.converter.AbstractConverter;
import ${cls.packageName}.dto.${cls.className}Dto;
import ${cls.packageName}.entity.${cls.className};

@Component
public class ${cls.className}Converter extends AbstractConverter<${cls.className}, ${cls.className}Dto> {

	@Override
	protected ${cls.className}Dto toDtoActual(${cls.className} model) {
		${cls.className}Dto dto = new ${cls.className}Dto();
		${cls.fields.map(field => `dto.set${upCaseFirstChar(field.name)}(model.get${upCaseFirstChar(field.name)}());`).join('\n')}
		return dto;
	}

	@Override
	public void copyProperties(${cls.className} model, ${cls.className}Dto dto) {
	  ${cls.fields.filter(field => field.name !== 'id')
      .map(field => `model.set${upCaseFirstChar(field.name)}(dto.get${upCaseFirstChar(field.name)}());`).join('\n')}
	}

}
`
  }

}
