<template>
    <div>
        <div class="register-wrapper">
            <div id="register">
                <p class="title">注册</p>
                <el-form
                        :model="ruleForm2"
                        status-icon
                        :rules="rules2"
                        ref="ruleForm2"
                        label-width="0"
                        class="demo-ruleForm"
                >
                    <el-form-item prop="account">
                        <el-input
                                v-model="ruleForm2.username"
                                auto-complete="off"
                                placeholder="请输入用户名"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="tel">
                        <el-input v-model="ruleForm2.tel" auto-complete="off" placeholder="请输入手机号"></el-input>
                    </el-form-item>
<!--                    <el-form-item prop="smscode" class="code">-->
<!--                        <el-input v-model="ruleForm2.smscode" placeholder="短信验证码"></el-input>-->
<!--                        <el-button type="primary" :disabled='isDisabled' @click="sendCode">{{buttonText}}</el-button>-->
<!--                    </el-form-item>-->
                    <el-form-item prop="vcode" class="code">
                        <el-input v-model="ruleForm2.vcode" placeholder="图片验证码"></el-input>
                        <img style="margin-left: 150px" src="http://192.168.100.116:8080/user/verify_code" onclick="this.src=this.src+'?'+Math.random()"/>
                        <button></button>
                    </el-form-item>
                    <el-form-item prop="pass">
                        <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="输入密码"></el-input>
                    </el-form-item>
                    <el-form-item prop="checkPass">
                        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm2')" style="width:100%;">注册</el-button>
                        <p class="login" @click="gotoLogin">已有账号？立即登录</p>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "Register",
        data() {
            let username = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入账号"));
                } else {
                    callback();
                }
            };
            // <!--验证手机号是否合法-->
            let checkTel = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号码'))
                } else if (!this.checkMobile(value)) {
                    callback(new Error('手机号码不合法'))
                } else {
                    callback()
                }
            }
            //  <!--验证码是否为空-->
            let checkSmscode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机验证码'))
                } else {
                    callback()
                }
            }
            // <!--验证密码-->
            let validatePass = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入密码"))
                } else {
                    if (this.ruleForm2.checkPass !== "") {
                        this.$refs.ruleForm2.validateField("checkPass");
                    }
                    callback()
                }
            }
            // <!--二次验证密码-->
            let validatePass2 = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请再次输入密码"));
                } else if (value !== this.ruleForm2.password) {
                    callback(new Error("两次输入密码不一致!"));
                } else {
                    callback();
                }
            };
            return {
                ruleForm2: {
                    username:"",
                    password: "",
                    checkPass: "",
                    tel: "",
                    smscode: "",
                    vcode: ""
                },
                confirmRuleForm:{
                },
                rules2: {
                    username: [
                        { required: true, message: "请输入账号", trigger: "blur" },
                        { validator: username, trigger: "change" }
                    ],
                    password: [{ validator: validatePass, trigger: 'change' }],
                    checkPass: [{ validator: validatePass2, trigger: 'change' }],
                    tel: [{ validator: checkTel, trigger: 'change' }],
                    smscode: [{ validator: checkSmscode, trigger: 'change' }],
                },
                buttonText: '发送验证码',
                isDisabled: false, // 是否禁止点击发送验证码按钮
                flag: true
            }
        },
        methods: {
            // <!--发送验证码-->
            sendCode () {
                let tel = this.ruleForm2.tel
                if (this.checkMobile(tel)) {
                    console.log(tel)
                    let time = 60
                    this.buttonText = '已发送'
                    this.isDisabled = true
                    if (this.flag) {
                        this.flag = false;
                        let timer = setInterval(() => {
                            time--;
                            this.buttonText = time + ' 秒'
                            if (time === 0) {
                                clearInterval(timer);
                                this.buttonText = '重新获取'
                                this.isDisabled = false
                                this.flag = true;
                            }
                        }, 1000)
                    }
                }
            },
            // <!--提交注册-->
            submitForm(formName) {
                console.log('发送请求')
                axios.post(`http://192.168.100.116:8080/user/registry`,this.ruleForm2).then(res => {
                    console.log('res=>', res);
                    this.confirmRuleForm = res.data
                    console.log(this.confirmRuleForm.msg)
                    this.$refs[formName].validate(valid => {
                        if (valid &&this.confirmRuleForm.code=="200") {
                            setTimeout(() => {
                                this.$message({
                                    message: "注册成功！",
                                    type: "success",
                                });
                                this.gotoLogin()
                            }, 400);
                        } else if (this.confirmRuleForm.code == "A003") {
                            console.log("验证码错误!!");
                            return false;
                        }else if (this.confirmRuleForm.code == "A002"){
                            console.log("用户名已存在!!")
                            return false
                        }
                    })
                })
            },
            // <!--进入登录页-->
            gotoLogin() {
                this.$router.push({
                    path: "/"
                });
            },
            // 验证手机号
            checkMobile(str) {
                let re = /^1\d{10}$/
                if (re.test(str)) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    };
</script>

<style scoped>
    .loading-wrapper {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: #aedff8;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .register-wrapper img {
        position: absolute;
        z-index: 1;
    }
    .register-wrapper {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
    }
    #register {
        max-width: 340px;
        margin: 60px auto;
        background: #fff;
        padding: 20px 40px;
        border-radius: 10px;
        position: relative;
        z-index: 9;
    }
    .title {
        font-size: 26px;
        line-height: 50px;
        font-weight: bold;
        margin: 10px;
        text-align: center;
    }
    .el-form-item {
        text-align: center;
    }
    .login {
        margin-top: 10px;
        font-size: 14px;
        line-height: 22px;
        color: #1ab2ff;
        cursor: pointer;
        text-align: left;
        text-indent: 8px;
        width: 160px;
    }
    .login:hover {
        color: #2c2fd6;
    }
    .code >>> .el-form-item__content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .code button {
        margin-left: 20px;
        width: 140px;
        text-align: center;
    }
    .el-button--primary:focus {
        background: #409EFF;
        border-color: #409EFF;
        color: #fff;
    }
</style>
