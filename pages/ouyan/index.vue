<template>
<div class="dsf_frtyyc">
    
    <el-tabs   v-model="activeName">
  <el-tab-pane label="轮播图" name="ssdd_a">
        <el-row class="mt20">
      <el-col :span="8">

    <el-button type="primary" @click="dialogVisible=true;isbianji=false;isbianji=false" >添加轮播图</el-button>

    </el-col>
    
  </el-row>
      
    
            <el-table
    class="mt20 dfg_rrrt"
    header-align="center"
   :data="tableData"
    border 
    style="width: 100%">
          
    <el-table-column
      label="轮播图"
     >
                      
  <template slot-scope="scope">
   <img :src="scope.row.img_url" class="banner_imageUrl">       
</template>
</el-table-column>

<el-table-column prop="url_href" label="链接地址">

</el-table-column>

<el-table-column prop="add_time" label="添加时间">

</el-table-column>

<el-table-column label="操作">
    <template slot-scope="scope">
 <el-button type="primary"  size="mini" @click="bianji(scope.row,scope.$index)" >编辑</el-button>    
 <el-button type="danger"  size="mini" @click="del_gl(scope.row.id,scope.$index)">删除</el-button>   
</template>

</el-table-column>

</el-table>



</el-tab-pane>
<el-tab-pane label="文章管理" name="ssdd_b">

<!--   <add_wenzz></add_wenzz>-->
  <wenzamtab></wenzamtab>

</el-tab-pane>
</el-tabs>





<el-dialog title="添加轮播图" :visible.sync="dialogVisible" width="500px">

    <el-form ref="form" :model="form">



        <el-form-item>
            <up_img @up_img="up_img" :img_url="form.img_url"></up_img> <span class="ml10">轮播图地址</span>
        </el-form-item>
        <el-form-item>
            <el-input v-model="form.url_href" type="text" placeholder="url地址"></el-input>
        </el-form-item>




    </el-form>

    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="add_banner">确 定</el-button>
  </span>
</el-dialog>




</div>
</template>
<script>
    import up_img from "../../components/up_img"
    import add_wenzz from "../../components/add_wenzz"
    import wenzamtab from "../../components/wenzamtab"
    export default {
  middleware: 'authenticated',
        data() {
            return {
                activeName:"ssdd_a",
                dialogVisible: false,
                isbianji: false, //是否编辑
                bianji_s: 0,
                tableData: [],
                form: {
                    img_url: "",
                    url_href: "",
                    add_time: ""
                }
            };
        },
        components: {
            up_img,
            add_wenzz,
            wenzamtab
        },
        methods: {
            up_img(data) {
                this.form.img_url = data
            },
            add_banner() { //添加轮播图
                let th = this
                this.form.add_time = this.time(new Date().getTime())
                if (!this.form.img_url) {
                    this.$message.error('请上传图片地址！');
                    return
                }
                if (!this.form.url_href) {
                    this.$message.error('请输入链接地址！');
                    return
                }
                if (!this.isbianji) {
                    this.post("add_banner", this.form, function(data) {
                        th.$message({
                            message: data.msg,
                            type: 'success'
                        }); 
                         th.tableData.unshift(th.form)
                        th.dialogVisible = false
                    })
                } else {
                    this.post("xg_banner", this.form, function(data) {
                        th.$message({
                            message: data.msg,
                            type: 'success'
                        });
                        th.dialogVisible = false
                    })
                }

            },
            bianji(sd, inx) { //编辑
                console.log(sd);
                this.isbianji = true
                this.dialogVisible = true
                this.form = sd
            },
            getdata() {
                let th = this
                this.post("get_banner", {}, function(data) {
                    th.tableData = data.data.data
                })
            },
            del_gl(id, idx) { //删除
                let th = this
                this.post("sc_banner", {
                    id: id
                }, function(data) {
                    th.tableData.splice(idx, 1);
                    th.$message({
                        message: data.msg,
                        type: 'success'
                    });
                })
            },
        },
        mounted() {
            this.getdata()
        },
    }

</script>
<style>
    .dsf_frtyyc .el-tabs__item {
        font-size: 18px
    }

</style>
<style scoped>
    .dsf_kjjh_er {
        width: 640px;
    }

    .sd_jh_rt {
        min-height: 300px
    }

    .banner_imageUrl {
        width: 375px;
        height: 150px
    }

</style>
