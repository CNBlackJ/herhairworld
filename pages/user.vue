<template>
	<div class="user-container">
		<div class="user-header">
			<div class="user-avatar-con">
				<img class="user-avatar" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/user.png">
			</div>
			<div class="user-name">
				123@gmail.com
			</div>
		</div>

		<div class="user-middle">
			<div class="user-middle-left">
				<div class="user-middle-img">
					<img class="middle-img" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/cart.png">
				</div>
				<div class="user-middle-content">
					<div class="user-middle-count">
						0
					</div>
					<div class="user-middle-text">
						Shoopping Cart
					</div>
				</div>
			</div>

			<div class="user-middle-right">
				<div class="user-middle-img" style="background-color: #36c3a5">
					<img class="middle-img" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/padnote.png">
				</div>
				<div class="user-middle-content">
					<div class="user-middle-count">
						0
					</div>
					<div class="user-middle-text">
						All Orders
					</div>
				</div>
			</div>
		</div>

		<div class="user-bottom">
			<div class="user-menu-group">
				<div
					class="user-menu-item"
					v-for="menu in menuGroups"
					:key="menu.id"
					@click="menuClick(menu.href)">
					<div class="user-menu-icon">
						<img class="user-menu-img" :src="'https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/' + menu.icon">
					</div>
					<div class="user-menu-href">
						<div class="user-menu-text">
							{{menu.text}}
						</div>
						<div class="user-menu-right">
							<i class="el-icon-arrow-right"></i>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="user-btn-group">
			<div
				@click="signOut"
				class="user-signout">
				<div class="signout-text">
					Sign Out
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import LS from '@/apis/localStorage'

	export default {
		layout: 'main',
		data () {
			return {
				user: '',
				menuGroups: [
					{ id: 1, icon: 'padnote.png', text: 'my order', href: '/orders' },
					{ id: 2, icon: 'favorites.png', text: 'my favorites', href: '/favorites' },
					{ id: 3, icon: 'address.png', text: 'my address book', href: '/address' },
					{ id: 4, icon: 'settings.png', text: 'account setting', href: '/account' },
					{ id: 5, icon: 'password.png', text: 'password', href: '/password' },
				]
			}
		},
		methods: {
			menuClick (path) {
				console.log(path)
			},
			signOut () {
				console.log('signOut')
				LS.removeLocalStorage('auth_token')
				this.$store.dispatch('setLoginUser', { loginUser: {} })
				this.$router.push({ path: '/login' })
			}
		}
	}
</script>

<style>
	.user-container {
		padding-top: 45px;
	}

	.user-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 30px 0 10px 0;
		background-color: #e73e6e;
	}

	.user-avatar {
		width: 36px;
		height: 36px;
	}

	.user-avatar-con {
		background-color: #efefef;
		border-radius: 50%;
		padding: 10px;
		width: 36px;
		height: 36px;
	}

	.user-name {
		color: white;
		font-size: 14px;
	}

	.user-middle {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 20px 10px;
		justify-content: flex-start;
	}

	.user-middle-left {
		display: flex;
		flex-direction: row;
		align-items: center;
		border-right: 1px solid #ddd;
		width: 50%;
	}

	.user-middle-right {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 50%;
		padding-left: 10px;
	}
	
	.user-middle-img {
		width: 32px;
		height: 32px;
		padding: 5px;
		background-color: #ea473c;
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.middle-img {
		width: 24px;
		height: 24px;
		padding: 5px;
		-webkit-filter: invert(1);
		filter: invert(1);
	}

	.user-middle-content {
		display: flex;
		flex-direction: column;
		align-items: left;
		padding-left: 20px;
	}

	.user-middle-count {
		font-size: 24px;
		color: #575757;
	}

	.user-middle-text {
		color: #808080;
		font-size: 8px;
	}

	.user-bootom {
		width: 100%;
	}

	.user-menu-group {
		padding: 15px 25px;
		display: flex;
		flex-direction: column;
	}

	.user-menu-item {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.user-menu-icon {
		padding-right: 15px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.user-menu-img {
		width: 24px;
		height: 24px;
	}

	.user-menu-href {
		color: #535353;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #ececec;
		padding: 10px 0;
	}

	.user-menu-text {
		font-size: 16px;
		text-transform: capitalize;
	}

	.user-btn-group {
		padding: 15px 0;
	}

	.user-signout {
		padding: 0 15px;
	}

	.signout-text {
		padding: 10px 0;
		text-align: center;
		color: #e73e6e;
		border: 1px solid #e73e6e;
		border-radius: 5px;
	}
</style>