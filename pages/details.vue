<template>
	<div class="detail-container">
		<div class="detail-slide">
			<el-carousel height="375px">
				<el-carousel-item v-for="img in product.imgs" :key="img.id">
					<img class="img" :src="img.url">
				</el-carousel-item>
			</el-carousel>
		</div>

		<div class="detail-conten-con">
			<div class="detail-prod-name">
				<div class="">
					{{product.name}}
				</div>
			</div>

			<div class="detail-prod-attr">
				<el-row>
					<el-col :span="5">
						<span class="detail-title">
							Price:
						</span>
					</el-col>
					<el-col :span="19">
						<span class="detail-price">
							$ {{product.price.toFixed(2)}}
						</span>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="5">
						<span class="detail-title">
							Length:
						</span>
					</el-col>
					<el-col :span="19">
						<el-select
							size="small"
							style="width: 100%"
							v-model="selectedLength"
							placeholder="Selecte Length">
							<el-option
								v-for="len in length"
								:key="len"
								:label="len"
								:value="len">
							</el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="5">
						<span class="detail-title">
							Quantity:
						</span>
					</el-col>
					<el-col :span="10">
						<el-input-number
							size="small"
							v-model="quantity"
							@change="changeQty"
							:min="1" 
							:max="product.quantity"
							label="quantity">
						</el-input-number>
					</el-col>
					<el-col :span="9">
						<div
							@click="addToFav(product._id)"
							class="detail-fav-btn">
							<img :src="favImg">
							<span>Add to my wishlist</span>
						</div>
					</el-col>
				</el-row>
			</div>

			<div class="detail-menu-tab">
				<div class="detail-tab-group">
					<el-row>
						<el-col
							v-for="tab in detailTabs"
							:key="tab._id"
							:span="6">
							<div
								@click="activateTab=tab._id"
								v-scroll-to="{ el: tab.scrollTo, offset: -50 }"
								class="tab-title"
								:class="{'detail-tab-selected': activateTab === tab._id}">
								<i v-if="activateTab === tab._id" class="el-icon-location"></i>
								{{tab.name}}
							</div>
						</el-col>
					</el-row>
				</div>

				<div
					v-for="tab in detailTabs"
					:key="tab.id"
					:id="tab.scrollTo.replace('#', '')">
					<img
						class="detail-tab-img"
						v-for="(item, i) in productImgs[tab.name.toLowerCase()]"
						:key="i"
						:src="item">
				</div>
			</div>
		</div>

		<div class="detail-bottom-btns">
			<div
				@click="getInquiry"
				class="detail-bottom-left">
				<img src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/chat.png">
				<span>whosale inquiry</span>
			</div>
			<div class="detail-bottom-right">
				<div
					@click="addToCart(product._id)"
					class="detail-bottom-cart">
					Add to Cart
				</div>
				<div class="detail-bottom-buy">
					Buy Now
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapState } from 'vuex'
	import _ from 'lodash'

	import LS from '@/apis/localStorage'

	export default {
		layout: 'mainWithoutFooter',
		computed: {
			...mapGetters(['isAuthenticated']),
			...mapState({
				product: state => state.details.product,
				cartList: state => {
					if (state.isAuthenticated) return state.cart.cartList
					return state.cart.localCartList
				},
				favList: state => {
					if (state.isAuthenticated) return state.cart.favList
					return state.cart.localFavList
				}
			})
		},
		data () {
			return {
				cartImg: '',
				favImg: this.$store.state.imgBaseUrl + 'unfavorite.png',
				quantity: 1,
				selectedLength: '',
				activateTab: 1,
				detailTabs: [
					{ _id: 1, name: 'Product', icon: 'el-icon-location', scrollTo: '#detail-product-imgs' },
					{ _id: 2, name: 'Wholesale', icon: 'el-icon-location', scrollTo: '#detail-wholesale-imgs' },
					{ _id: 3, name: 'Shipping', icon: 'el-icon-location', scrollTo: '#detail-shipping-imgs' },
					{ _id: 4, name: 'FAQ', icon: 'el-icon-location', scrollTo: '#detail-faq-imgs' }
				],
				productImgs: {
					product: [
						'https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/productDetail/product_1.png',
						'https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/productDetail/product_2.png'
					],
					wholesale: [
						'https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/productDetail/wholesales.png'
					],
					shipping: [
						'https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/productDetail/shipping.png'
					],
					faq: [
						'https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/productDetail/faq.png'
					]
				},
				imgs: [
					{ id: 1, name: 'details_img_1.jpg' },
					{ id: 2, name: 'details_img_2.jpg' },
					{ id: 3, name: 'details_img_3.jpg' }
				],
				length: [
					10, 12, 14, 16, 18, 20, 22
				]
			}
		},
		beforeCreate () {
			const { productId } = this.$nuxt.$route.query
			if (_.isEmpty(this.product) && productId) {
				this.$store.dispatch('details/setProduct', productId)
			}
		},
		created () {
			this.getCartFavImg()
		},
		methods: {
			changeQty () {
				console.log('change qty...')
			},
			clickTab (tab, event) {
				console.log(tab, event)
			},
			getCartFavImg () {
				const cartIdList = this.cartList.map(ele => ele.prodId)
				const favList = this.favList
				const cartImgName = _.find(cartIdList, ele => ele === this.product._id) ? 'cart.png' : 'uncart.png'
				const favImgName = _.find(favList, ele => ele === this.product._id) ? 'favorite.png' : 'unfavorite.png'
				this.cartImg = this.$store.state.imgBaseUrl + cartImgName
				this.favImg = this.$store.state.imgBaseUrl + favImgName
			},
			addToFav (productId) {
				if (this.isAuthenticated) {
					this.$store.dispatch('list/createFav', productId)
				} else {
					LS.createFavorite(productId)
					this.$store.dispatch('cart/setLocalFavList')
				}
				this.getCartFavImg()
			},
			addToCart (productId) {
				if (this.isAuthenticated) {
					this.$store.dispatch('list/createCart', productId)
				} else {
					LS.createCart({ prodId: productId, count: 1 })
					this.$store.dispatch('cart/setLocalCartList')
				}
				this.getCartFavImg()
			},
			getInquiry () {
				this.$router.push({ path: '/inquiry' })
			}
		}
	}
