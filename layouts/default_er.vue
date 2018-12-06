<template>
  <div>
      
  <div class="bgff bbm sdf_jh_det">
                <div class="wd dx_nav pr">
                    <img src="../static/img/logo.png" class="logo_ert cz">
                   <span class="sd_jh_rtd">
                         <a :class="$store.state.counter==1?'act':''">首页</a>
                        <a :class="$store.state.counter==2?'act':''">提交需求</a>
                        <a :class="$store.state.counter==3?'act':''">常见问题</a>
                        <a :class="$store.state.counter==4?'act':''">关于我们</a>
                    </span>
                    <span  class="s_dkhj_rt">
                        <a class="act">登录</a>
                        <a>注册</a>
                    </span>
                </div>
            </div>
    <nuxt/>
      
      <div class="pt20 pm20 dsf_deer z9 fz12 cen mt60">
      粤ICP备16106899号-1 独行工匠 v3.9.7 © duxinggj.com All Rights Reserved.
    </div>
      <script src="https://duxinggj-2018-1251133427.cos.ap-guangzhou.myqcloud.com/jquery.min.js"> </script>
      <script src="	https://duxinggj-2018-1251133427.cos.ap-guangzhou.myqcloud.com/jquery.SuperSlide.2.1.1.js"></script>
  </div>
</template>
<script>
    export default {
        props: ['error']
    }

</script>
<style scoped>
    .sdf_jh_det{
        position: sticky;
        left: 0px;
        top: 0px;
        z-index: 1000
    }
    .dx_nav {
        line-height: 60px;
    }

    .logo_ert {
        width: 210px;
    }

    .sd_jh_rtd a {
        margin-right: 30px;
        color: #333;
        font-size: 16px;
        padding: 17px;
        padding-top: 0px;
        cursor: pointer
    }

    .sd_jh_rtd a.act {
        color: #009ef6;
        border-bottom: 2px solid #009ef6
    }

    .s_dkhj_rt {
        position: absolute;
        right: 0px;
        top: 0px;
    }

    .s_dkhj_rt a {
        border: 1px solid #e0e0e0;
        padding: 5px 20px;
        font-size: 16px;
        border-radius: 4px;
        color: #009ef6;
        margin-left: 15px;

    }

    .s_dkhj_rt a.act {
        background: #009ef6;
        color: #fff;
        border: 1px solid #009ef6
    }
    .dsf_deer{
        background: #000
    }

</style>
