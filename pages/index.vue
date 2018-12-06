<template>
<div >
    <div class="sd_dertydc">
      <div class="fullSlide">
            <div class="bd">
                <ul>
                    <li v-for="(sd,idx) in banner_er"  :style='{"background": "url("+sd+") 50% 0px no-repeat"}'>
                  
                    </li>
                </ul>
            </div>
<a class="prev" href="javascript:void(0)"></a>
<a class="next" href="javascript:void(0)"></a>
            <div class="hd">
                <ul></ul>
            </div>
        </div>
    </div>

    
    <div class="wd">
        <p class="fz16 pt20 pm20 dsf_eertxc">
            <i class="dx icon-jingxuan- z6 fz22 cz"></i> 精彩案例
            <a class="fr z9 fz14">更多></a>
        </p>
        <el-row :gutter="20">
            <el-col :span="6" v-for="sd in 8" class="mb20">
                <div class="bgff br yj4">
                    <img src="https://duxinggj-2018-1251133427.cos.ap-guangzhou.myqcloud.com/upload_3fa96b9e84871da3ef5e5a54f2ad6600.jpg" class="w100 dsf_jh_ert">
                   <div class="pd pt10 pm10">
                     <p class="fz16 z3 dian">
                        标题标题标题标题标题标题标题标题题标题
                    </p>
                       <p class="ye mt10">
                    ￥100 <span class="fr ls fz12 mt5">月销量：334</span>
                    </p>
                    </div>
                </div>
            </el-col>
           
        </el-row>
            <p class="qc"></p>
    </div>

    
    <div class="sd_jh_der mt20">
        <div class="wd">
            <p class="cf fz30 cen pt50">
    独行工匠一专业前端开发切图外包
    </p>
            <p class="cf cen mt40">
      专业前端开发！提供PC端、移动端、APP、小程
序前端、HTML5动画特效( canvas、svg)等多种前端切
图服务。手写代码，简洁高效
    </p>
        </div>
    
    </div>
    
    <div class="wd pt20">
        <p class="fz26 cen">核心业务</p>
        <p class="fz14 cen mt10 z9">丰富的开发经验+顶尖开发技术</p>
        
        <el-row :gutter="40">
            <el-col :span="8" v-for="sd in hexind" class="mt30">
                <div class="sd_jh_rtt cen pm30" :class="sd.id">
                    <p class="pt20">
                        <img :src="sd.img">
                    </p>
                    <p class="cf fz16">{{sd.name}}</p>
                </div>
    </el-col>
            <el-col :span="8"></el-col>
        </el-row>
        <p class="qc"></p>
    </div>
    

</div>
</template>
<script>
    export default {
//        async asyncData({
//            app
//        }) {
//            let res = await app.$axios.$get('/new/get_user'),
//                banner_er = ""
//            banner_er = res.data[0].banner.split(",")
//            return {
//                banner_er
//            }
//        },
        data() {
            return {
                hexind: [{
                    name: "ANDROID 开发",
                    id: "aa",
                    img: "	https://duxinggj-2018-1251133427.cos.ap-guangzhou.myqcloud.com/sdf_a.png"
                }, {
                    name: "IOS 开发",
                    id: "ab",
                    img: "	https://duxinggj-2018-1251133427.cos.ap-guangzhou.myqcloud.com/sdf_b.png"
                }, {
                    name: "微信公众号、小程序",
                    id: "ac",
                    img: "	https://duxinggj-2018-1251133427.cos.ap-guangzhou.myqcloud.com/sdf_c.png"
                }, {
                    name: "HTML5开发",
                    id: "ad",
                    img: "	https://duxinggj-2018-1251133427.cos.ap-guangzhou.myqcloud.com/sdf_d.png"
                }, {
                    name: "WEB/WAP开发",
                    id: "ae",
                    img: "	https://duxinggj-2018-1251133427.cos.ap-guangzhou.myqcloud.com/sdf_e.png"
                }, {
                    name: "vue开发",
                    id: "a",
                    img: "	https://duxinggj-2018-1251133427.cos.ap-guangzhou.myqcloud.com/sdf_f.png"
                }]
            }
        },
        mounted() {
            this.$store.state.counter = 1
//            jQuery(".fullSlide").slide({
//                titCell: ".hd ul", //轮播图的点点
//                mainCell: ".bd ul",
//                effect: "fold",
//                autoPlay: true,
//                autoPage: true,
//                trigger: "click", //mouseover
//                interTime: 3000,
//                prevCell: ".sPrev", //上一页
//                nextCell: ".sNext", //下一页
//            });
        },
    }

</script>
<style scoped>
    .sd_dertydc{
        height: 500px
    }
  .dsf_jh_ert {
        height: 300px;
    }

    .sd_jh_der {
        height: 200px;
        background: url("../static/img/chuake_d.jpg") 50% bottom no-repeat;
    }
 
    .sd_jh_rtt {
        min-height: 140px;
        border-radius: 8px;
        background: linear-gradient(to right, #11C8B0, #22D499);
    }

    .sd_jh_rtt.ab {
        background: linear-gradient(to right, #6C6EED, #9B8EFE);
    }

    .sd_jh_rtt.ac {
        background: linear-gradient(to right, #83C612, ##A9CC23);
    }

    .sd_jh_rtt.ad {
        background: linear-gradient(to right, #F85B85, #FA9070);
    }

    .sd_jh_rtt.ae {
        background: linear-gradient(to right, #2B88DF, #3FBBE5);
    }

    .sd_jh_rtt.af {
        background: linear-gradient(to right, #A567D7, #D06CC3);
    }

</style>
<style>
    
    .el-carousel__item .sd_dr_rrtrtx {
        width: 100%;
        height: 100%;
    }

  
</style>
