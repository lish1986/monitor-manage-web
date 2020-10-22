<template>
  <div class="login-container">
    <div class="title-container">
      <h3 class="title">监控管理系统</h3>
    </div>
    <div class="login-form">
      <el-tabs value="message" @tab-click="handleTabChange">
        <el-tab-pane label="短信登录" name="message">
          <el-form
            ref="messageLoginForm"
            :model="messageLoginForm"
            :rules="messageLoginRules"
            auto-complete="on"
            label-position="left"
          >
            <el-form-item prop="phoneNumber">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input
                ref="phoneNumber"
                v-model="messageLoginForm.phoneNumber"
                placeholder="请输入手机号"
                name="phoneNumber"
                type="text"
                tabindex="1"
                auto-complete="on"
              />
            </el-form-item>
            <el-form-item prop="verifyCode">
              <span class="svg-container">
                <svg-icon icon-class="message" />
              </span>
              <el-input
                ref="verifyCode"
                v-model="messageLoginForm.verifyCode"
                placeholder="请输入验证码"
                name="verifyCode"
                type="text"
                tabindex="2"
                auto-complete="on"
                class="verify-input"
              />
              <el-button @click="getVerifyCode" :disabled="verifyCodeSended"
                >获取验证码</el-button
              >
            </el-form-item>
            <div class="tips" v-if="verifyCodeSended">
              <span>短信验证码已发送, 可能会有延后请耐心等待</span>
            </div>

            <el-button
              :loading="loading"
              type="primary"
              style="width: 100%"
              @click.native.prevent="handleLogin"
              >登录</el-button
            >
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="密码登录" name="password">
          <el-form
            ref="passwordLoginForm"
            :model="passwordLoginForm"
            :rules="passwordLoginRules"
            auto-complete="on"
            label-position="left"
          >
            <el-form-item prop="username">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input
                ref="username"
                v-model="passwordLoginForm.username"
                placeholder="请输入用户名"
                name="username"
                type="text"
                tabindex="1"
                auto-complete="on"
              />
            </el-form-item>
            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="passwordLoginForm.password"
                :type="passwordType"
                placeholder="请输入密码"
                name="password"
                tabindex="2"
                auto-complete="on"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon
                  :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
                />
              </span>
            </el-form-item>

            <el-button
              :loading="loading"
              type="primary"
              style="width: 100%"
              @click.native.prevent="handleLogin"
              >登录</el-button
            >
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码长度不能低于6位"));
      } else {
        callback();
      }
    };

    const validatePhoneNumber = (rule, value, callback) => {
      if (!value || value == "") {
        callback(new Error("请输入手机号"));
      } else {
        callback();
      }
    };
    const validateVerifyCode = (rule, value, callback) => {
      if (!value || value == "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      messageLoginForm: {
        phoneNumber: "",
        verifyCode: "",
      },
      passwordLoginForm: {
        username: "",
        password: "",
      },
      passwordLoginRules: {
        username: [
          {
            required: true,
            trigger: "blur",
            validator: validateUsername,
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            validator: validatePassword,
          },
        ],
      },
      loginType: "",
      messageLoginRules: {
        phoneNumber: [
          {
            required: true,
            trigger: "blur",
            validator: validatePhoneNumber,
          },
        ],
        verifyCode: [
          {
            required: true,
            trigger: "blur",
            validator: validateVerifyCode,
          },
        ],
      },
      loading: false,
      verifyCodeSended: false,
      passwordType: "password",
      redirect: undefined,
      tipsText: "",
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    // 获取验证码
    getVerifyCode() {
      console.log("verify code sended...");
      this.verifyCodeSended = true;
    },
    // toggle密码
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleTabChange(tab) {
      this.loginType = tab.name;
    },
    handleLogin() {
      // 选择短信登录
      if (this.loginType == "message") {
        this.$refs.messageLoginForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            this.$store
              .dispatch("user/login", this.messageLoginForm)
              .then(() => {
                this.$router.push({
                  path: this.redirect || "/",
                });
                this.loading = false;
              })
              .catch(() => {
                this.loading = false;
              });
          } else {
            console.log("用户输入有误!!");
            return false;
          }
        });
      } else {
        // 选择用户名+密码登录
        this.$refs.passwordLoginForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            this.$store
              .dispatch("user/login", this.passwordLoginForm)
              .then(() => {
                this.$router.push({
                  path: this.redirect || "/",
                });
                this.loading = false;
              })
              .catch(() => {
                this.loading = false;
              });
          } else {
            console.log("用户输入有误!!");
            return false;
          }
        });
      }
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-tabs__item {
    &.is-active {
      color: #409eff;
    }

    color: white;
    font-size: 16px;
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style
><style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 400px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .verify-input {
    width: 55%;
  }

  .tips {
    font-size: 12px;
    color: #fff;
    margin-bottom: 20px;

    // span {
    //   &:first-of-type {
    //     margin-right: 16px;
    //   }
    // }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    top: 150px;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
