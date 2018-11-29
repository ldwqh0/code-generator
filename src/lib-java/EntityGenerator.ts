import AbstractGenerator from './AbstractGenerator'
import { strict } from 'assert'

function getClassName (fullName: string) {
  return fullName.split('\.').reverse()[0]
}

export default class EntityGenerator extends AbstractGenerator {
  constructor (path: string) {
    super({ path, subPackage: 'entity', classSuffix: '' })
  }

  private toField (field: Field): string {
    return `
  /**
	 * ${field.comment}
	 */
	@Column(name = "${field.columnName}" ${field.length !== undefined ? `,length = ${field.length}` : ``})
	private ${field.type} ${field.name};
    `
  }

  getContent (cls: Entity): string {
    return `package ${cls.packageName}.entity;

import javax.persistence.Column;
import javax.persistence.Entity;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.ZonedDateTime;

import ${cls.superClass};

import lombok.Getter;
import lombok.Setter;

/**
 * ${cls.comment}
 * 
 * @author LiDong
 *
 */
@Getter
@Setter
@Entity(name = "${cls.eintityName}")
public class ${cls.className} extends ${getClassName(cls.superClass)}${cls.idClass !== undefined ? `<${cls.idClass}>` : ``} implements Serializable {
	private static final long serialVersionUID = 1L;
	
	${cls.fields.filter(filed => filed.columnName !== 'id').map(field => this.toField(field)).join('\n')}

}
    `
  }
}
