<template>
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
</template>

<script>
    export default {
        name: "user",
      layout: 'admin',
      middleware: ['admin-auth'],
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

                await this.$store.dispatch('auth/createUser', formData)
                this.$message.success('Пользователь создан')
                this.controls.login = ''
                this.controls.password = ''
                this.loading = false
              } catch (e) {
                this.loading = false
              }
            }
          })
        }
      }
    }
</script>

<style scoped>
  /* i used tag form here but you cant find it inside template! I do it because after render
    tag el-form becomes <form>*/
  form {
    width: 600px;
  }
</style>
