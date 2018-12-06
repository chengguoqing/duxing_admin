<template>
<div >

<el-container>
    <el-aside class="df_deeryt">
        
        <div class="cen pt40 pm20" v-if="$store.state.auth">
            <img :src="$store.state.auth.user_imageUrl" class="user_icon yj">
            <p  class="cf fz14">  {{$store.state.auth.user_name}}</p>
        </div>
        
          <el-menu
      :default-active="d_jh_d"
      background-color="#545c64"
      text-color="#fff"
     >
   
         <el-menu-item index="1" >
              <nuxt-link to="/ouyan/">
        <i class="el-icon-document"></i>
        <span slot="title">首页</span>
    </nuxt-link>
      </el-menu-item>
              
                 <el-menu-item index="2" >
                       <nuxt-link to="/ouyan/huodong?type=0">
        <i class="el-icon-document"></i>
        <span slot="title">活动</span>
    </nuxt-link>
      </el-menu-item>
              
              
      <el-menu-item index="3" >
           <nuxt-link to="/ouyan/huodong?type=1">
        <i class="el-icon-document"></i>
        <span slot="title">社区</span>
    </nuxt-link>
      </el-menu-item>
                  
      <el-menu-item index="4" >
          
            <nuxt-link to="/ouyan/userinfo">
        <i class="el-icon-document"></i>
        <span slot="title">用户管理</span>
    </nuxt-link>
      </el-menu-item>
              
              
                     <el-menu-item index="5" >
                  <nuxt-link to="/ouyan/add_biaoqian">
        <i class="el-icon-document"></i>
        <span slot="title">标签管理</span>
    </nuxt-link>
      </el-menu-item> 
              
              
             <el-menu-item index="6"  v-if="$store.state.auth&&$store.state.auth.user_dj==0">
                  <nuxt-link to="/ouyan/user_gl" >
        <i class="el-icon-document"></i>
        <span slot="title">管理员设置</span>
    </nuxt-link>
      </el-menu-item> 
              
                    <el-menu-item index="7" @click="logout" >
        <i class="el-icon-document"></i>
        <span slot="title">退出登录</span>
      </el-menu-item>   
              
              
    </el-menu>




    </el-aside>
    <el-main>
           <nuxt/>
    </el-main>
    
    </el-container>
 
      
</div>
</template>
<script>
    const Cookie = process.client ? require('js-cookie') : undefined

    export default {
      
        data() {
            return {
                d_jh_d: "1",

            }
        },
        components: {

        },
        methods: {
            logout() {

                Cookie.remove('auth')
                this.$store.commit('setAuth', null)
                location.reload()
            }
        },
        mounted() {
            let sd_dr = this.$route.path


            if (sd_dr.indexOf('huodong') > 0) {
                if (this.$route.query.type == 0) {
                    this.d_jh_d = "2"
                } else {
                    this.d_jh_d = "3"
                }

            }
            
            
              if (sd_dr.indexOf('userinfo') > 0) {
                this.d_jh_d = "4"
            }
            if (sd_dr.indexOf('add_biaoqian') > 0) {
                this.d_jh_d = "5"
            }
            if (sd_dr.indexOf('user_gl') > 0 || sd_dr.indexOf('add_usergl') > 0) {
                this.d_jh_d = "6"
            }

        },
    }

</script>
<style>
    .df_deeryt a {
        display: block;
    }

</style>
<style scoped>
    .df_deeryt {
        background: #545c64;
        width: 200px !important;
        min-height: 1000px
    }

    .df_deeryt .el-menu {
        border: 0 !important
    }

    .user_icon {
        width: 60px;
        height: 60px;
    }

</style>