</script>

<style>
	.detail-container {
		padding-top: 50px;
		background-color: #efefef;
		height: 600px;
	}

	.img {
		width: 100%;
	}

	.detail-conten-con {
		padding-bottom: 50px;
	}

	.detail-prod-name {
		margin-bottom: 10px;
		background-color: white;
		padding: 5px 10px;
	}

	.detail-prod-attr {
		background-color: white;
		padding: 5px 10px;
		margin-bottom: 10px;
	}

	.detail-prod-attr .el-row {
		padding-bottom: 10px;
		display: flex;
		align-items: center;
	}

	.detail-title {
		font-size: 14px;
		font-weight: bold;
	}

	.detail-price {
		color: #dd127b;
	}

	.detail-fav-btn {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.detail-fav-btn img {
		width: 18px;
		height: 18px;
	}

	.detail-fav-btn span{
		font-size: 12px;
		padding-left: 5px;
	}

	.detail-menu-tab {
		background-color: white;
		padding: 5px 10px;
	}

	.detail-tab-group {
		padding-bottom: 10px;
	}

	.tab-title {
		font-size: 14px;
		text-align: center;
	}

	.detail-tab-selected {
		color: #dd127b;
	}

	.detail-tab-img {
		width: 100%;
	}

	.detail-bottom-btns {
		padding: 6px 0;
		position: fixed;
		bottom: 0;
		background-color: #fff;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.detail-bottom-left {
		width: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.detail-bottom-left img {
		width: 22px;
		height: 22px;
	}

	.detail-bottom-left span {
		font-size: 8px;
		color: #dd127b;
	}

	.detail-bottom-right {
		width: 50%;
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 14px;
		color: #fff;
	}

	.detail-bottom-cart {
		background-color: #5D5D5D;
		padding: 10px 12px;
		border-top-left-radius: 25px;
		border-bottom-left-radius: 25px;
	}

	.detail-bottom-buy {
		background-color: #dd127b;
		padding: 10px 12px;
		border-top-right-radius: 25px;
		border-bottom-right-radius: 25px;
	}
</style>