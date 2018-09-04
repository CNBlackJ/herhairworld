<template>
	<div class="user-container">
	<div class="user-btns">
		<div
			class="user-signin"
			:class="{'user-btn-unselected': !isSignin}"
			@click="signin">
			Sign In</div>
		<div
			class="user-join"
			:class="{'user-btn-unselected': isSignin}"
			@click="signup">
			Join Fress</div>
		</div>

		<div
			class="signin-form"
			v-if="isSignin">
			<div class="email-input-con">
				<i class="el-icon-message"></i>
				<input type="text" class="email-input" placeholder="Enter Your Email">
			</div>
			<div class="password-input-con">
				<i class="el-icon-news"></i>
				<input type="password" class="password-input"  placeholder="Enter Your Password">
			</div>

			<div class="signin-btn-con">
				<div class="signin-btn">
					Sign In
				</div>
			</div>

			<div class="forgot-pw-con">
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
			v-if="!isSignin">
			<div
				class="join-form"
				v-for="joinForm in joinFormGroups" :key="joinForm.id">
				<span class="join-form-label">{{joinForm.label}}</span>
				<input
					:type="joinForm.type"
					class="join-input"
					:placeholder="joinForm.placeholder">
			</div>

			<div class="sign-up-btn">
				<div class="sign-up-text">
					Sign Up
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		layout: 'main',
		data () {
			return {
				isSignin: true,
				joinFormGroups: [
					{ id: 1, label: 'Username', type: 'text', placeholder: 'username' },
					{ id: 2, label: 'Email *', type: 'text', placeholder: 'you@domain.com' },
					{ id: 3, label: 'Password *', type: 'password', placeholder: 'at least 6 characters' },
					{ id: 4, label: 'Confirm *', type: 'password', placeholder: 'conform password' },
					{ id: 5, label: 'Telephone *', type: 'text', placeholder: 'your telephone' }
				]
			}
		},
		created () {
			this.$emit('hideFooter', true)
		},
		methods: {
			signin () {
				this.isSignin = true
			},
			signup () {
				this.isSignin = false
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
		align-items: left;
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
		border: none;
		padding: 10px;
		border-bottom: 1px solid #ddd;
		width: 100%;
	}

	.password-input-con {
		padding: 10px 30px;
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 24px;
	}

	.password-input {
		border: none;
		padding: 10px;
		border-bottom: 1px solid #ddd;
		width: 100%;
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

	.join-input {
		border: 1px solid #efefef;
		padding: 10px;
		font-size: 14px;
		border-radius: 5px;
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