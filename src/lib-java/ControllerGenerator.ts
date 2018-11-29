import AbstractGenerator from './AbstractGenerator'

export default class ControllerGenerator extends AbstractGenerator {

  constructor (path: string) {
    super({ path, subPackage: 'controller', classSuffix: 'Controller' })
  }

  getContent (cls: Entity): string {
    return `
package ${cls.packageName}.${this.subPackage};

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.dm.common.dto.TableResultDto;
import ${cls.packageName}.converter.${cls.className}Converter;
import ${cls.packageName}.dto.${cls.className}Dto;
import ${cls.packageName}.entity.${cls.className};
import ${cls.packageName}.service.${cls.className}Service;
import com.dm.security.annotation.CurrentUser;
import com.dm.security.core.userdetails.UserDetailsDto;
import static org.springframework.http.HttpStatus.*;

/**
 * ${cls.comment}控制器
 *
 */
@RestController
@RequestMapping("${cls.className}s")
public class ${cls.className}Controller {

	@Autowired
	private ${cls.className}Service ${cls.className}Service;

	@Autowired
	private ${cls.className}Converter ${cls.className}Converter;

	@PostMapping
	public ${cls.className}Dto save(@RequestBody ${cls.className}Dto data) {
		${cls.className} model = ${cls.className}Service.save(data);
		return ${cls.className}Converter.toDto(model);
	}

	@GetMapping("{id}")
	public ${cls.className}Dto get(@PathVariable("id") Long id) {
		Optional<${cls.className}> data = ${cls.className}Service.findById(id);
		return ${cls.className}Converter.toDto(data);
	}

	@PutMapping("{id}")
	public ${cls.className}Dto update(@PathVariable("id") Long id, @RequestBody ${cls.className}Dto data) {
		${cls.className} model = ${cls.className}Service.update(id, data);
		return ${cls.className}Converter.toDto(model);
	}

	@DeleteMapping
	@ResponseStatus(NO_CONTENT)
	public void delete(@PathVariable("id") Long id) {
		${cls.className}Service.delete(id);
	}

	@GetMapping(params = { "draw" })
	public TableResultDto<${cls.className}Dto> search(
			@RequestParam("draw")Long draw,
			@CurrentUser UserDetailsDto user,
			@ModelAttribute ${cls.className}Dto condition,
			@PageableDefault Pageable pageable) {
		Page<${cls.className}> ${cls.className} = ${cls.className}Service.find(pageable);
		return TableResultDto.success(draw, ${cls.className}, data->${cls.className}Converter.toDto(data));
	}
}
`
  }
}
