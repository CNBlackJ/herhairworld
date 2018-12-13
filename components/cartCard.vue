<template>
	<div class="cart-card-container">
		<el-row>
			<el-col :xs="2">
				<div class="cc-checkbox-con">
					<el-checkbox v-model="isChecked" @change="checkCartProd(cartProd)"></el-checkbox>
				</div>
			</el-col>
			<el-col :xs="6">
				<div
					v-on:click="$router.push({ path: `/details?productId=${cartProd.productId}` })"
					class="cart-card-img-con">
					<img class="cart-card-img" :src="product.mainImg">
				</div>
			</el-col>
			<el-col :xs="16" style="padding-left: 10px;">
				<div class="cc-rigth">
					<div
						v-on:click="$router.push({ path: `/details?productId=${cartProd.productId}` })"
						class="cc-name">
						{{product.name}}
					</div>
					<div class="cc-detail">
						<div class="cc-parameters">
							{{size}}
						</div>
					</div>
					<div class="cc-price">
						$ {{price}}
					</div>
					<div class="cc-counter">
						<div>
							<el-input-number
								v-model="count"
								@change="updateCount(cartProd)"
								size="mini"
								:min="1">
							</el-input-number>
						</div>
						<div>
							<i
								class="el-icon-close"
								@click="dialogVisible = true"></i>
						</div>
					</div>
				</div>
			</el-col>
		</el-row>
		<el-dialog
			class="cart-dialog"
			:visible.sync="dialogVisible"
			width="80%">
			<div>
				Are you sure to delete it?
			</div>
			<span slot="footer">
				<el-button @click="dialogVisible = false">No</el-button>
				<el-button class="confirm-btn" @click="removeFromCart(cartProd)">Yes</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex'

	import product from '@/apis/product'
	import cart from '@/apis/cart'
	import LS from '@/apis/localStorage'

	export default {
		props: [
			'cartProd'
		],
		computed: {
			...mapGetters(['isAuthenticated']),
			...mapState({
				priceList: state => state.cart.priceList
			})
		},	
		data () {
			return {
				dialogVisible: false,
				isChecked: false,
				price: 0,
				count: 1,
				product: {
					mainImg: ''
				},
				size: ''
			}
		},
		async created () {
			await this.$store.dispatch('cart/setPriceList')
			const productId = this.cartProd.productId || this.cartProd._id
			await this.getProduct(productId)
			this.isChecked = this.cartProd.isChecked
		},
		// watch: {
		// 	cartProd: (newVal, oldVal) => {
		// 		this.isChecked = newVal.isChecked
		// 	}
		// },
    methods: {
			async getProduct (productId) {
				this.product = await product.getById(productId)
				this.price = this.cartProd.price.toFixed(2)
				this.count = this.cartProd.count

				const { priceId } = this.product
				const price = this.priceList.find(ele => String(ele._id) === priceId)
				const key = price ? price.key : ''
				const val = this.cartProd.key
				this.size = `${key}: ${val} ${key.toLowerCase() === 'length' ? 'inches' : ''}`
			},
      async updateCount ({ _id, count }) {
				const cartInfo = { _id, count: this.count }
				this.$store.dispatch('cart/updateCart', { cartInfo })
			},
			async removeFromCart ({ _id }) {
				this.$store.dispatch('cart/deleteCart', { cartInfo: { _id } })
				this.dialogVisible = false
			},
			checkCartProd ({ _id }) {
				const cartInfo = { _id, isChecked: this.isChecked }
				this.$store.dispatch('cart/updateCart', { cartInfo })
			}
    }
	}	
</script>

<style>
	.cart-card-container {
		padding: 10px;
		background-color: white;
		border-radius: 15px;
	}

	.cc-checkbox-con {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 80px;
	}

	.cart-card-img-con {
		width: 80px;
		height: 80px;
	}

	.cart-card-img {
		width: auto;
		height: auto;
		max-width: 100%;
		max-height: 100%;
	}

	.cc-right {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}

	.cc-name {
		font-size: 15px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.cc-detail {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 5px 0;
	}

	.cc-parameters {
		font-size: 12px;
		color: #808080;
	}

	.cc-price {
		font-size: 15px;
		color: #dd127b;
	}

	.cc-counter {
		padding: 5px 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.confirm-btn {
		background-color:#dd127b;
		border-color: #dd127b;
		color: white;
	}

	.cart-dialog .el-dialog {
		margin-top: 60% !important;
		border-radius: 5px;
	}
</style>