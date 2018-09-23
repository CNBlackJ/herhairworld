<template>
	<div class="admin-login-container">
		<el-row>
			<el-col :span="6" :offset="8">
				<el-form :rules="adminLoginFormRules" ref="adminLoginForm">
					<el-form-item label="用户名" prop="username">
						<el-input
							v-model="adminLoginForm.username"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input
							@keyup.enter.native="adminLogin"
							type="password"
							v-model="adminLoginForm.password"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="adminLogin">登陆</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		data () {
			return {
				adminLoginForm: {
					username: '',
					password: ''
				},
				adminLoginFormRules:{
					username: [
						{ required: true, message: '请输入用户名', trigger: 'blur' },
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					]
				}
			}
		},
		computed: {
			...mapGetters(['admin/isAuthenticated'])
		},
		methods: {
			adminLogin () {
				const { username, password } = this.adminLoginForm
				this.$store.dispatch('admin/login', this.adminLoginForm)
				if (this.$store.getters['admin/isAuthenticated']) {
					this.$router.push('/admin')
				} else {
					alert('用户名或密码错误')
				}
			}
		}
	}
</script>

<style>
	.admin-login-container {
		position: absolute;
		width: 100%;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		-ms-transform: translate(-50%, -50%);
		-o-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}
	
	body {
		background-color: #909399;
	}
</style>