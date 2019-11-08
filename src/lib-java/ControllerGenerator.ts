import {Entity, Options} from '../typings'
import fs from 'fs'
import path from 'path'

export default class ControllerGenerator {
    generate({entity, option}: { entity: Entity, option: Options }) {
        let f = getContent(entity, option)
        let dir = path.resolve(option.target, 'controller')
        fs.mkdir(dir, {recursive: true}, (err) => {
            if (!err) {
                fs.writeFile(path.resolve(dir, `${entity.name}Controller.java`), f, (error) => {
                    if (error) {
                        console.error('generate service impl success', entity, error)
                    }
                })
            }
        })
    }
}

// packageName com.dm.data.show

function getContent({name}: Entity, {packageName}: Options) {
    let lName = name.slice(0, 1).toLowerCase() + name.slice(1)

    let content = `package ${packageName}.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.dm.common.dto.RangePage;
import ${packageName}.converter.${name}Converter;
import ${packageName}.dto.${name}Dto;
import ${packageName}.entity.${name};
import ${packageName}.service.${name}Service;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("${lName}s")
public class ${name}Controller {

\t@Autowired
\tprivate ${name}Service ${lName}Service;

\t@Autowired
\tprivate ${name}Converter ${lName}Converter;

\t@PostMapping
\t@ResponseStatus(CREATED)
\tpublic ${name}Dto save(@RequestBody ${name}Dto dto) {
\t\treturn ${lName}Converter.toDto(${lName}Service.save(dto));
\t}

\t@PutMapping("{id}")
\t@ResponseStatus(CREATED)
\tpublic ${name}Dto update(@PathVariable("id") Long id, @RequestBody ${name}Dto dto) {
\t\treturn ${lName}Converter.toDto(${lName}Service.update(id, dto));
\t}

\t@DeleteMapping("{id}")
\t@ResponseStatus(NO_CONTENT)
\tpublic void delete(@PathVariable("id") Long id) {
\t\t${lName}Service.delete(id);
\t}

\t@GetMapping("{id}")
\tpublic ${name}Dto findById(@PathVariable("id") Long id) {
\t\treturn ${lName}Converter.toDto(${lName}Service.findById(id));
\t}

\t@GetMapping
\tpublic RangePage<${name}Dto> list(
\t\t\t@RequestParam(value = "maxId",required = false) Long maxId,
\t\t\t@PageableDefault Pageable pageable) {
\t\tRangePage<${name}> result = ${lName}Service.list(maxId, pageable);
\t\treturn result.map(${lName}Converter::toDto);
\t}
}
`
    return content
}
