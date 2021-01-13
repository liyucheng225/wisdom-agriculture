<template>
    <div class="page">
        <div class="login-box">
            <p data-v-032893be class="title">欢迎登录</p>
            <el-tabs v-model="activeName" @tab-click="emptyCode();getVcode()">
                <el-tab-pane label="密码登录" name="first"  >
                    <el-form
                            :model="ruleForm"
                            status-icon
                            :rules="rules"
                            ref="ruleForm"
                            label-width="0"
                            class="demo-ruleForm"
                    >
                        <el-form-item prop="account"  >
                            <el-input
                                    type="text"
                                    prefix-icon="el-icon-user-solid"
                                    v-model="ruleForm.username"
                                    auto-complete="off"
                                    placeholder="请输入账号"

                            ></el-input>
                        </el-form-item>
                        <el-form-item prop="pass">
                            <el-input
                                    type="password"
                                    prefix-icon="el-icon-lock"
                                    v-model="ruleForm.password"
                                    auto-complete="off"
                                    placeholder="请输入密码"
                            ></el-input>
                        </el-form-item>
                        <el-form-item prop="vcode" class="code">
                            <el-input v-model="ruleForm.vcode" placeholder="图片验证码"></el-input>
                            <img :src="src"/>
                            <span style="color:blue;font-size: 13px;padding-left: 40px" @click="getVcode">看不清换一张</span>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                    type=primary
                                    @click="submitForm('ruleForm')"
                                    style="width:100%;"
                            >登录</el-button>
                        </el-form-item>
                        <el-form-item class="login">
                            <label id="showPasswordToggle">
                                <el-checkbox v-model="checked" id="showPasswordCheck">已阅读并同意《服务协议》</el-checkbox>
                            </label>
                            <div class="gotoRight">
                                <span @click="gotoLoginForget">忘记密码</span>
                                <el-divider direction="vertical"></el-divider>
                                <span @click="gotoLoginReg">免费注册</span>
                            </div>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="手机号登录" name="second" >
                    <el-form
                            :model="ruleForm"
                            status-icon
                            :rules="rules"
                            ref="ruleForm"
                            label-width="0"
                            class="demo-ruleForm"
                    >
                        <el-form-item prop="tel">
                            <el-input  type="text"
                                       prefix-icon="el-icon-user-solid"
                                       v-model="ruleForm.phone"
                                       auto-complete="off"
                                       placeholder="请输入手机号"
                            ></el-input>
                        </el-form-item>
                        <el-form-item prop="pass" v-if="visible">
                            <el-input
                                    type="password"
                                    prefix-icon="el-icon-lock"
                                    v-model="ruleForm.password"
                                    auto-complete="off"
                                    placeholder="请输入密码"
                            >
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="vcode" class="code">
                            <el-input v-model="ruleForm.vcode" placeholder="图片验证码"></el-input>
                            <img :src="src"/>
                            <span style="color:blue;font-size: 13px;padding-left: 40px" @click="getVcode">看不清换一张</span>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                    type=primary
                                    @click="submitForm('ruleForm')"
                                    style="width:100%;"
                            >登录</el-button>
                        </el-form-item>
                        <el-form-item class="login">
                            <label id="showPasswordToggle1">
                                <el-checkbox v-model="checked" id="showPasswordCheck">已阅读并同意《服务协议》</el-checkbox>
                            </label>
                            <div class="gotoRight">
                                <span @click="gotoLoginForget">忘记密码</span>
                                <el-divider direction="vertical"></el-divider>
                                <span @click="gotoLoginReg">免费注册</span>
                            </div>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
    import axios from "axios";
    export default {
        name: "Login",
        data() {
            // <!--验证账号-->
            let account = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入账号"));
                } else {
                    callback();
                }
            };
            // <!--验证密码-->
            let validatePass = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入密码"));
                } else {
                    callback();
                }
            };
            // <!--验证手机号是否合法-->
            // let checkTel = (rule, value, callback) => {
            //     if (value === "") {
            //         callback(new Error("请输入手机号码"));
            //     } else if (!this.checkMobile(value)) {
            //         callback(new Error("请输入正确的11位手机号码"));
            //     } else {
            //         callback();
            //     }
            // };
            return {
                confirmRuleForm:{},
                src:"http://192.168.100.116:8080/user/verify_code",
                ruleForm: {
                    username: "",
                    phone: "",
                    password: "",
                    vcode:""
                },
                rules: {
                    username: [
                        { required: true, message: "请输入账号", trigger: "blur" },
                        { validator: account, trigger: "blur" }
                    ],
                    password: [
                        { required: true, message: "请输入密码", trigger: "blur" },
                        { validator: validatePass, trigger: "blur" }
                    ],
                    // tel: [
                    //     { required: true, message: "请输入手机号", trigger: "blur" },
                    //     {
                    //         pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
                    //         message: "请输入正确的11位手机号码",
                    //         trigger: "blur"
                    //     },
                    //     { validator: checkTel, trigger: "blur" }
                    // ],
                },
                activeName: "first",
                flag: true,
                visible: true,
                checked: true,
                disabled: 0,
                isLog: false,
                isLogin: false,
                logining: false
            };
        },
        methods: {
            getVcode(){
                console.log("刷新")
                this.src=this.src+'?'+Math.random()
            },
            //密码判断渲染，true:暗文显示，false:明文显示
            // changePass(value) {
            //     this.visible = !(value === "show");
            // },
            // <!--提交登录-->
            submitForm(formName) {
                if ((this.ruleForm.username && this.ruleForm.phone) == "" && this.ruleForm.vcode == ""  && this.ruleForm.password == "") {
                        this.$message.error({
                            message: "请输入完整信息！",
                        });
                        this.getVcode();
                        this.emptyCode()
                } else {
                    console.log('发送请求')
                    axios.post(`http://192.168.100.116:8080/user/login`, this.ruleForm).then(res => {
                        console.log('res=>', res);
                        this.confirmRuleForm = res.data
                        console.log(this.confirmRuleForm.msg)
                        this.$refs[formName].validate(valid => {
                            if (valid&&this.confirmRuleForm.code == "200") {
                                this.logining = true;
                                setTimeout(() => {
                                    this.$message.success({
                                        message: "登录成功！",
                                        type: "success"
                                    });
                                    this.gotoHome()
                                }, 400);
                            } else if (this.confirmRuleForm.code == "A001") {
                                this.$message.error("用户名不存在,登录失败!!")
                                console.log("用户名不存在,登录失败!!");
                                return false;
                            } else if (this.confirmRuleForm.code == "A005") {
                                this.$message.error("用户存在,密码错误!!")
                                console.log("用户存在,密码错误!!");
                                return false;
                            } else if (this.confirmRuleForm.code == "A003") {
                                this.$message.error("验证码错误!!")
                                console.log("验证码错误!!");
                                return false;
                            }
                        });
                    })
                }
            },
            // <!--免费注册页-->
            gotoLoginReg() {
                this.$router.push({
                    path: "/Register"
                });
            },
            // <!--忘记密码页-->
            gotoLoginForget() {
                this.$router.push({
                    path: "/LoginForget"
                });
            },
            emptyCode(){
                console.log("清空")
                this.ruleForm.vcode=""
                this.ruleForm.password=""
                this.ruleForm.phone=""
                this.ruleForm.username=""
            },
            gotoHome(){
                this.$store.commit("userStatus",true)
                this.$store.commit("changeUser",this.confirmRuleForm)
                this.$router.push({
                    path:"/Home"
                });
            },
            // 验证手机号
            // checkMobile(str) {
            //     let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
            //     if (reg.test(str)) {
            //         return true;
            //     } else {
            //         return false;
            //     }
            // }
        }
    };
