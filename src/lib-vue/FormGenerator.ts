import {Entity, Field, Options} from '../typings'
import path from 'path'
import fs from 'fs'
// import

export default class ListGenerator {
  generate ({entity, option}: { entity: Entity, option: Options }): void {
    let content = getContent(entity, option)
    let dir = path.resolve(option.target, 'component', 'form')
    fs.mkdir(dir, {recursive: true}, (err) => {
      if (!err) {
        fs.writeFile(path.resolve(path.resolve(dir, `${entity.name}.vue`)), content, err => {
          if (err) {
            console.error('generate form vue file success', entity, err)
          }
        })
      }
    })
  }
}

function getContent ({name, fields, file, valueType}: Entity, {packageName}: Options): string {
  return `<template>
  <el-form :model="value" label-width="80px" size="mini">
    <el-row>
      <el-col :span="12">
        <el-form-item label="地区">
          <el-cascader v-model="value.regionCode"
                       :options="userRegionTree"
                       expand-trigger="hover"
                       :props="areaProps"
                       change-on-select/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="currentDate" label="数据日期">
          <el-date-picker v-model="value.currentDate" style="width: 100%;"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      ${generateColumns(fields)}
      <el-col :span="12">
        <el-form-item prop="number" label="数量">
          <el-input type="number" v-model="value.value"/>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>

  import { Component, Mixins } from 'vue-property-decorator'
  import { BaseForm } from './.common'

  @Component
  export default class ${name} extends Mixins(BaseForm) {
  }
</script>

<style scoped>

</style>
`
}

function generateColumns (fields: Field[]): string {
  return fields.map(({name}) => `<el-col :span="12">
        <el-form-item prop="${name}" label="${name}">
          <el-input type="text" v-model="value.${name}"/>
        </el-form-item>
      </el-col>`).join('\r\n')
}
