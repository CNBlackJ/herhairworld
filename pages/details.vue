<template>
	<div class="detail-container">
		<div class="detail-slide">
			<el-carousel :height="carouselHeigth">
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
							{{product.priceType}}:
						</span>
					</el-col>
					<el-col :span="19">
						<el-select
							@change="selectedCusKey"
							size="small"
							style="width: 100%"
							v-model="detailForm.key"
							:placeholder="'Selecte ' + product.priceType">
							<el-option
								v-for="length in product.customizePrice"
								:key="length._id"
								:label="length.key"
								:value="length.key">
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

			<img
				class="detail-tab-img"
				v-for="(item, i) in productImgs.product"
				:key="i"
				:src="item">
		</div>

		<div class="detail-bottom-btns">
			<div
				@click="getInquiry"
				class="detail-bottom-left">
				<img src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/chat.png">
				<span>wholesale inquiry</span>
			</div>
			<div class="detail-bottom-right">
				<div
					@click="addToCart(product)"
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

		<recommend></recommend>
		<addedDialog v-if="dialogVisible"></addedDialog>
	</div>
</template>

<script>
	import { mapGetters, mapState } from 'vuex'
	import _ from 'lodash'

	import LS from '@/apis/localStorage'
	import order from '@/apis/order'
	import priceApi from '@/apis'

	import addedDialog from '@/components/addedDialog'
	import recommend from '@/components/recommend'

	export default {
		layout: 'mainWithoutFooter',
		components: {
			addedDialog,
			recommend
		},
		computed: {
			...mapGetters(['isAuthenticated']),
			...mapState({
				product: state => state.details.product,
				carts: state => state.cart.carts,
				favList: state => {
					if (state.isAuthenticated) return state.cart.favList
					return state.cart.localFavList
				},
				priceList: state => state.details.priceList
			})
		},
		data () {
			return {
				dialogVisible: false,
				price: '',
				cartImg: '',
				favImg: this.$store.state.imgBaseUrl + 'unfavorite.png',
				productImgs: {
					product: [],
					wholesale: [],
					shipping: [],
					faq: []
				},
				detailForm: {
					key: '',
					price: '',
					count: 1
				},
				carouselHeigth: ''
			}
		},
		async created () {
			// 监听窗口大小变化
			window.addEventListener('resize', this.handleResize)
			this.handleResize()

			const { productId } = this.$nuxt.$route.query
			await this.$store.dispatch('details/setProduct', productId)
			// this.getCartFavImg()
			const { minPrice, maxPrice } = this.product
			this.price = minPrice === maxPrice ? this.price = minPrice.toFixed(2) : `${minPrice.toFixed(2)} - ${maxPrice.toFixed(2)}`
			this.productImgs.product = this.product.detailImgs.product.map(ele => ele.url)
		},
		destroyed () {
			window.removeEventListener('resize', this.handleResize)
		},
		methods: {
			handleResize() {
				const windowWidth = window.innerWidth
				this.carouselHeigth = `${windowWidth}px`
			},
			selectedCusKey (key) {
				const cusPrice = this.product.customizePrice.find(ele => ele.key === key)
				if (cusPrice) {
					const price = cusPrice.price.toFixed(2)
					this.price = price
					this.detailForm.price = price
				} else {
					this.price = ''
				}
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
			addToCart ({ _id, priceType, priceId, maxWeight, customizePrice }) {
				const productId = String(_id)
				if (!this.detailForm.key) {
					this.$message(`Please Select ${priceType}.`)
				} else {
					const cusPrice = customizePrice.find(ele => ele.key === this.detailForm.key)
					const cartInfo = {
						uniqueId: productId+cusPrice._id,
						productId,
						priceId,
						maxWeight,
						count: this.detailForm.count,
						key: cusPrice.key,
						price: cusPrice.price
					}
					this.$store.dispatch('cart/addToCart', { cartInfo })
					// this.getCartFavImg()
					this.dialogVisible = !this.dialogVisible
				}
			},
			getInquiry () {
				const sendPage = {
					name: this.$route.name,
					path: this.$route.fullPath,
					additional: ''
				}
				this.$store.commit('inquiry/SET_SEND_PAGE', sendPage)
				this.$router.push({ path: '/inquiry' })
			},
			async buyNow (productId) {
				if (!this.detailForm.key) {
					this.$message(`Please Select ${this.product.priceType}.`)
				} else {
					const productInfo = {...this.detailForm, ...{ productId }}
					this.$store.commit('details/SET_BUY_NOW', productInfo)
					this.$router.push({ path: '/purchase?isBuyNow=true' })
				}
			}
		}
	}
</script>

<style>
	.detail-container {
		padding-top: 48px;
		background-color: #efefef;
		padding-bottom: 50px;
	}

	.img {
		width: 100%;
	}

	.detail-conten-con {
		padding-bottom: 10px;
		border-bottom: 1px dashed #dd127b;
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
		z-index: 1;
	}

	.detail-bottom-left {
		width: 45%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.detail-bottom-left img {
		width: 22px;
		height: 22px;
		padding: 0 10px 0 20px;
	}

	.detail-bottom-left span {
		font-size: 14px;
		color: #dd127b;
		text-transform: capitalize;
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