const path = require('path')
require('ts-node').register({ files: true })
// require('ts-node/register')
require('ts-node')
// require('../../dm-datacenter/data-show/src/main/java/com/dm/data/show/entity/cs')
require('./src/lib-java/generator-java').generate({
  source: path.resolve('D:\\Users\\LiDong\\Projects\\dmzl\\舟山市公共数据开放试点应用APP项目\\03开发\\后台\\医疗小助手\\Trunk\\src\\main\\java\\com\\sofmit\\health\\entity'),
  target: path.resolve(__dirname, 'dist'),
  packageName: 'com.sofmit.health'
})
// require('./src/lib-vue/generator-vue').generate({
//   source: path.resolve('../../dm-datacenter/data-show/src/main/java/com/dm/data/show/entity/cs'),
//   target: path.resolve(__dirname, 'dist')
// })
