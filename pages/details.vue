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
							$ {{price}}
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
							@change="selecteLength"
							size="small"
							style="width: 100%"
							v-model="detailForm.length"
							placeholder="Selecte Length">
							<el-option
								v-for="length in product.lengths"
								:key="length._id"
								:label="length.len"
								:value="length.len">
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
							v-model="detailForm.count"
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

			<div class="detail-tab-group" :class="{'fix-tab-group': isFixedTab}">
				<div
					v-for="tab in detailTabs"
					:key="tab._id">
					<div
						@click="activateTab=tab._id"
						v-scroll-to="{ el: tab.scrollTo, offset: -50 }"
						class="tab-title"
						:class="{'detail-tab-selected': activateTab === tab._id}">
						<i v-if="activateTab === tab._id" class="el-icon-location"></i>
						{{tab.name}}
					</div>
				</div>
			</div>

			<div id="tabBar" class="details-group">
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
				<el-tooltip
					v-if="isExistCart"
					effect="dark"
					:content="addToCartTip"
					placement="top">
					<div
						@click="addToCart(product._id)"
						class="detail-bottom-cart">
						Add to Cart
					</div>
				</el-tooltip>
				<div
				  v-else
					@click="addToCart(product._id)"
					class="detail-bottom-cart">
					Add to Cart
				</div>
				<div
					@click="buyNow(product._id)"
					class="detail-bottom-buy">
					&nbsp; Buy Now &nbsp;
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapState } from 'vuex'
	import _ from 'lodash'

	import LS from '@/apis/localStorage'
	import order from '@/apis/order'

	export default {
		layout: 'mainWithoutFooter',
		computed: {
			...mapGetters(['isAuthenticated']),
			...mapState({
				product: state => state.details.product,
				carts: state => state.cart.carts,
				favList: state => {
					if (state.isAuthenticated) return state.cart.favList
					return state.cart.localFavList
				}
			})
		},
		data () {
			return {
				addToCartTip: 'It`s in cart',
				price: '',
				cartImg: '',
				favImg: this.$store.state.imgBaseUrl + 'unfavorite.png',
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
				detailForm: {
					length: '',
					price: '',
					count: 1
				},
				isFixedTab: false,
				isExistCart: false
			}
		},
		async created () {
			this.$store.dispatch('cart/setCarts')
			const { productId } = this.$nuxt.$route.query
			await this.$store.dispatch('details/setProduct', productId)
			this.getCartFavImg()
			this.price = `${this.product.minPrice.toFixed(2)} - ${this.product.maxPrice.toFixed(2)}`
			if (this.product.minPrice === this.product.maxPrice) {
				this.price = this.product.minPrice.toFixed(2)
			}
			this.isExistCart = !!this.carts.find(cart => cart.productId === productId)
		},
		mounted() {
			window.addEventListener('scroll', this.handleScroll)
		},
		destroyed () {
			window.removeEventListener('scroll', this.handleScroll)
		},
		methods: {
			handleScroll() {
				const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				const tabBarPos = document.querySelector('#tabBar').offsetTop
				this.isFixedTab = scrollPos > (tabBarPos - 48)
				
				const productImgs = document.querySelector('#detail-product-imgs').offsetTop
				const wholesaleImgs = document.querySelector('#detail-wholesale-imgs').offsetTop
				const shippingImgs = document.querySelector('#detail-shipping-imgs').offsetTop
				const faqImgs = document.querySelector('#detail-faq-imgs').offsetTop
				
				if (scrollPos >= productImgs && scrollPos < wholesaleImgs) this.activateTab = 1
				if (scrollPos >= wholesaleImgs && scrollPos < shippingImgs) this.activateTab = 2
				if (scrollPos >= shippingImgs && scrollPos < faqImgs) this.activateTab = 3
				if (scrollPos >= faqImgs) this.activateTab = 4
			},
			selecteLength (len) {
				const length = this.product.lengths.find(ele => ele.len === len)
				if (length) {
					const price = length.price.toFixed(2)
					this.price = price
					this.detailForm.price = price
				} else {
					this.price = ''
				}
			},
			changeQty () {
				console.log('change qty...')
			},
			clickTab (tab, event) {
				console.log(tab, event)
			},
			getCartFavImg () {
				const cartIdList = this.carts.map(ele => ele.productId)
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
				// check length
				if (!this.detailForm.length) {
					this.$message('Please select length.')
					return
				}
				if (!this.isExistCart) {
					const lengthPrice = this.product.lengths.find(ele => ele.len === this.detailForm.length)
					const cartInfo = {...lengthPrice, ...{ productId }, ...{ count: this.detailForm.count }}
					if (this.isAuthenticated) {
						this.$store.dispatch('list/createCart', cartInfo)
					} else {
						LS.createCart(cartInfo)
						this.$store.dispatch('cart/setLocalCartList')
					}
					this.getCartFavImg()
					this.$store.dispatch('cart/setCarts')
					this.isExistCart = true
				}
			},
			getInquiry () {
				this.$router.push({ path: '/inquiry' })
			},
			async buyNow (productId) {
				const orderForm = {...this.detailForm, ...{ productId }}
				const orderPayload = {
					products: [
						orderForm
					],
					couponCode: ''
				}
				await order.create(orderPayload)
			}
		}
	}
</script>

<style>
	.detail-container {
		padding-top: 48px;
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

	.detail-tab-group {
		background-color: white;
		padding-top: 10px;
	}

	.details-group {
		background-color: white;
		padding: 5px 10px;
	}

	.detail-tab-group {
		padding-bottom: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
	}

	.fix-tab-group {
		position: fixed;
		top: 48px;
		z-index: 10;
		width: 100%;
		background-color: white;
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
		width: 45%;
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
		width: 55%;
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