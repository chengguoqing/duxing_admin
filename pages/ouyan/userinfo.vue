<!--用户管理-->
<template>
<div >
       <div class="bbm pm20">
            用户管理
        </div>
    
    <div class="mt20">

        
         <el-table
    class="mt20 dfg_rrrt"
    header-align="center"
   :data="tableData"
    border 
    style="width: 100%">
          
              <el-table-column
     
      label="头像"
      width="180">
                      <template slot-scope="scope">
   <img :src="scope.row.avatarUrl" class="yj user_imageUrl">       
</template>

</el-table-column>



<el-table-column prop="nickName" label="昵称" width="240">
</el-table-column>
<el-table-column label="性别" width="180">
    <template slot-scope="scope">
{{scope.row.gender==1?'男':'女'}}
</template>

</el-table-column>

<el-table-column prop="sdfff_a" label="收藏数量" width="180">
</el-table-column>
<el-table-column prop="sdfff_b" label="评论数量" width="180">
</el-table-column>
<el-table-column prop="sdfff_c" label="报名活动数量" width="180">
</el-table-column>
<el-table-column label="最后一次登录时间">
    <template slot-scope="scope">
<span v-html="time_d(scope.row.denglutime)"></span>
</template>
</el-table-column>


<el-table-column prop="address" label="操作">
    <template slot-scope="scope">

<!--<el-button type="primary"  size="mini" @click="bianji(scope.row,scope.$index)">编辑</el-button>-->
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
                tableData: [],
            }
        },
        components: {

        },
        methods: {
            del_gl(id, idx) { //删除
                let th = this
                this.post("del_user", {
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
                this.post("get_user", {
                    page: e
                }, function(data) {
                    //                    th.for_dats = data.data
                    th.tableData = data.data.data
                })
            },
        },
        mounted() {
            this.getDtad(1)
        },
    }

</script>
<style scoped>
    .user_imageUrl {
        width: 40px;
        height: 40px;
    }

</style>
