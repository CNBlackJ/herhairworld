<template>
	<div class="orders-container">
		<div class="orders-head">
			<div @click="$router.push({ path: '/list' })">
				<i class="el-icon-arrow-left"></i>
			</div>
			<div>My Orders</div>
			<div></div>
		</div>

		<div class="orders-group">
			<div
				v-for="order in orders"
				:key="order._id"
				class="orders-card">
				<div class="oc-header">
					<span>Order Id: &nbsp;&nbsp;{{order._id}}</span>
					<!-- <span>状态: {{ order.status }}</span> -->
				</div>
				<div class="oc-main">
					<div class="oc-imgs">
						<img
							v-for="(img, i) in orderImgs(order._id)"
							:key="i"
							:src="img">
					</div>
					<div class="oc-summary">
						<span>Total: {{order.total}}</span>
						<span>Amount: ${{order.price}}</span>
					</div>
				</div>
				<!-- <div class="oc-bottom">
					<span class="oc-bt">
						Details
					</span>
				</div> -->
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex'

	export default {
		layout: 'mainWithoutFooter',
		computed: {
			...mapState({
				orders: state => state.orders.orders
			}),
			...mapGetters({
				orderImgs: 'orders/orderImgs'
			})
		},
		created () {
			this.$store.dispatch('orders/getOrders')
		}
	}
</script>

<style>
	.orders-container {
		padding-top: 44px;
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
		margin-bottom: 10px;
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
		border: 1px solid #eeeeee;
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