<template>
  <section class="container">
		<el-row>
			<el-col :span="24">
				<el-form>
					<el-form-item
						label="Email">
						<el-input type="email" v-model="loginForm.email"></el-input>
					</el-form-item>
					<el-form-item
						label="Password">
						<el-input type="password" v-model="loginForm.password"></el-input>
					</el-form-item>
				</el-form>
				<el-button @click="facebook">Facebook</el-button>
				<el-button @click="google">Google</el-button>
			</el-col>
		</el-row>
  </section>
</template>

<script>

export default {
  data(){
    return {
      loginForm: {
        email:'',
        password:''
      }

    }
  },
  component: {
  },
  watch: {
    $route() {
      this.showLoginModal();
    }
  },
  methods: {
    showLoginModal(){
      if (typeof this.$route.query.login !== 'undefined' && this.$route.query.login === "1") {
        this.$toast.error('Please Login ', {icon: "fingerprint"});
        this.$refs.myModalRef.show()
        this.$router.push('/')
      }
    },
    hideModal () {
      this.$refs.myModalRef.hide()
    },
    async google(){
      await this.$auth.loginWith('google').catch(e => {
        this.$toast.show('Error', {icon: "fingerprint"});
      })
    },
    async facebook(){
       await this.$auth.loginWith('facebook').catch(e => {
        this.$toast.show('Error', {icon: "fingerprint"});
      })
    },
    async login() {
      try {
        this.$nextTick(() => {
          this.$nuxt.$loading.start()
        });
        await this.$auth.loginWith('local', {
          data: {
            "email": this.loginForm.email,
            "password": this.loginForm.password
          }
        })

        if (this.$auth.loggedIn) {
          this.$toast.success('Successfully Logged In', {icon: "done"});
        }
      } catch (e) {
        this.$toast.error('Username or Password wrong', {icon: "error"});
      } finally {
        this.$nuxt.$loading.finish()
      }
    },
    check(){
      console.log(this.$auth.loggedIn)
    },
    logout() {
      this.$toast.show('Logging out...', {icon: "fingerprint"});
      this.$auth.logout()
    },
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.alert_danger {
  color: white;
  font-weight: lighter;
  font-size: 0.8em;
  padding: 3px;
  padding-left: 8px;
  padding-right: 8px;
  vertical-align: center;
  background-color: #18a800;
  border-radius: 10px;
}
</style>
