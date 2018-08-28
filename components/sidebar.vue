<template>
	<div class="sidebar-container">
		<div class="fe-sidebar-left">
			<div class="sidebar-head">
				<div class="menu-icon">
					<img class="navbar-icon" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/menu.png">
				</div>
				<div class="menu-text">
					Menu
				</div>
				<div class="menu-close" @click="closeSidebar">
					<i class="el-icon-close"></i>
				</div>
			</div>
			<div class="sidebar-group">
				<div class="sidebar-menu">
					<i class="el-icon-setting"></i>
					<router-link to="/admin">
						控制面板
					</router-link>
				</div>
				<div class="sidebar-menu">
					<i class="el-icon-setting"></i>
					<router-link to="/admin">
						控制面板
					</router-link>
				</div>
				<div class="sidebar-menu">
					<i class="el-icon-setting"></i>
					<router-link to="/admin">
						控制面板
					</router-link>
				</div>
			</div>
		</div>
		<div class="fe-sidebar-right">

		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			closeSidebar () {
				this.$emit('closeSidebar')
			}
		}
	}
</script>

<style>
	.sidebar-container {
		z-index: 5;
		position: fixed;
		top: 0;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		font-size: 15px;
	}

	.fe-sidebar-left {
		text-align: center;
		width: 70%;
		height: 100%;
		background-color: black;
		color: white;
	}

	.fe-sidebar-right {
		background-color: #efefef;
		opacity: .5;
		height: 100%;
		width: 100%;
	}

	.sidebar-head {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 10px;
	}

	.menu-text {
		text-transform: uppercase;
	}
</style>