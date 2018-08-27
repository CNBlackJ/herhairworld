<template>
	<div class="sidebar-container">
		<div class="admin-logo">
			<img class="admin-logo-img" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/logo.png">
		</div>
		<div class="btn-group">
			<div class="sidebar-btn">
				<i class="sidebar-icon el-icon-setting"></i>
				<router-link to="/admin">
          控制面板
        </router-link>
			</div>
			<div class="sidebar-btn">
				<i class="sidebar-icon el-icon-edit"></i>
				<router-link to="/admin/page">
					页面编辑
				</router-link>
			</div>
			<div class="sidebar-btn">
				<i class="sidebar-icon el-icon-tickets"></i>
				<router-link to="/admin/order">
					订单管理
				</router-link>
			</div>
			<div class="sidebar-btn">
				<i class="sidebar-icon el-icon-goods"></i>
				<router-link to="/admin/product">
					产品列表
				</router-link>
			</div>
			<div class="sidebar-btn">
				<i class="sidebar-icon el-icon-circle-plus-outline"></i>
				<router-link to="/admin/user">
					用户信息
				</router-link>
			</div>
			<div class="sidebar-btn">
				<i class="sidebar-icon el-icon-success"></i>
				<router-link to="/admin/payment">
					支付信息
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			sidebarHover () {
				console.log('aa')
			}
		}
	}
</script>

<style>
	.sidebar-container {
		border-right: 1px solid #efefef;
		background-color: #001529;
		color: white;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10px 0;
	}

	.admi-logo {
		background-color: #1890ff;
	}

	.admin-logo-img {
		width: 100%;
	}

	.sidebar-btn {
		padding: 10px;
		width: 100%;
	}

	.sidebar-btn:hover {
		background-color: white;
		color: black;
		width: 100%;
	}

	.sidebar-icon {
		padding: 0 20px;
	}

	.btn-group {
		font-size: 14px;
		width: 100%;
	}
</style>