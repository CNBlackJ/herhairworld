<template>
	<div class="navbar-container">
		<div class="navbar-left">
			<img @click="openMenu" class="navbar-icon icon-menu" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/menu.png">
			<img @click="goUser" class="navbar-icon icon-user" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/user.png">
		</div>

		<div class="navbar-logo">
			<img @click="goHome" class="img-logo" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/logo.png">
		</div>

		<div class="navbar-right">
			<img class="navbar-icon icon-search" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/search.png">
			<img class="navbar-icon icon-cart" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/cart.png">
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			openMenu () {
				this.$emit('clickBtn', { btn: 'menu' })
			},
			goUser () {
				this.$router.push({ path: '/login' })
			},
			goHome () {
				this.$router.push({ path: '/' })
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
	}

	.img-logo {
		width: 102px;
		height: 44px;
	}

	.navbar-right {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
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