<!--添加文章-->
<template>
<div >
 <div class="sd_jh_deert">
    
        <el-form ref="form" :model="form" label-width="120px">
  <el-form-item label="文章名称">
    <el-input v-model="form.title"></el-input>
  </el-form-item>
              <el-form-item label="作者名">
    <el-input v-model="form.zz_name"></el-input>
  </el-form-item>
            
    <el-form-item label="封面">
         <up_img @up_img="up_img" :img_url="form.fengmian"></up_img> 
  </el-form-item>
            
               <el-form-item label="文章标签">
       <el-select v-model="value5" multiple placeholder="请选择" class="w100">
    <el-option
      v-for="item in biaoqian"
      :key="item.name"
      :value="item.name">
    </el-option>
  </el-select>
                   
                   
                   
  </el-form-item>
            
            
                  <el-form-item label="文章分类" v-if="$route.query.type==0">
       <el-select v-model="value6"  placeholder="请选择" class="w100">
    <el-option
      v-for="item in wenzsasd"
      :key="item.name"
      :value="item.name">
    </el-option>
  </el-select>
                   
                   
                   
  </el-form-item>
             
<el-form-item class="sdf_e4ert" label="详情">
   <div contenteditable="true" class="sd_kj_drttd br" ref="fuwebner"></div>
    
  </el-form-item>   
            
<!--
            <el-form-item class="sdf_e4ert" label="详情">
   <fuwenben @gethtml="gethtml" :content="form.xq_text"></fuwenben>
  </el-form-item>
-->
            
            
            
            <el-form-item>
    <el-button type="primary" @click="tijiao">
        
    {{$route.query.id?'修改文章':'添加文章'}}
    
    </el-button>
    <el-button>取消</el-button>
  </el-form-item>
            
            
            
        </el-form>
    
    </div>
    
    
    
</div>
</template>
<script>
    import fuwenben from "./fuwenben"
    import up_img from "./up_img"
    export default {
        data() {
            return {
                biaoqian: "",
                value5: "",
                value6: "",
                wenzsasd: [{
                    id: 0,
                    name: "热门活动"
                }, {
                    id: 0,
                    name: "TOP夏校"
                }, {
                    id: 0,
                    name: "雅思托福"
                }, {
                    id: 0,
                    name: "HOT名校"
                }],
                form: {
                    fengmian: "", //封面
                    title: "", //标题
                    zz_name: "", //作者名
                    xq_text: "", //详情
                    sdfff_a: 0, //浏览数量
                    sdfff_b: 0, //留言数
                    sdfff_c: 0, //点赞数量
                    add_time: "",
                    biaoqian_text: "", //标签
                    fenlei: "", //分类
                    is_shouye: 0 //1首页推荐 0取消首页推荐
                }
            }
        },
        components: {
            fuwenben,
            up_img
        },
        methods: {
            gethtml(html) {
                console.log(html);
                this.form.xq_text = html
            },
            up_img(data) {
                this.form.fengmian = data
            },
            get_bqian() { //获取标签
                let th = this
                this.post('get_bq', {}, function(data) {
                    th.biaoqian = data.data.data
                })
            },
            tijiao() {
                var sd_ddrrt=this.$refs.fuwebner.innerText
                console.log(sd_ddrrt);
                if (this.$route.query.type == 1) {
                    this.form.userImg_fa = this.$store.state.auth.user_imageUrl
                    this.form.userNmae_fa = this.$store.state.auth.user_nicheng
                }
                if (!this.form.title) {
                    this.$message.error('请输入标题！');
                    return
                }
                if (!this.form.zz_name) {
                    this.$message.error('请输入作者名！');
                    return
                }
                if (!sd_ddrrt ){
                    this.$message.error('请输入详情！');
                    return
                }
                 this.form.xq_text=sd_ddrrt
      
                
                let th = this
                this.form.add_time = new Date().getTime()
                this.form.biaoqian_text = this.value5.join(",")
                this.form.fenlei = this.value6
                this.post(this.$route.query.id ? "xgai_xq" : "add_xq", this.form, function(data) {
                    th.$message({
                        message: data.msg,
                        type: 'success'
                    });
                    th.$router.back(-1)
                })
            },
            getdata() {
                let th = this
                this.post('get_xq', {
                    id: this.$route.query.id
                }, function(data) {
                    th.form = data.data
                    th.$refs.fuwebner.innerText=data.data.xq_text
                    th.value5 = data.data.biaoqian_text.split(",")
                    th.value6 = data.data.fenlei

                })
            }
        },
        mounted() {

            if (this.$route.query.id) {
                this.getdata()
            }
            this.form.type = this.$route.query.type

            this.get_bqian()
        },
    }

</script>
<style>
    .sdf_e4ert .el-form-item__content {
        line-height: 1
    }

</style>
<style scoped>
    .sd_jh_deert {
        width: 750px;
    }
    .sd_kj_drttd{
        height: 300px;
        overflow: auto;
        background: #fff;
        padding: 10px
    }
</style>
