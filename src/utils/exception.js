// const exp = function () {
//   function CommonException (message, code) {
//     this.name = 'CommonException'
//     this.message = message
//     this.code = code
//     return this.name + ' ' + this.message + ':' + this.code
//   }
//   try {
//     throw new CommonException('系统错误', '10001')
//   } catch (error) {
//     console.log(error)
//     console.log(error.name)
//     console.log(error.message)
//     console.log(error.code)
//   }
// }
function CommonException (message, code, vm) {
  this.name = 'CommonException'
  this.message = message
  this.code = code
  vm.$message.error(message)
  return this.name + ' ' + this.message + ':' + this.code
}

export default CommonException
