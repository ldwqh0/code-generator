import AbstractGenerator from './AbstractGenerator'
import { lowcaseFirstChar } from '../utils'
import path from 'path'

function toTableColumn (field: Field) {
  return `<el-table-column label="${field.comment === '' || field === undefined || field.comment === null ? field.name : field.comment}" prop="${field.name}"/>\n`
}

export default class ListGenerator extends AbstractGenerator {
  constructor (target: string) {
    super({ target })
  }

  getContent (cls: Entity): string {
    let clsName = `${lowcaseFirstChar(cls.className)}`
    let result = ``
    try {
      result = `<!--${cls.comment}-${cls.className}-->
<template>
  <el-container>
    <el-main>
      <el-form :inline="true" :model="searchObj" class="clear-float">
        <el-row >
          <el-col :span="1">
            <el-button type="success" size="medium " @click="add()">新增</el-button>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-input v-model="inputVal" placeholder="请输入中文名称"/>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-cascader v-model="data.area"
                         :options="regions"
                         :props="areaProps"
                         change-on-select/>
          </el-col>
        </el-row>
      </el-form>
      <ele-data-tables :server-params="searchObj"
                       :ajax="ajax">
        ${cls.fields.map(toTableColumn).join('')}
        <el-table-column label="操作" :min-width="60">
           <template slot-scope="scope">
             <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
           </template>
        </el-table-column>
      </ele-data-tables>
    </el-main>
  </el-container>
</template>
<script>
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'
  import EleDataTables from 'element-datatables'
  import { namespace } from 'vuex-class'

  const ${clsName}Module = namespace('data/${clsName}')
  @Component({
    components: {
      EleDataTables
    }
  })
  export default class Index extends Vue {
    searchObj = {}    
    data = {}      
    inputVal=''

    // 区划下拉选的属性配置
    areaProps = {
      children: 'children',
      label: 'name',
      value: 'code'
    }

    @${clsName}Module.State('url')
    ajax

    edit (params) {
      this.$router.push({ name: '${clsName}', params })
    }

    add () {
      this.$router.push({ name: '${clsName}', params: { id: 'new' } })
    }
  }
</script>
`
      return result
    } catch (e) {
      console.error('创建表格时发生错误', cls)
      return ''
    }
  }

  getFileName (target: string, cls: Entity): string {
    return path.resolve(target, 'component', `${cls.className}s.vue`)
  }

}
