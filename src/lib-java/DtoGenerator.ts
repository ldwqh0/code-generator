import AbstractGenerator from './AbstractGenerator'

export default class DtoGenerator extends AbstractGenerator {

  constructor (path: string) {
    super({ path, subPackage: 'dto', classSuffix: 'Dto' })
  }

  private toField (field: Field) {
    return `
  /**
	 * ${field.comment}
	 */
	private ${field.type} ${field.name};	
	`
  }

  getContent (cls: Entity): string {
    return `package ${cls.packageName}.${this.subPackage};

import java.io.Serializable;
import java.time.LocalDate;
import java.time.ZonedDateTime;

import lombok.Data;

/**
 * ${cls.comment}
 * 
 */
@Data
public class ${cls.className}${this.classSuffix} implements Serializable {
	private static final long serialVersionUID = 1L;
	
	${cls.fields.map(field => this.toField(field)).join('')}

}
    `
  }

}
