<template>
	<div class="user-container">
		<div class="user-btns">
			<div
				class="user-signin"
				:class="{'user-btn-unselected': !isSigninTab}"
				@click="signinTab">
				Sign In
			</div>
			<div
				class="user-join"
				:class="{'user-btn-unselected': isSigninTab}"
				@click="signupTab">
				Join Fress</div>
			</div>

			<div
				class="signin-form"
				v-if="isSigninTab">

				<el-form
					ref="loginForm"
					size="small"
					:model="loginForm">
					<el-form-item>
						<div class="email-input-con">
							<i class="el-icon-message"></i>
							<el-input
								class="email-input"
								type="email"
								v-model="loginForm.email"
								placeholder="Enter Your Email">
							</el-input>
						</div>
					</el-form-item>

					<el-form-item>
						<div class="password-input-con">
							<i class="el-icon-news"></i>
							<el-input
								class="password-input"
								type="password"
								v-model="loginForm.password"
								placeholder="Enter Your Password">
							</el-input>
						</div>
					</el-form-item>
				</el-form>

				<div
					class="signin-btn-con"
					@click="login">
					<div class="signin-btn">
						Sign In
					</div>
				</div>

				<div
					class="forgot-pw-con"
					@click="forgotPassword">
					<div class="forgot-btn">
						Forgot your password?
					</div>
				</div>

				<div class="others-login-con">
					<div class="others-login-desc">
						Or Join with
					</div>
					<div class="fb-login">
						<img class="fb-login-img" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/facebook.png">
					</div>
				</div>
			</div>

			<div
				class="join-form-group"
				v-if="!isSigninTab">
				<el-form
					:model="userInfo"
					:rules="joinFormRules"
					ref="userInfo"
					size="small">
					<el-form-item
						v-for="joinForm in joinFormGroups"
						:key="joinForm.id"
						:prop="joinForm.tag">
						<span class="join-form-label">{{joinForm.label}}</span>
						<el-input
							:type="joinForm.type"
							v-model="userInfo[joinForm.tag]"
							:placeholder="joinForm.placeholder">
						</el-input>
					</el-form-item>
				</el-form>

				<div
					class="sign-up-btn"
					@click="join('userInfo')">
					<div class="sign-up-text">
						Sign Up
					</div>
				</div>
			</div>
		</div>
</template>

<script>
	import user from '@/apis/user'

	export default {
		layout: 'mainWithoutFooter',
		data () {
      var validatePass = (rule, value, callback) => {
					if (value !== this.userInfo.password) {
							callback(new Error('Please check your password'));
					} else {
							callback();
					}
			};
			return {
				isSigninTab: true,
				userInfo: {
					username: '',
					email: '',
					password: '',
					pwConfirm: '',
					mobile: ''
				},
				loginForm: {
					email: '',
					password: ''
				},
				joinFormGroups: [
					{ id: 1, label: 'Username *', type: 'text', placeholder: 'username', tag: 'username' },
					{ id: 2, label: 'Email *', type: 'text', placeholder: 'you@domain.com', tag: 'email' },
					{ id: 3, label: 'Password *', type: 'password', placeholder: 'at least 6 characters', tag: 'password' },
					{ id: 4, label: 'Confirm *', type: 'password', placeholder: 'conform password', tag: 'pwConfirm' },
					{ id: 5, label: 'Telephone *', type: 'text', placeholder: 'your telephone', tag: 'mobile' }
				],
				joinFormRules: {
					username: [
            { required: true, message: 'Please enter your username', trigger: 'blur' }
					],
					email: [
						{ required: true, message: 'Please enter your email', trigger: 'blur' },
						{ type: 'email', message: 'Please check your email format', trigger: ['blur', 'change'] }
					],
					password: [
							{ required: true, message: 'Please enter your password', trigger: 'blur' },
							{ min: 6, max: 16, message: 'at least 6 characters', trigger: 'change' },
							{ min: 6, max: 16, message: 'max length 16 characters', trigger: 'change' }
					],
					pwConfirm: [
							{ required: true, message: 'Please confirm your password', trigger: 'blur' },
							{ validator: validatePass, trigger: 'change' }
					],
					mobile: [
						{ required: true, message: 'Please enter your mobile', trigger: 'blur' }
					]
				}
			}
		},
		methods: {
			signinTab () {
				this.isSigninTab = true
			},
			signupTab () {
				this.isSigninTab = false
			},
			join (submitForm) {
				this.$refs[submitForm].validate((valid) => {
					if (valid) {
						user.create({ user: this.userInfo })
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			login () {
				user.login(this.loginForm).then((resp) => {
					if (resp.code === 200) {
						this.$store.dispatch('setLoginUser', { loginUser: resp.data })
						this.$store.dispatch('setIslogin')
						this.$router.push({ path: '/user' })
					} else {
						alert(resp.error_msg)
					}
				}).catch(err => alert(err))
			},
			forgotPassword () {
				this.$router.push({ path: '/forgot' })
			}
		}
	}
</script>

<style>
	.user-container {
		padding-top: 50px;
		width: 100%;
	}

	.user-login {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}

	.user-btns {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		color: #646464;
		padding: 10px 0px;
		font-size: 18px;
	}

	.user-signin {
		border: 1px solid #e0e0e0;
		border-right: none;
		padding: 8px 50px;
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
	}

	.user-join {
		border: 1px solid #e0e0e0;
		padding: 8px 50px;
		border-left: none;
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
	}

	.user-btn-unselected {
		background-color: #f0f0f0;
		color: #bbb;
	}

	.signin-form {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 10px 0;
	}

	.email-input-con {
		padding: 10px 30px;
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 24px;
	}

	.email-input {
		padding: 10px;
		border-bottom: 1px solid #ddd;
		width: 100%;
	}

	.email-input input {
		border: none;
	}

	.password-input-con {
		padding: 10px 30px;
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 24px;
	}

	.password-input {
		padding: 10px;
		border-bottom: 1px solid #ddd;
		width: 100%;
	}

	.password-input input {
		border: none;
	}

	.signin-btn-con {
		padding: 10px 30px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.signin-btn {
		padding: 8px 0;
		border-radius: 5px;
		font-size: 18px;
		color: white;
		background-color: #e73e6e;
		width: 100%;
		text-align: center;
	}

	.forgot-pw-con {
		padding: 5px 30px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.forgot-btn {
		width: 100%;
		text-align: center;
		font-size: 14px;
		color: #a4a4a4;
	}

	.others-login-con {
		padding: 40px 30px;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 12px;
	}

	.others-login-desc {
		text-align: center;
		width: 100%;
		color: #c1c1c1;
	}

	.fb-login-img {
		width: 42px;
		height: 42px;
	}

	.fb-login {
		padding: 10px 0;
	}

	.join-form-group {
		display: flex;
		flex-direction: column;
		padding: 10px 20px 5px 20px;
	}

	.join-form-label {
		padding: 5px 0;
	}

	.join-form {
		display: flex;
		flex-direction: column;
	}

	.sign-up-btn {
		padding: 20px 0;
	}

	.sign-up-text {
		padding: 10px 0;
		text-align: center;
		background-color: #e73e6e;
		color: white;
		border-radius: 5px;
	}

</style>