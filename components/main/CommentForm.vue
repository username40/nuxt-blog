<template>
    <div>
      <h1>Добавить комментарий</h1>
      <el-form
        @submit.native.prevent="onSubmit"
        :model="controls"
        :rules="rules"
        ref="form">
        <el-form-item label="Ваше имя" prop="name">
          <el-input v-model="controls.name"/>
        </el-form-item>

        <el-form-item label="Текст комментария" prop="text">
          <el-input
            type="textarea"
            resize="none"
            :rows="2"
            v-model="controls.text"/>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            native-type="submit"
            :loading="loading"
            round>Добавить комментарий</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    export default {
        name: "CommentForm",
      props: {
          postId: {
            type: String,
            required: true
          }
      },
      data() {
          return {
            loading: false,
            controls: {
              name: '',
              text: ''
            },
            rules: {
              name: [
                { required: true, message: 'Имя не должно быть пустым', trigger: 'blur' }
              ],
              text: [
                { required: true, message: 'Введите ваш комментарий', trigger: 'blur' }
              ]
            }
          }
      },
      methods: {
          onSubmit() {
            this.$refs.form.validate(async valid => {
              if (valid) {
                this.loading = true
                const formData = {
                  name: this.controls.name,
                  text: this.controls.text,
                  postId: this.postId
                }
                try {
                    const newComment = await this.$store.dispatch('comment/create', formData)
                    this.$emit('created', newComment)
                    this.$message.success('комментарий добавлен')
                } catch (e) {
                  this.loading = false
                  console.log(e)
                }
              }
            });
          }
      }
    }
</script>

<style scoped>

</style>