</script>

<style lang="scss" scoped>
  $white-bg-color: #ffffff;
  $bg-color: #f7f7f7;
  $btn-color: #409eff;
  .page {
    background-color: $bg-color;
    position: absolute;
    width: 100%;
    height: 100%;
    font-size: 16px;
    font-family: "Source Sans Pro", sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    .login-box {
      position: absolute;
      top: 45%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      display: block;
      width: 100%;
      max-width: 400px;
      background-color: $white-bg-color;
      margin: 0;
      padding: 15px 35px;
      box-sizing: border-box;
      // border: solid 1px #ddd;
      border-radius: 0.5em;
      font-family: "Source Sans Pro", sans-serif;
      .title {
        font-size: 20px;
        line-height: 50px;
        font-weight: bold;
        margin: 10px;
        text-align: center;
      }
     .el-tabs__header {
        margin: 0 0 30px 0;
      }
     .el-tabs__nav-wrap::after {
        height: 0;
      }
      #tab-first::after {
        content: "";
        position: absolute;
        right: 0;
        bottom: 0;
        width: 1px;
        height: 20px;
        background-color: #dcdfe6;
        margin: 8px 0;
        vertical-align: middle;
      }
      .code .el-form-item__content {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .code button {
        margin-left: 20px;
        width: 140px;
        text-align: center;
      }
      .el-form-item:last-child {
        margin-bottom: 6px;
      }
      .el-button--primary:focus {
        background: $btn-color;
        border-color: $btn-color;
        color: $white-bg-color;
      }
      .el-input__suffix-inner {
        margin-right: 6px;
      }
    }
    .login {
      margin-top: -15px;
      font-size: 12px;
      cursor: pointer;
      text-align: left;
      .gotoRight {
        float: right;
        color: #999999;
        &:hover {
          color: $btn-color;
        }
      }
    }
  }
</style>