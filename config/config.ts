import path from 'path'

const config: JavaGeneratorConfig = {
  /**
   * 待处理的文件
   */
  source: path.resolve(__dirname, '../', 'test.xlsx'),
  /**
   * 生成的文件的目标路径
   */
  target: path.resolve(__dirname, '../', 'dist'),
  /**
   * 生成的包名
   */
  packageName: 'com.dm.data.show',
  /**
   * 所有实体类的父类
   */
  superClass: 'org.springframework.data.jpa.domain.AbstractPersistable',

  /**
   * 主键类型
   */
  idClass: 'Long'
}

export default config
