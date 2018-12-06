<template>


    <div>
            <div class="denglu_erert">
           
     <vue-particles color="#dedede"   :linesWidth="3"   :lineOpacity="0.5" class="bg_fdert"></vue-particles>  
    </div>
    
        <section class="denglu_ert">
        <p class="fz18 z3">用户登录</p>
        
          <el-form   class="mt20">
               <el-form-item  class="fz16 z3">
    <el-input placeholder="请输入用户名"  auto-focus="true" v-model="user_name" ></el-input>
                
  </el-form-item>
              
               <el-form-item class="fz16 z3">
      <el-input placeholder="请输入密码" type="password" v-model="user_paw" ></el-input>
  </el-form-item>
           <el-form-item class="fz16 z3 mt40">
                <el-button type="primary" class="fz16 w100" @click="postLogin">登录</el-button>
    </el-form-item>
               
              
               
    </el-form>
        
    </section>

</div>


</template>
<script>
    const Cookie = process.client ? require('js-cookie') : undefined

    export default {
        middleware: 'notAuthenticated',
        data() {
            return {
                user_name: "",
                user_paw: ""
            }
        },
        methods: {
            postLogin() {
                let th=this
                if (!this.user_name) {
                    this.$message.error('请输入用户名！');
                    return
                }
                if (!this.user_paw) {
                    this.$message.error('请输入密码！');
                    return
                }
                this.post("loading", {
                    user_name: this.user_name,
                    user_paw: this.user_paw
                }, function(data) {
                    th.$message({
                        message: data.msg,
                        type: 'success'
                    });
                    th.$store.commit('setAuth', data.data[0])
                    Cookie.set('auth', data.data[0])
                    th.$router.push('/ouyan/')
                })
            }
        }
    }

</script>
<style>
    <style>.denglu_ert .el-input__inner {
        font-size: 16px;
        color: #333;
        background: rgba(255, 255, 255, 0.5)!important
    }

    input:-webkit-autofill {
        background-color: rgba(255, 255, 255, 0.5)!important;
        background-image: none;
        color: #000;
    }

</style>

<style scoped>
    .denglu_erert {
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        background: url("../../assets/img/denglu.jpg") center center;
        background-size: cover;
    }


    .denglu_ert {
        width: 350px;
        height: 280px;
        background: rgba(255, 255, 255, 0.6);
        position: fixed;
        left: 0px;
        top: 0px;
        right: 0px;
        bottom: 0px;
        margin: auto;
        border-radius: 4px;
        padding: 20px;
    }

</style>
