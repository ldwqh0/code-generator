const path = require('path')
require('ts-node').register({ files: true })
// require('ts-node/register')
require('ts-node')
// require('../../dm-datacenter/data-show/src/main/java/com/dm/data/show/entity/cs')
require('./src/lib-java/generator-java').generate({
  source: path.resolve('D:\\Users\\LiDong\\Projects\\dmzl\\流动党员管理系统\\server\\src\\main\\java\\com\\sofmit\\pm\\entity'),
  target: path.resolve(__dirname, 'dist'),
  packageName: 'com.sofmit.pm'
})
// require('./src/lib-vue/generator-vue').generate({
//   source: path.resolve('../../dm-datacenter/data-show/src/main/java/com/dm/data/show/entity/cs'),
//   target: path.resolve(__dirname, 'dist')
// })
