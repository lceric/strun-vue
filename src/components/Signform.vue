<template>
  <mu-paper ref="ruleForm" class="st-form" :zDepth="1">
    <h2 class="bigintro">{{signType}}</h2>

    <mu-text-field 
      class="center-block" 
      type="text" 
      fullWidth 
      label="用户名" 
      icon="account_box" 
      hintText="请输入用户名" 
      @input="userAvalide" 
      v-model='username'  
      :errorText="usererror" 
      labelFloat/><br/>
    <mu-text-field 
      type="password" 
      fullWidth 
      label="密码" 
      icon="lock"  
      :errorText="pswerror"
      hintText="请输入密码" 
      v-model="password"
      @input="passwordAvalide"
      labelFloat/><br/>

    <div class="code-field">
      <mu-text-field 
        ref="codeinput"
        class="special-text-field" 
        type="text"
        :disabled="codestate"
        v-model="inputcode"
        @input="codeAvalide"
        :errorText="codeerror"/>
      <span class="codestring-inner">{{codeString}}</span>
      <mu-flat-button 
        label="看不清？换一个" 
        class="demo-raised-button" 
        primary 
        @click="newCodeString"/>
    </div>
    <div class="form-action">
      <mu-raised-button 
        label="提交" 
        class="submit-btn" 
        secondary
        :disabled="substate"
        @click="submitForm('ruleForm')"/>
    </div>
    <div class="login-helpers" v-if="substate">
      <mu-circular-progress :size="40"/>
      <!-- <el-button router type='text'>忘记密码?</el-button> -->
    </div>
  </mu-paper>
</template>
 
<script>
  import 'scss/_code.scss'
  import {mapActions} from 'vuex'
  import {StringFormat, Format, Log} from 'utils'

  export default {
    props: ['signType'],
    data () {
      return {
        state: false,
        codeString: '',
        usererror: '',
        username: '',
        password: '',
        pswerror: '',
        inputcode: '',
        codeerror: '',
        codestate: false,
        substate: false
      }
    },
    created () {
      this.newCodeString()
    },
    methods: {
      ...mapActions([
        'userlogin'
      ]),
      userAvalide () {
        let re = /^[a-zA-z]\w{3,15}$/
        console.log(re.test(this.username))
        // this.username !== 'admin'
        let flag = re.test(this.username)
        flag ? this.usererror = ''
        : this.usererror = '字母、数字、下划线组成，字母开头，4-16位'
        return flag
      },
      passwordAvalide () {
        let re = /^\s*$/
        console.log(re.test(this.password))
        let flag = !re.test(this.password) && this.password.length >= 6
        flag ? this.pswerror = ''
        : this.pswerror = '密码开头不能为空格，至少6位'
        return flag
      },
      codeAvalide () {
        let vm = this
        console.log(this.inputcode.length)
        console.log(vm.$refs['codeinput'].$el.getElementsByTagName('input')[0].maxLength = '4')
        // this.inputcode.length >= 4
        // ? this.codestate = true
        // : this.codestate = false
        let flag = this.inputcode === vm.codeString
        flag ? this.codeerror = ''
        : this.codeerror = '验证码输入错误'
        return flag
      },
      submitForm (formName) {
        var vm = this
        console.log(vm.state)
        let vuser = this.userAvalide()
        let vpsw = this.passwordAvalide()
        let vcod = this.codeAvalide()
        console.log('*******************************')
        console.log(vuser && vpsw && vcod)
        let valid = vuser && vpsw && vcod
        // var resurl = 'http://192.168.25.102:80/api/users'
        // var resurl = global.host + '/api/createusers'
        var resurl = global.host + '/webapi/createusers'
        console.log(vm.$refs[formName])
        // vm.$refs[formName].validate((valid) => {
        if (valid) {
        //     // alert('submit!')
        //     // vm.$http.get(resurl)
          vm.substate = true
          vm.ruleForm = {
            username: vm.username
          }
          vm.$http.post(resurl,
            {
              'username': vm.username,
              'password': vm.password
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
                'accessToken': global.authdata,
                'login': true
              }))
              vm.$router.push({path: '/'})
            }, function (res) {
              // 测试统一异常处理工具
              try {
                console.error('失败')
                // throw new Exception('系统异常', '10001', vm)
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
                'accessToken': global.authdata,
                'login': true
              }))
              vm.$router.push({path: '/'})
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
      },
      sendCode () {
        // let vm = this
        // vm.sendCodeInner = '重新发送(' + vm.countdown + ')'
        // if (vm.countdown === 0) {
        //   vm.tar = false
        //   vm.sendCodeInner = '获取验证码'
        //   vm.countdown = 60
        //   return
        // } else {
        //   vm.tar = true
        //   vm.sendCodeInner = '重新发送(' + vm.countdown + ')'
        //   vm.countdown--
        //   console.log(vm.countdown)
        // }
        // setTimeout(function () { vm.sendCode() }, 1000)
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

<style lang='scss'>
  .code-form-item{
    .el-input{
      width: 120px;
      text-align: center;
    }
  }
  .code-field{
    padding-left: 56px;
    .special-text-field{
      width: 120px;
    }
  }
  .st-form{
    color: #555555;
    .bigintro {
      font-size: 32px;
      line-height: 50px;
      text-align: center;
      font-weight: 300;
      margin-top: 0px;
      margin-bottom: 0;
      text-transform: uppercase;
    }
    .divide-40{
      width: 100%;
      height: 40px;
    }
    .divide-20{
      width: 100%;
      height: 20px;
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
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #cccccc;
      opacity: .6;
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
    linear-gradient(90deg, transparent 80px, #abced4 79px, #abced4 81px, transparent 81px),
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
