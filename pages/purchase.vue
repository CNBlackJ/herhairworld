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
				v-for="cartProd in cartList.filter(item => item.isChecked)"
				:key="cartProd._id">
				<purchaseCard
					:cartProd="cartProd">
				</purchaseCard>
			</div>
		</div>

		<div class="purchase-coupon">
			<el-card shadow="never">
				<div slot="header">
					<span class="purchase-card-title">Coupon Code</span>
				</div>
				<el-row>
					<el-popover
						placement="top-end"
						width="200"
						content="check your coupon code."
						v-model="showErrMsg"
						trigger="manual">
						<el-input
							slot="reference"
							v-model="couponCode"
							placeholder="$3 off with coupon code"
							:disabled="isDisable"
							clearable>
							<el-button
								@click="verifyCouponCode"
								slot="append"
								:icon="isCheckedCode ? 'el-icon-success' : 'el-icon-question'">
								{{isCheckedCode ? 'VERIFY' : 'check'}}
							</el-button>
						</el-input>
					</el-popover>
				</el-row>
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
					$ {{summary.price}}
				</el-col>
				<el-col :span="5" :offset="13">
					shipping:
				</el-col>
				<el-col :span="5" style="color: #dd127b">
					$ {{summary.shipping}}
				</el-col>
			</el-row>
		</div>

		<div
			v-if="summary.total > 0"
			class="purchase-submit">
			<no-ssr>
				<paypal-checkout
					env="sandbox"
					:amount="summary.amount.toFixed(2)"
					currency="USD"
					locale="en_US"
					v-on:payment-authorized="payAuth"
					v-on:payment-completed="paySuccess"
					v-on:payment-cancelled="cancelPayment"
					:client="paypalConfig"
					:items="items"
					:invoice-number="String(Date.now())"
					:button-style="paypal_button_style">
				</paypal-checkout>
			</no-ssr>
		</div>
		<div
			v-else
			class="go-shop">
			<span class="go-shop-btn">
				<nuxt-link to="/list">
					Go to shopping
				</nuxt-link>
			</span>
		</div>
	</div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex'

	import product from '@/apis/product'
	import coupon from '@/apis/coupon'

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
				couponCode: '',
				isCheckedCode: false,
				isDisable: false,
				showErrMsg: false,
				paypal_button_style: {
					label: 'pay',
					size: 'medium',
					shape: 'pill'
				},
			}
		},
		computed: {
			...mapState({
				buyNowProduct: state => state.details.buyNowProduct,
				paypalConfig: state => state.purchase.paypalConfig,
				cartList: state => state.cart.cartList,
			}),
			...mapGetters({
				items: 'cart/items',
				summary: 'cart/summary'
			})
		},
		async created () {
			await this.$store.dispatch('purchase/setPaypalConfig')
		},
		methods: {
			async paySuccess (payResp) {
				if (payResp.state === 'approved') {
					const order = {
						carts: this.cartList.filter(item => item.isChecked).map(cart => cart._id),
						couponCode: this.couponCode,
						price: this.summary.price,
						total: this.summary.total,
						paymentInfo: JSON.stringify(payResp)
					}
					const orderRes = await this.$store.dispatch('orders/createOrder', order)
					if (orderRes.carts.length) {
						// 删除购物车中的对应商品
						for (let cartId of orderRes.carts) {
							this.$store.dispatch('cart/deleteCart', { cartInfo: { _id: cartId } })
						}
					}
					this.$router.push({ path: '/orders' })
				} else {
					console.log(payResp)
				}
			},
			payAuth () {
				console.log('pay auth')
			},
			cancelPayment () {
				console.log('cancel payment')
			},
			async verifyCouponCode () {
				const code = this.couponCode
				if (code) {
					const resp = await coupon.list({ code })
					if (resp && resp.length && (resp[0].code === code)) {
						// verified
						this.isCheckedCode = true
						this.isDisable = true
						this.showErrMsg = false
					} else {
						this.isCheckedCode = false
						this.isDisable = false
						this.showErrMsg = true
					}
				} else {
					this.isCheckedCode = false
					this.isDisable = false
					this.showErrMsg = true
				}
			}
		}
	}
</script>

<style>
	.purchase-container {
		padding-top: 44px;
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

	.go-shop {
		width: 100%;
		padding: 20px 5px;
		text-align: center;
	}

	.go-shop-btn {
		background-color: #dd127b;
		color: white;
		padding: 5px 10px;
		border-radius: 25px;
	}

	.purchase-coupon {
		display: none;
	}
</style>