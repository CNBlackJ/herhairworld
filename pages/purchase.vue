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
				</div>
				<div>
					<el-input v-model="orderInfo.couponCode" placeholder="$3 off with coupon code"></el-input>
				</div>
			</el-card>
		</div>

		<div class="purchase-summary">
			<el-row>
				<el-col :span="5" :offset="13">
					total:
				</el-col>
				<el-col :span="5">
					{{summary.total}}
				</el-col>
				<el-col :span="5" :offset="13">
					price:
				</el-col>
				<el-col :span="5" style="color: #dd127b">
					$ {{summary.price.toFixed(2)}}
				</el-col>
				<el-col :span="5" :offset="13">
					shipping:
				</el-col>
				<el-col :span="5" style="color: #dd127b">
					$ {{summary.shipping.toFixed(2)}}
				</el-col>
			</el-row>
		</div>

		<div class="purchase-submit">
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
				products: [],
				summary: {
					total: 0,
					price: 0,
					shipping: 0
				}
			}
		},
		computed: {
			...mapState({
				checkedProducts: state => state.cart.checkedProducts,
				carts: state => state.cart.carts,
				buyNowProduct: state => state.details.buyNowProduct
			})
		},
		async created () {
			const { isBuyNow } = this.$nuxt.$route.query
			await this.listCheckedProds(isBuyNow)
			this.getSummary()
		},
		methods: {
			async listCheckedProds (isBuyNow) {
				if (!isBuyNow) {
					const productIds =  this.checkedProducts
					this.products = this.carts.filter(ele => productIds.indexOf(ele.productId) > -1)
				} else {
					this.products = this.buyNowProduct ? [this.buyNowProduct] : []
				}
			},
			getSummary () {
				if (this.products.length) {
					const counts = this.products.map(ele => ele.count)
					const prices = this.products.map(ele => ele.count * ele.price)
					this.summary.total = counts ? counts.reduce((c, n) => c + n) : 0
					this.summary.price = prices ? prices.reduce((c, n) => c + n) : 0
					this.summary.shipping = 20
				}
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

	.purchase-summary {
		padding: 10px 0;
		border-bottom: 1px solid #efefef;
	}

	.purchase-summary .el-col {
		text-align: right;
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