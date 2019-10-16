import {Entity, Field, Options} from '../typings'
import path from 'path'
import fs from 'fs'
// import

export default class ListGenerator {
  generate ({entity, option}: { entity: Entity, option: Options }): void {
    let content = getContent(entity, option)
    let dir = path.resolve(option.target, 'component', 'list')
    fs.mkdir(dir, {recursive: true}, (err) => {
      if (!err) {
        fs.writeFile(path.resolve(path.resolve(dir, `${entity.name}s.vue`)), content, err => {
          if (err) {
            console.error('generate list vue file success', entity, err)
          }
        })
      }
    })
  }
}

function getContent ({name, fields, file, valueType}: Entity, {packageName}: Options): string {
  return `<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-form inline>
          <el-form-item>
            <el-input v-model="searchObj.keywords"
                      placeholder="请输入查询关键字"/>
          </el-form-item>
          <el-form-item class="pull-right">
            <el-button type="primary" @click="add">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <ele-data-tables ref="list"
                         :server-params="searchObj"
                         :ajax="ajax">
          <el-table-column prop="regionName" label="区域" sortable="custom"/>
          <el-table-column prop="currentDate" label="时间" sortable="custom">
            <template v-slot="{row:{currentDate}}">{{ toLocalDate(currentDate) }}</template>
          </el-table-column>
          ${generateColumns(fields)}
          <el-table-column prop="value" label="值" sortable="custom"/>
          <el-table-column label="操作">
            <template v-slot="{row}">
              <a href="javascript:void(0)" @click="edit(row)">编辑</a>
              <a href="javascript:void(0)" @click="delRow(row)">删除</a>
            </template>
          </el-table-column>
        </ele-data-tables>
      </el-col>
    </el-row>

    <el-dialog v-if="visible" :visible.sync="visible" title="指标编辑">
      <${toLowerLine(name)} v-model="selectedRow"/>
      <template slot="footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="saveData">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
  import { Mixins, Component } from 'vue-property-decorator'
  import BaseList from './.common/BaseList'
  import ${name} from './${name}'

  @Component({
    components: { ${name} }
  })
  export default class ${name}s extends Mixins(BaseList) {
    get baseModule () { return 'dvm/${name.slice(0, 1).toLowerCase() + name.slice(1)}' }
  }
</script>

<style scoped>

</style>
`
}

function generateColumns (fields: Field[]): string {
  return fields.map(({name}) => `<el-table-column prop="${name}" label="${name}" sortable="custom"/>`).join('\r\n')
}

function toLowerLine (str: string) {
  var temp = str.replace(/[A-Z]/g, (match) => {
    return '-' + match.toLowerCase()
  })
  if (temp.slice(0, 1) === '-') { // 如果首字母是大写，执行replace时会多一个_，这里需要去掉
    temp = temp.slice(1)
  }
  return temp
};
