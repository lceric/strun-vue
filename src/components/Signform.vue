<template>
  <mu-paper ref="ruleForm" class="st-form" :zDepth="1">
    <h2 class="bigintro">{{signType}}</h2>
    <mu-popup position="top" :overlay="false" popupClass="demo-popup-top" :open="topPopup">
      {{signMessage}}
    </mu-popup>
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
      <div class="st-cover"></div>
    </div>
    <!-- <button @click="test">测试</button> -->
  </mu-paper>
</template>
 
<script>
  import 'scss/_code.scss'
  import {mapActions} from 'vuex'
  import {StringFormat, Format, Log} from 'utils'
  import api from '../api'
  import qs from 'qs'
  import md5 from 'js-md5'

  export default {
    props: ['signType'],
    data () {
      return {
        topPopup: false,
        signMessage: '',
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
      test () {
        api.post('/User/login.php',
          qs.stringify({
            'loginname': 'steven',
            'password': '1f3c71b227f1b77bc4355cb00adbc789'
          }))
        .then(function (data) {
          console.log(data)
        })
      },
      userAvalide () {
        let re = /^[a-zA-z]\w{3,15}$/
        console.log(re.test(this.username))
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
        let flag = this.inputcode === vm.codeString
        flag ? this.codeerror = ''
        : this.codeerror = '验证码输入错误'
        return flag
      },
      submitForm (formName) {
        var vm = this
        vm.topPopup = false
        console.log(vm.state)
        let vuser = this.userAvalide()
        let vpsw = this.passwordAvalide()
        let vcod = this.codeAvalide()
        console.log(vuser && vpsw && vcod)
        let valid = vuser && vpsw && vcod
        var resurl = global.host + '/User/login.php'
        // console.log(vm.$refs[formName])
        // var md5 = function (str) {
        //   var cryptomd5 = crypto.createHash('md5')
        //   cryptomd5.update(str, 'utf8')
        //   return cryptomd5.digest('hex')
        // }
        // console.info(md5('lichao277'))
        if (valid) {
          vm.substate = true
          // vm.ruleForm = {
          //   username: vm.username
          // }
          let params = {
            'loginname': vm.username,
            'password': md5(vm.password)
          }
          console.info(params)
          api.post(resurl, params)
            .then(function (res) {
              vm.topPopup = true
              vm.signMessage = '登录成功!'
              // console.log(res.data)
              // global.authdata = res.userid
              // sessionStorage.setItem('accessToken', global.authdata)
              vm.userlogin(Object.assign(res.data, {
                // 'accessToken': global.authdata,
                'login': true
              }))
              // sessionStorage.setItem('stUser', JSON.stringify(res.data))
              vm.$router.push({path: '/'})
            })
            .catch(error => {
              console.info(error.response)
              vm.substate = false
              vm.signMessage = error.response.data.message
              vm.topPopup = true
            })
        } else {
          // 测试日志工具
          Log('error submit!!')
          vm.topPopup = true
          vm.signMessage = 'error submit!!'
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
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      &,
      .st-cover{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
      .st-cover{
        background: #cccccc;
        opacity: .3;
      }
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
