<template>
    <div class="login" @keyup.enter="submitBtn">
      <div class="logo">
        <img src="/static/image/common/basename_login.png"/>
      </div>
      <div class="login-box">
        <div class="loin-title">用户登录</div>
          <div class="login-input">
            <input type="text" v-model="userVal" placeholder="用户名" maxlength='20' @blur="oUser"/>
            <i class="icon wiconfont wicon-user"></i>
            <div class="login-prompt" v-show="userPrompt">{{userPrompt}}</div>
          </div>
          <div class="login-input">
            <input type="password" v-model="pwdVal" placeholder="密码" maxlength="20" @blur="oPwd"/>
            <i class="icon wiconfont wicon-password"></i>
            <p>密码</p>
            <div class="login-prompt" v-show="pwdPrompt">{{pwdPrompt}}</div>
          </div>
          <div class="login-input">
            <input type="text" v-model="VerificationVal" placeholder="验证码" maxlength="4" @blur="oVerification"/>
            <i class="icon wiconfont wicon-yanzhengma"></i>
            <img :src="VerificationUrl" @click="update"/>
            <div class="login-prompt" v-show="verificationPrompt">{{verificationPrompt}}</div>
          </div>
          <a href="javascript:void(0)" class="login-btn" @click="submitBtn">登录</a>
      </div>
    </div>
</template>

<script>

  import { mapGetters , mapActions } from 'vuex'
    export default {
        name: "login",
      data(){
          return{
            userVal:'admin',
            userPrompt:'',
            pwdVal:'1',
            pwdPrompt:'',
            VerificationVal:'',
            verificationPrompt:'',
            VerificationUrl:'/api/captchaImageCreate/captchaImage'
          }
      },
      computed: {
        ...mapGetters(['getLogin','getUser'])
      },
      methods: {
        ...mapActions(["login"]),
        //用户名验证
        oUser(){
          let _self=this;
          let user= _self.validate.require(0,this.userVal);
          if(!user.success){
            this.userPrompt=user.message;
          }
          else{
            this.userPrompt='';
          }
        },
        //密码验证
        oPwd(){
          let _self=this;
        /*  let pwd= _self.validate.require(1,_self.pwdVal);
          if(!pwd.success){
            _self.pwdPrompt=pwd.message;
          }
          else{
            _self.pwdPrompt="";
          }*/
        },
        //验证码验证
        oVerification(){
          let _self=this;
          let verification=_self.validate.require(2,_self.VerificationVal);
          if(!verification.success){
            _self.verificationPrompt=verification.message;
          }
          else{
            _self.verificationPrompt="";
          }
        },
        //修改验证图片地址
        update(){
          this.VerificationUrl="/api/captchaImageCreate/captchaImage?timer="+new Date().getTime()
        },
        submitBtn(){
          let _self=this;
          let user= _self.validate.require(0,this.userVal);
          let pwd= _self.validate.require(1,_self.pwdVal);
          let verification=_self.validate.require(2,_self.VerificationVal);
          if(_self.userVal===""){
            _self.userPrompt="用户名不能为空";
          }
          if(_self.pwdVal===""){
            _self.pwdPrompt="密码不能为空";
          }
          if(_self.VerificationVal===""){
            _self.verificationPrompt="验证码不能为空";
            return ;
          }
          let hexPwd=hex_sha1(hex_md5(_self.pwdVal));

          _self.login({userAccount:_self.userVal,userPwd:hexPwd,authorizeCode:_self.VerificationVal});
         /* if(user.success && pwd.success && verification.success){
            _self.login({userAccount:_self.userVal,userPwd:_self.pwdVal,authorizeCode:_self.VerificationVal});
            console.log(_self.getUser.requiresAuth)
          }*/

        },
      }
    }
</script>

