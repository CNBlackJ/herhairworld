<template>
	<div class="purchase-container">
		<div class="purchase-step">
			<el-card shadow="never">
				<el-steps :active="0" align-center>
					<el-step title="Place Order" icon="el-icon-edit"></el-step>
					<el-step title="Pay" icon="el-icon-tickets"></el-step>
					<el-step title="Completed" icon="el-icon-success"></el-step>
				</el-steps>		
			</el-card>	
		</div>

		<div class="purchase-orders">
			<div
				v-for="product in products"
				:key="product.productId">
				<purchaseCard
					:cartProd="product">
				</purchaseCard>
			</div>
		</div>

		<div class="purchase-coupon">
			<el-card shadow="never">
				<div slot="header">
					<span class="purchase-card-title">Coupon Code</span>
					<el-button style="float: right; padding: 3px 0" type="text">
						<i class="el-icon-plus"></i>
						Get Coupon
					</el-button>
				</div>
				<div>
					<el-input v-model="orderInfo.couponCode" placeholder="$3 off with coupon code"></el-input>
				</div>
			</el-card>
		</div>

		<div class="purchase-submit">
			<!-- <div
				@click="createOrder"
				class="purchase-submit-text">
				Submit
			</div> -->
			<no-ssr>
				<paypal-checkout
					env="sandbox"
					amount="10000"
					currency="USD"
					locale="fr_FR"
					payment-completed="showCallback"
					:client="paypal"
					:invoice-number="'201705051001'">
				</paypal-checkout>
			</no-ssr>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'

	import product from '@/apis/product'

	import addressCard from '@/components/addressCard'
	import purchaseCard from '@/components/purchaseCard'

	export default {
		layout: 'mainWithoutFooter',
		components: {
			addressCard,
			purchaseCard
		},
		data () {
			return {
				paypal: {
					sandbox: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
					// sanbox: 'access_token$sandbox$77k65bvyyxs3mcs6$cb80b1fc3d3d4f5ffc7574dc662691c9',
          production: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R'
        },
				orderInfo: {
					payment: '',
					couponCode: ''
				},
				products: []
			}
		},
		computed: {
			...mapState({
				checkedProducts: state => state.cart.checkedProducts,
				carts: state => state.cart.carts
			})
		},
		async created () {
			await this.listCheckedProds()
		},
		methods: {
			async listCheckedProds () {
				const productIds = this.checkedProducts
				this.products = this.carts.filter(ele => productIds.indexOf(ele.productId) > -1)
			},
			createOrder () {
				const payload = this.orderInfo
				console.log(`createOrder: ${JSON.stringify(payload)}`)
			},
			showCallback (c) {
				console.log(c)
			}
		}
	}
</script>

<style>
	.purchase-container {
		padding-top: 48px;
	}

	.purchase-step {
		padding-bottom: 10px;
	}

	.purchase-card-title {
		font-size: 16px;
	}

	.pa-userinfo {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}

	.pa-userinfo-text {
		padding-bottom: 5px;
	}


	.purchase-submit {
		padding: 10px 5px;
		text-align: center;
	}

	.purchase-submit-text {
		background-color: #dd127b;
		color: white;
		text-align: center;
		padding: 10px 0;
		border-radius: 5px;
	}
</style>