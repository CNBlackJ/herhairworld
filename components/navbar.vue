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

	import { setToken, getAuthTokenFromCookie, getAuthTokenFromLocalStorage } from '~/utils/auth'
	
	export default {
		computed: {
			...mapGetters(['isAuthenticated']),
			...mapState({
				cartCount: state => {
					if (state.isAuthenticated) return state.cart.cartList.length
					return state.cart.localCartList.length
				},
				user: state => state.user,
				authToken: state => state.authToken
			})
		},
		created () {
			this.$store.dispatch('home/setCategories')
			this.$store.dispatch('cart/setLocalCartList')
		},
		async mounted () {
			const authToken = getAuthTokenFromLocalStorage()
			if (authToken === 'null' || !authToken) {
				// 创建一个临时访客用户
				await this.$store.dispatch('createVisitor')
				setToken({ token: this.authToken })
				this.$store.commit('SET_AUTH_TOKEN', this.authToken)
			} else {
				this.$store.commit('SET_AUTH_TOKEN', this.authToken)
				// 看token是否能获取到用户信息
				const userInfo = await user.getUser()
				if (userInfo) {
					this.$store.commit('SET_USER', userInfo)
					setToken({ token: authToken })
					this.$store.commit('SET_AUTH_TOKEN', authToken)
				} else {
					await this.$store.dispatch('createVisitor')
					setToken({ token: this.authToken })
					this.$store.commit('SET_AUTH_TOKEN', this.authToken)
				}
			}
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
		height: 44px;
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