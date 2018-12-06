<!--上传图片-->
<template>

  <el-upload class="avatar-uploader f_b cz" action="/ouyan_api/up_img" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="img_url" :src="img_url" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>


</template>
<script>
    export default {
        props: {
            img_url: ""
        },
        data() {
            return {
               
            }
        },
        components: {

        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.img_url = res.data
                this.$emit("up_img", res.data)
                //                this.form.user_imageUrl = res.data
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
        },
        mounted() {

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

</style>
<style scoped>


</style>
