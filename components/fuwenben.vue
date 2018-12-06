<!--富文本-->
<template>
  <section class="container">
    <div class="quill-editor" 
         :content="content"
         ref="myQuillEditor"
         @change="onEditorChange($event)"
         @blur="onEditorBlur($event)"
         @focus="onEditorFocus($event)"
         @ready="onEditorReady($event)"
         v-quill:myQuillEditor="editorOption">
    </div>
      
      
        <el-upload class="avatar-uploader f_b cz fu_dert"
                   action="/ouyan_api/up_img" 
                   :show-file-list="false" 
                   :on-success="uploadSuccess" >
               
            </el-upload>
      
      
     
      
  </section>
</template>

<script>
    var toolbarOptions = [
        [{
            'size': ['small', false, 'large']
        }],
        ['bold', 'italic'],
        [{
            'list': 'ordered'
        }, {
            'list': 'bullet'
        }],
        ['link', 'image']
    ]
    export default {
        props: {
            content:""
              },
        data() {
            return {
                editorOption: {
                    // some quill options
                    modules: {

                        toolbar: {
                            container: toolbarOptions, // 工具栏
                            handlers: {
                                'image': function(value) {
                                    if (value) {
                                        document.querySelector('.avatar-uploader.fu_dert input').click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        }





                    }
                }
            }
        },
        mounted() {

            //     this.editorOption.insertEmbed(10, 'image', 'https://quilljs.com/images/cloud.png');
        },
        methods: {
            uploadError() {

            },
            uploadSuccess(res, file) {
                console.log(res);
                // res为图片服务器返回的数据
                // 获取富文本组件实例 
                let quill = this.myQuillEditor
                // 如果上传成功
                if (res.code === 0 && res.data !== null) {
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片  res.info为服务器返回的图片地址
                    quill.insertEmbed(length, 'image', res.data)
                    // 调整光标到最后
                    quill.setSelection(length + 1)
                } else {
                    this.$message.error('图片插入失败')
                }
                // loading动画消失
                this.quillUpdateImg = false
            },
            onEditorBlur(editor) {
                console.log('editor blur!', editor)
            },
            onEditorFocus(editor) {
                console.log('editor focus!', editor)
            },
            onEditorReady(editor) {
                console.log('editor ready!', editor)
            },
            onEditorChange({
                editor,
                html,
                text
            }) {
                console.log(html)
                this.$emit("gethtml", html)
                this.content = html
            }
        }
    }

</script>

<style scoped>
    .container {}

    .quill-editor {
        min-height: 200px;
        max-height: 400px;
        overflow-y: auto;
    }

</style>
