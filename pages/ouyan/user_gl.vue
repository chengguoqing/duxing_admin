<template>
<div >
        <div class="bbm pm20">
            管理员账号
        </div>
    
    <div class="mt20">
        
  <el-row>
      <el-col :span="8">
           <el-input placeholder="请输入内容" v-model="name_se" >
   <el-button slot="append" icon="el-icon-search" @click="ss_gl"></el-button>
  </el-input>
    </el-col>
      <el-col :span="16" class="tr">
    <el-button type="primary" @click="dialogVisible=true;isbianji=false" >添加管理员</el-button>
    </el-col>
  </el-row>


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
   <img :src="scope.row.user_imageUrl" class="yj user_imageUrl">       
</template>

</el-table-column>



<el-table-column prop="user_name" label="账号" width="180">
</el-table-column>

<el-table-column prop="user_nicheng" label="昵称" width="180">
</el-table-column>


<el-table-column prop="user_paw" width="180" label="密码">
</el-table-column>
<el-table-column width="180" label="等级">
    <template slot-scope="scope">
     <span>  {{scope.row.user_dj==0?'超级管理员':'普通管理员'}}</span>          
</template>
</el-table-column>



<el-table-column prop="user_addtime" label="添加时间" width="280">
</el-table-column>
<el-table-column prop="address" label="操作">
    <template slot-scope="scope">
 <el-button type="primary"  v-if="scope.row.user_dj==0" size="mini" @click="xg_gl(1,scope.row.id,scope.$index)">设为普通管理员</el-button>
 <el-button type="primary"  v-if="scope.row.user_dj==1" size="mini"  @click="xg_gl(0,scope.row.id,scope.$index)">设为超级管理员</el-button>
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


<el-dialog title="添加管理员" :visible.sync="dialogVisible" width="500px">

    <el-form ref="form" :model="form">
        <el-form-item>
            <el-upload class="avatar-uploader f_b cz" action="/ouyan_api/up_img" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="form.user_imageUrl" :src="form.user_imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

            <span class="ml10">上传头像</span>



        </el-form-item>


        <el-form-item>
            <el-input v-model="form.user_name" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input v-model="form.user_nicheng" type="text" placeholder="昵称、作者名"></el-input>
        </el-form-item>


        <el-form-item>
            <el-input v-model="form.user_paw" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-select v-model="form.user_dj" placeholder="请选择管理员权限" class="w100">
                <el-option label="超级管理员" value="0"></el-option>
                <el-option label="普通管理员" value="1"></el-option>
            </el-select>
        </el-form-item>

    </el-form>







    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
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
                tableData: [],
                for_dats: "",
                name_se: "",
                isbianji: false, //是否编辑
                bianji_s: 0,
                form: {
                    user_imageUrl: "", //用户头像
                    user_name: "", //用户名
                    user_paw: "", //密码
                    user_dj: "", //等级
                    user_nicheng: "", //昵称
                    user_addtime: "" //添加时间
                }
            }
        },
        components: {

        },
        methods: {
            bianji(sd, idx) { //编辑按钮触发
                this.dialogVisible = true
                this.form = sd
                this.isbianji = true
                this.bianji_s = idx

            },
            handleAvatarSuccess(res, file) {
                this.form.user_imageUrl = res.data
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            add_gluser() { //添加管理员
                this.form.user_addtime = this.time(new Date().getTime())
                let th = this
                if (!this.form.user_name) {
                    this.$message.error('请输入管理员账号！');
                    return
                }
                if (!this.form.user_paw) {
                    this.$message.error('请输入管理员密码！');
                    return
                }
                if (!this.form.user_dj) {
                    this.$message.error('请输入管理员操作权限！');
                    return
                }

                if (this.isbianji) {
                    this.post("xg_gl", this.form, function(data) {
                        th.tableData[th.bianji_s] = th.form
                        th.dialogVisible = false
                        th.$message({
                            message: data.msg,
                            type: 'success'
                        });
                    })
                } else {
                    this.post('add_gl', this.form, function(data) {

                        th.$message({
                            message: data.msg,
                            type: 'success'
                        });
                        th.dialogVisible = false
                        th.tableData.unshift(th.form)


                    })
                }






            },
            ss_gl(name) { //搜索
                let name_se = this.name_se,
                    th = this
                if (!name_se) {
                    th.$message.error("请输入关键词");
                    return
                }
                this.post('ss_gl', {
                    user_name: name_se
                }, function(data) {
                    th.$message({
                        message: data.msg,
                        type: 'success'
                    });
                    th.dialogVisible = false
                    th.tableData = data.data.data
                })
            },
            sizsdr(e) {
                this.getDtad(e)
            },
            getDtad(e) {
                let th = this
                this.post("get_gl", {
                    page: e
                }, function(data) {
                    th.for_dats = data.data
                    th.tableData = data.data.data
                })
            },
            del_gl(id, idx) { //删除
                let th = this
                this.post("del_gl", {
                    id: id
                }, function(data) {
                    th.tableData.splice(idx, 1);
                    th.$message({
                        message: data.msg,
                        type: 'success'
                    });
                })
            },
            xg_gl(ty, id, idx) { //修改
                let th = this
                this.post("xg_gl", {
                    id: id,
                    user_dj: ty
                }, function(data) {
                    th.tableData[idx].user_dj = ty
                    th.$message({
                        message: data.msg,
                        type: 'success'
                    });
                })
            }
        },
        mounted() {
            this.getDtad(1)
        },
    }

</script>
<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 78px;
        height: 78px;
        line-height: 78px;
        text-align: center;
    }

    .avatar {
        width: 78px;
        height: 78px;
        display: block;
    }

    .user_imageUrl {
        width: 40px;
        height: 40px;
    }

</style>
<style scoped>


</style>
