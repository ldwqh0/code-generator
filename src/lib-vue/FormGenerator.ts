import AbstractGenerator from './AbstractGenerator'
import { lowcaseFirstChar } from '../utils'
import path from 'path'
//
// get rules () {
//   return {
//     ${allColumns.filter(column => column.required).map(column => this.getRule(column)).join(`,`)}
//   }
// }

function getItem (column: Field): string {
  return `<el-col :span="12">
              <el-form-item label="${column.comment === '' || column.comment === null ? column.name : column.comment}" prop="${column.name}">
                <el-input v-model="data.${column.name}" :disabled="readonly"/>
              </el-form-item>
            </el-col>`
}

function getRows (fields: Field[]): string {
  let columns = fields.filter(field => field.name !== 'id').map(getItem)

  let result = []
  for (let i = 0; i < fields.length; i++) {
    if (i === 0) {
      result.push(`<el-row>\n`)
    } else if (i % 2 === 0) {
      result.push(`
      </el-row>
      
      <el-row>
`)
    }
    result.push(columns[i])
    if (i % 2 === 0) {
      result.push(`\n`)
    }
    if (i === fields.length - 1) {
      result.push(`</el-row>`)
    }
  }
  return result.join('')
}

export default class FormGenerator extends AbstractGenerator {

  constructor (target: string) {
    super({ target })
  }

  getFileName (target: string, cls: Entity): string {
    return path.resolve(target, 'component', `${cls.className}.vue`)
  }

  getContent (cls: Entity): string {
    let actionModuleName = `${lowcaseFirstChar(cls.className)}`
    return `<!--${cls.comment}-->
<template>
  <el-container>
    <el-main>
      <el-form label-width="140px"
               :model="data"
               ref="form" 
               :rules="rules">
               <el-row>
                <el-col :span="12">
                  <el-button
                    type="primary"
                    @click="edit"
                    size="mini"
                    v-if="readonly">编辑</el-button>
                  <el-button
                    type="primary"
                    @click="save"
                    size="mini"
                    v-if="!readonly">保存</el-button>
                  <el-button @click="goBack()" size="mini">取消</el-button>
                </el-col>
          </el-row>
        
        ${getRows(cls.fields)}
         
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  const ${lowcaseFirstChar(cls.className)}Module = namespace('data/${cls.className}')
  @Component({
    components: {}
  })
  export default class ${cls.className} extends Vue {
    @Prop({ default: () => 'new' })
    id

    data = {}
    
    readonly = true

    @${actionModuleName}Module.Action('save')
    saveData

    @${actionModuleName}Module.Action('get')
    getData
    
    @${actionModuleName}Module.Action('update')
    updateData

    save () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.id === 'new') {
            this.saveData(this.data).then(rsp => {
              this.data = rsp
            })
          } else {
            this.updateData({ id: this.id, data: this.data })
          }
        }else{
          this.$message({
          message: '数据校验没有通过，请检查输入详情',
          type: 'error'
        });
        }
      })    
    }
    
    edit (){
      this.readonly=false
    }

    goBack(){
      this.$router.go(-1)
    }
    created () {
      if (this.id !== 'new') {
        this.getData({ id: this.id }).then(data => (this.data = data))
      }
    }
  }
</script>
`
  }

}
