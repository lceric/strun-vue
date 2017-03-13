<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" v-bind:label-width="labelwidth" label-position="top" class="climb-form">
    <h2 class="bigintro">Sign In</h2>
    <div class="divide-40"></div>
    <el-form-item label="用户名" prop="username">
      <el-input type="text" v-model="ruleForm.username" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
    </el-form-item>  
    <!--<el-form-item label="验证码" prop="code" class="code-form-item" v-if='false'>
      <el-input type="text" v-model="ruleForm.code" auto-complete="off" :maxlength='4'></el-input>
      <el-button type="primary" @click="sendCode()" :disabled='tar'>{{sendCodeInner}}</el-button>
    </el-form-item>  -->
    <el-form-item label="" prop="codestr" class="code-form-item">
      <el-input type="text" v-model="ruleForm.codestr" auto-complete="off" :maxlength='4'></el-input>
      <span class="codestring-inner">{{codeString}}</span>
      <el-button type="text" @click="newCodeString">看不清？换一个</el-button>
    </el-form-item>
    <el-form-item class="form-action">
      <el-button class="submit-btn" type="danger" @click="submitForm('ruleForm')">提交</el-button>
      <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
    </el-form-item>
    <div class="login-helpers">
      <el-button router type='text'>忘记密码?</el-button>
    </div>
    <el-alert class="login-info"
            v-if= "state"
            title="登录信息有误，请检查填写内容"
            type="warning" 
            show-icon>
    </el-alert> 
  </el-form>
</template>
 
<script>
  import 'scss/_code.scss'
  import {mapActions} from 'vuex'
  import {Exception, StringFormat, Format, Log} from 'utils'

  export default {
    name: 'loginform',
    props: ['labelwidth'],
    data () {
      let vm = this
      // 密码验证规则
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
      // 验证码验证规则
      var validateCode = (rule, value, callback) => {
        let temp = 'kjkl'
        console.log(value === temp)
        if (value === '') {
          callback(new Error('请输入验证码'))
        } else if (value === temp) {
          callback()
        } else {
          callback(new Error('验证码错误'))
        }
      }
      var validateCode1 = (rule, value, callback) => {
        let temp = vm.codeString
        if (value === '') {
          callback(new Error('请输入验证码'))
        } else if (value === temp) {
          callback()
        } else {
          callback(new Error('验证码错误'))
        }
      }
      return {
        state: false,
        sendCodeInner: '发送验证码',
        countdown: 60,
        tar: false,
        codeString: '',
        ruleForm: {
          password: 'admin',
          username: 'admin',
          code: '',
          codestr: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' }
          ],
          code: [
            {required: true, validator: validateCode, trigger: 'blur'}
          ],
          codestr: [
            {required: true, validator: validateCode1, trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      this.newCodeString()
    },
    methods: {
      ...mapActions([
        'userlogin'
      ]),
      submitForm (formName) {
        var vm = this
        console.log(vm.state)
        // var resurl = 'http://192.168.25.102:80/api/users'
        // var resurl = global.host + '/api/createusers'
        var resurl = global.host + '/webapi/createusers'

        vm.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!')
            // vm.$http.get(resurl)
            vm.$http.post(resurl, {
              'username': vm.ruleForm.username,
              'password': vm.ruleForm.password
            })
            .then(function (data) {
              console.log(data)
              // if (data.body.code === 0) {
              //   global.authdata = data.body.responseData
              //   sessionStorage.setItem('accessToken', global.authdata)
              //   vm.$router.push({path: '/home'})
              // }
              // 若在项目中使用，此处需做相应更改
              console.log(data.body[0].id)
              global.authdata = data.body[0].id
              // sessionStorage.setItem('accessToken', global.authdata)
              this.userlogin(Object.assign(vm.ruleForm, {
                'accessToken': global.authdata
              }))
              vm.$router.push({path: '/boot/home'})
            }, function (res) {
              // 测试统一异常处理工具
              try {
                throw new Exception('系统异常', '10001', vm)
              } catch (error) {
                console.log(error)
                // console.log(error.name)
                // console.log(error.message)
                // console.log(error.code)
              }
              // console.log(res)
              // 注：在此处做了假处理，为服务无法调通时能够进入系统中
              // 正式环境不需要此处代码
              global.authdata = '7758525'
              // sessionStorage.setItem('accessToken', global.authdata)
              this.userlogin(Object.assign(vm.ruleForm, {
                'accessToken': global.authdata
              }))
              vm.$router.push({path: '/boot/home'})
            })
          } else {
            // 测试日志工具
            Log('error submit!!')
            // 测试字符串格式化工具
            let s = StringFormat('【{0}】{1}', '2013-15-11', 'adsfasdfddad')
            console.log(s)
            // 测试日期格式化工具
            let d = Format(new Date(), 'yyyy-MM-dd hh:mm:ss')
            console.log(d)
            vm.state = true
            return false
          }
        })
      },
      resetForm (formName) {
        var vm = this
        vm.state = false
        vm.$refs[formName].resetFields()
      },
      sendCode () {
        let vm = this
        vm.sendCodeInner = '重新发送(' + vm.countdown + ')'
        if (vm.countdown === 0) {
          vm.tar = false
          vm.sendCodeInner = '获取验证码'
          vm.countdown = 60
          return
        } else {
          vm.tar = true
          vm.sendCodeInner = '重新发送(' + vm.countdown + ')'
          vm.countdown--
          console.log(vm.countdown)
        }
        setTimeout(function () { vm.sendCode() }, 1000)
      },
      newCodeString: function () {
        var result = []
        let vm = this
        for (var i = 0; i < 4; i++) {
          var ranNum = Math.ceil(Math.random() * 25) // 生成一个0到25的数字
          // 大写字母'A'的ASCII是65,A~Z的ASCII码就是65 + 0~25;然后调用String.fromCharCode()传入ASCII值返回相应的字符并push进数组里
          result.push(String.fromCharCode(65 + ranNum))
        }
        vm.codeString = result.join('').toLocaleLowerCase()
      }
    }
  }
</script>

<style lang='scss' scoped>
  .code-form-item{
    .el-input{
      width: 120px;
      text-align: center;
    }
  }
  .climb-form{
    color: #555555;
    .bigintro {
      font-size: 32px;
      line-height: 50px;
      text-align: center;
      font-weight: 300;
      margin-top: 0px;
      margin-bottom: 10px;
    }
    .divide-40{
      width: 100%;
      height: 40px;
    }
    .form-action{
      /*background-color: #F5F5F5;*/
      /*border-top: 1px solid #E5E5E5;*/
      margin-bottom: 20px;
      margin-top: 10px;
      padding: 19px 20px 20px;
      .submit-btn{
        width: 100%;
      }
    }
    .login-helpers {
      margin-top: 20px;
      font-size: 12px;
    }
    .login-info{
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
    }
  }
  .codestring-inner{
    display: inline-block;
    width: 80px;
    line-height: 36px;
    font-size: 20px;
    text-align: center;
    background: #eaeaea;
    text-shadow: 8px 3px -0px #cacaca;
    color: #20a0ff;
    letter-spacing: 4px;
    background-color: #fff; 
    background-image: 
    linear-gradient(90deg, transparent 79px, #abced4 79px, #abced4 81px, transparent 81px),
    linear-gradient(#eee .1em, transparent .1em);
    background-size: 100% 1.2em;
  }
  .sub-bar{
    margin-top: 36px;
    .submit-btn{
      width: 100%;
    }
  }
</style>
