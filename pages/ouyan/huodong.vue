<!--活动-->
<template>
<div >
    
         <div class="bbm pm20">
            
             <span v-if="$route.query.type==0">活动管理</span>
               <span v-if="$route.query.type==1">社区管理</span>
        </div>
    
    <div class="mt20">
  <el-row>
      <el-col :span="8">
             <el-button type="primary"  @click="hf('./fabu?type='+$route.query.type)">发布文章</el-button>  
    </el-col>
     
  </el-row>
        
        
            <el-table
    class="mt20 dfg_rrrt"
    header-align="center"
   :data="tableData"
    border 
    style="width: 100%">
 <el-table-column prop="title" label="活动名称" >
</el-table-column>
<el-table-column prop="zz_name" label="作者名" width="200">
</el-table-column>
                       <el-table-column prop="sdfff_a" label="浏览数量" width="100">
</el-table-column>
                       <el-table-column prop="sdfff_b" label="留言数" width="100">
</el-table-column>
                   <el-table-column prop="sdfff_c" label="点赞数量" width="100">
</el-table-column>   
                
                      <el-table-column prop="biaoqian_text" label="标签" >
</el-table-column>    
                
                           <el-table-column  label="添加时间" >
                                   <template slot-scope="scope">
                              <span v-html="time_d(scope.row.add_time)"></span>
</template>
</el-table-column>


<el-table-column prop="address" label="操作">
    <template slot-scope="scope">
<el-button type="primary"  size="mini" @click="tuijian(1,scope.row)" v-if="scope.row.is_shouye==0">首页推荐</el-button>
<el-button type="primary"  size="mini" @click="tuijian(0,scope.row)" v-if="scope.row.is_shouye==1">取消推荐</el-button>
<el-button type="primary"  size="mini" @click="hf('./fabu?id='+scope.row.id)">编辑</el-button>
 <el-button type="danger"  size="mini" @click="del_gl(scope.row.id,scope.$index)">删除</el-button>      
</template>



</el-table-column>




</el-table>



</div>




</div>
</template>
<script>
    export default {
          middleware: 'authenticated',
        data() {
            return {
                dialogVisible: false,
                form: {
                    name: "",
                    add_time: ""
                },
                isbianji: false,
                for_dats: "",
                type:"",
                tableData: []
            }
        },
        components: {

        },
        methods: {
            bianji(sd, idx) {
                this.dialogVisible = true
                this.form = sd
                this.isbianji = true
                this.bianji_s = idx
            },
            del_gl(id, idx) {


                let th = this
                this.post("del_xq", {
                    id: id
                }, function(data) {
                    th.tableData.splice(idx, 1);
                    th.$message({
                        message: data.msg,
                        type: 'success'
                    });
                })



            },
            getDtad(e) {
                let th = this
                this.post("get_xqlist", {
                    page: e,
                    type:this.$route.query.type
                }, function(data) {
                    th.for_dats = data.data
                    th.tableData = data.data.data
                })
            },
            sizsdr(e) {
                this.getDtad(e)
            },
            tuijian(ty, sd) {
                let sd_kje = {}
                sd_kje.is_shouye = ty
                sd_kje.id = sd.id
                sd.is_shouye = ty
                this.post("xgai_xq", sd_kje, function(data) {
                    this.$message({
                        message: '修改成功！',
                        type: 'success'
                    });
                })


            },
            add_gluser() {
                this.form.add_time = this.time(new Date().getTime())

                if (!this.form.name) {
                    this.$message({
                        message: '请输入标签名称',
                        type: 'error'
                    });
                    return
                }
                let th = this

                this.post(this.isbianji ? 'xg_bq' : 'add_bq', this.form, function(data) {
                    th.$message({
                        message: data.msg,
                        type: 'success'
                    });
                    th.dialogVisible = false
                    location.reload();
                })

            }
        },
        mounted() {
            this.getDtad(1)
        },

        watch: {
            $route() {
               this.getDtad(1)
            }

        }
        
    }

</script>
<style scoped>


</style>
