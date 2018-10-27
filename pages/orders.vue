<template>
	<div class="orders-container">
		<div class="orders-head">
			<div @click="$router.back(-1)">
				<i class="el-icon-arrow-left"></i>
			</div>
			<div>My Orders</div>
			<div></div>
		</div>

		<div class="orders-group">
			<div class="orders-card">
				<div class="oc-header">
					<span>订单编号: 123123</span>
					<span>状态: 已出货</span>
				</div>
				<div class="oc-main">
					<div class="oc-imgs">
						<img src="http://herhairworld.wifihi.cn/880110752d524389909750e86e65aa7f.jpg">
						<img src="http://herhairworld.wifihi.cn/880110752d524389909750e86e65aa7f.jpg">
						<img src="http://herhairworld.wifihi.cn/880110752d524389909750e86e65aa7f.jpg">
					</div>
					<div class="oc-summary">
						<span>共4件商品</span>
						<span>总金额 $300</span>
					</div>
				</div>
				<div class="oc-bottom">
					<span class="oc-bt">
						订单详情
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		layout: 'mainWithoutFooter',
		created () {
			this.$store.dispatch('orders/getOrders')
		}
	}
</script>

<style>
	.orders-container {
		padding-top: 48px;
	}

	.orders-head {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 10px 0;
		background-color: white;
	}

	.orders-group {
		background-color: #efefef;
		padding: 10px 0;
		font-size: 14px;
	}

	.orders-card {
		background-color: white;
		padding:10px;
	}

	.oc-header {
		padding-bottom: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #eeeeee;
	}

	.oc-main {
		padding: 10px 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #eeeeee;
	}

	.oc-imgs {

	}

	.oc-imgs img {
		width: 68px;
		height: 68px;
		margin-right: 10px;
	}

	.oc-summary {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	.oc-bottom {
		text-align: right;
		padding: 10px 5px 0 0;
	}

	.oc-bt {
		border: 1px solid #cccccc;
		padding: 5px;
		border-radius: 8px;
	}
</style>