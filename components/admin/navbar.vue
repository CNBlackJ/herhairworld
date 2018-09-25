<template>
	<div class="admin-nav-con">
		<div class="ad-nav-left">
			
		</div>
		<div class="ad-nav-right">
			<img
				@click="goLogin"
				class="navbar-icon icon-user"
				src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/user.png">
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			goLogin () {
				if (this.$store.getters['admin/isAuthenticated']) return
				this.$router.push({ path: '/admin/login' })
			}
		}
	}
</script>

<style>
	.admin-nav-con {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background-color: #409eff;
	}

	.navbar-icon {
		width: 24px;
		height: 24px;;
		-webkit-filter: invert(1);
		filter: invert(1);
		padding: 10px;
	}
</style>