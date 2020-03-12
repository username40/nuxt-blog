<template>
  <el-card
    shadow="always"
    :style="{width: '500px'}">
    <h2>Войти в панель администратора</h2>
    <el-form
      @submit.native.prevent="onSubmit"
      :model="controls"
      :rules="rules"
      ref="form">
      <el-form-item label="Ваше имя" prop="login">
        <el-input v-model.trim="controls.login"/>
      </el-form-item>
      <div class="mb2">
      <el-form-item label="Пароль" prop="password">
        <el-input type="password" v-model="controls.password"/>
      </el-form-item>
      </div>
      <el-form-item>
        <el-button
          type="primary"
          native-type="submit"
          :loading="loading"
          round>Войти
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    layout: 'empty',
    data() {
      return {
        loading: false,
        controls: {
          login: '',
          password: ''
        },
        rules: {
          login: [
            {required: true, message: 'Введите логин', trigger: 'blur'}
          ],
          password: [
            {required: true, message: 'Введите пароль', trigger: 'blur'},
            {min: 6, message: 'Пароль должен быть не менее 6 символов', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      onSubmit() {
        this.$refs.form.validate(async valid => {
          if(valid) {
            this.loading = true

            try {
              const formData = {
                login: this.controls.login,
                password: this.controls.password
              }

              await this.$store.dispatch('auth/login', formData)
              this.$router.push('/admin')
              } catch (e) {
              this.loading = false
            }
          }
        })
      }
    },
    mounted() {
      const {message} = this.$route.query

      if(message === 'loginPlease') {
        this.$message.info('Для начала войдите в систему')
      }
    }
  }
</script>

<style scoped>

</style>
