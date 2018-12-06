<!--标签管理-->
<template>
<div >
        <div class="bbm pm20">
            标签管理
        </div>
    
    <div class="mt20">
  <el-row>
      <el-col :span="8">
             <el-button type="primary" @click="dialogVisible=true;isbianji=false" >添加标签</el-button>  
    </el-col>
     
  </el-row>
        
        
        
        
        
      <el-table
    class="mt20 dfg_rrrt"
    header-align="center"
   :data="tableData"
    border 
    style="width: 100%">
          
           


<el-table-column prop="name" label="标签名" >
</el-table-column>
          
          <el-table-column prop="add_time" label="添加时间" >
</el-table-column>
          
          
          <el-table-column prop="address" label="操作">
    <template slot-scope="scope">
<el-button type="primary"  size="mini" @click="bianji(scope.row,scope.$index)">编辑</el-button>
 <el-button type="danger"  size="mini" @click="del_gl(scope.row.id,scope.$index)">删除</el-button>      
</template>



</el-table-column>





</el-table>

<div class="cen mt40" v-if="for_dats.total>1">
    <el-pagination background :page-size="for_dats.num" :total="for_dats.count" :page-count="for_dats.count" layout="prev, pager, next" @current-change="sizsdr">
    </el-pagination>
</div>

</div>

<el-dialog title="添加标签" :visible.sync="dialogVisible" width="500px">

    <el-form ref="form" :model="form">
        <el-form-item>
            <el-input v-model="form.name" placeholder="标签名"></el-input>
        </el-form-item>



    </el-form>

    <span slot="footer" class="dialog-footer">
    <el-button @click="sx">取 消</el-button>
    <el-button type="primary" @click="add_gluser">确 定</el-button>
  </span>




</el-dialog>


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
            del_gl(id,idx) {
           

                let th = this
                this.post("del_bq", {
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
                this.post("get_bq", {
                    page: e
                }, function(data) {
                    th.for_dats = data.data
                    th.tableData = data.data.data
                })
            },
            sizsdr(e) {
                this.getDtad(e)
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
    }

</script>
<style scoped>


</style>
