<template>
	<div class="navbar-container">
		<div class="navbar-left">
			<img @click="openMenu" class="navbar-icon icon-menu" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/menu.png">
			<img @click="goUser" class="navbar-icon icon-user" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/user.png">
		</div>

		<div class="navbar-logo">
			<img @click="goPage('/')" class="img-logo" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/logo.png">
		</div>

		<div class="navbar-right">
			<img @click="goPage('/search')" class="navbar-icon icon-search" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/search.png">
			<el-badge :value="cartCount">
				<img @click="goPage('/cart')" class="navbar-icon icon-cart" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/uncart.png">
			</el-badge>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapState } from 'vuex'
	import user from '@/apis/user'
	import LS from '@/apis/localStorage'
	
	export default {
		computed: {
			...mapGetters(['isAuthenticated']),
			...mapState({
				cartCount: state => state.cart.cartList.length,
				user: state => state.user,
				authToken: state => state.authToken
			})
		},
		async created () {
			const authToken = window.localStorage.getItem('authToken')
			if (authToken === 'null' || !authToken) {
				// 创建一个临时访客用户
				await this.$store.dispatch('createVisitor')
				LS.setVal('authToken', this.authToken)
				this.$store.commit('SET_AUTH_TOKEN', authToken)
			} else {
				this.$store.commit('SET_AUTH_TOKEN', authToken)
				// 看token是否能获取到用户信息
				const userInfo = await user.getUser()
				if (userInfo) {
					this.$store.commit('SET_USER', userInfo)
					this.$store.commit('SET_AUTH_TOKEN', authToken)
					await this.$store.dispatch('cart/setCartList')
				} else {
					await this.$store.dispatch('createVisitor')
					LS.setVal('authToken', this.authToken)
				}
			}
			await this.$store.dispatch('home/setCategories')
		},
		async mounted () {
			// const authToken = window.localStorage.getItem('authToken')
			// if (authToken === 'null' || !authToken) {
			// 	// 创建一个临时访客用户
			// 	await this.$store.dispatch('createVisitor')
			// 	LS.setVal('authToken', this.authToken)
			// 	this.$store.commit('SET_AUTH_TOKEN', authToken)
			// } else {
			// 	this.$store.commit('SET_AUTH_TOKEN', authToken)
			// 	// 看token是否能获取到用户信息
			// 	const userInfo = await user.getUser()
			// 	if (userInfo) {
			// 		this.$store.commit('SET_USER', userInfo)
			// 		this.$store.commit('SET_AUTH_TOKEN', authToken)
			// 	} else {
			// 		await this.$store.dispatch('createVisitor')
			// 		LS.setVal('authToken', this.authToken)
			// 	}
			// }
		},
		methods: {
			openMenu () {
				this.$emit('clickBtn', { btn: 'menu' })
			},
			goPage (path) {
				this.$router.push({ path })
			},
			goUser () {
				const path = this.isAuthenticated ? '/user' : '/auth/sign-in'
				this.$router.push({ path })
			}
		}
	}
</script>

<style>
	.navbar-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		background-color: #000;
		position: fixed;
	  top: 0;
		z-index: 5;
	}

	.navbar-left {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
	}

	.navbar-logo {
		width: 100%;
		text-align: center;
	}

	.img-logo {
		height: 34px;
		padding: 3px 0;
	}

	.navbar-right {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.navbar-icon {
		width: 20px;
		height: 20px;
		-webkit-filter: invert(1);
		filter: invert(1);
	}

	.icon-menu {
		padding: 0 10px;
	}

	.icon-user {
		padding: 0 10px;
	}

	.icon-search {
		padding: 0 10px;
	}

	.icon-cart {
		padding: 0 10px;
	}
</style>