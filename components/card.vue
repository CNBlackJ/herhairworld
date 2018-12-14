<template>
	<div>
		<el-card :body-style="{ padding: '0px' }">
			<img
				:src="product.mainImg"
				class="produc-card-image"
				@click="showDetail(product._id)">
			<div class="prod-detail">
				<span
					class="prod-name"
					@click="showDetail(product._id)">
					{{product.name}}
				</span>
				<div class="prod-bottom">
					<div class="price">
						$ {{product.price.toFixed(2)}}
					</div>
					<div class="prod-fav-cart">
						<div
							class="card-inquiry-btn"
							v-on:click="getInquiry(product.name)">
							<span>Inquiry</span>
						</div>
					</div>
				</div>
			</div>
		</el-card>

		<addedDialog v-if="dialogVisible"></addedDialog>
	</div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex'
	import _ from 'lodash'

	import addedDialog from '@/components/addedDialog'

	export default {
		props: [
			'product'
		],
		components: {
			addedDialog
		},
		computed: {
			...mapGetters(['isAuthenticated']),
			...mapState({
				carts: state => {
					if (state.isAuthenticated) return state.cart.cartList
					return state.cart.localCartList
				},
				favList: state => {
					if (state.isAuthenticated) return state.cart.favList
					return state.cart.localFavList
				},
				imgBaseUrl: state => state.imgBaseUrl
			})
		},
		data () {
			return {
				dialogVisible: false,
				price: ''
			}
		},
		async created () {
			await this.formatPrice()
		},
		methods: {
			async formatPrice () {
				const allPrice = _.orderBy([...this.product.customizePrice].map(ele => ele.price))
				const minPrice = allPrice[0] || 0
				this.price = minPrice.toFixed(2)
			},
			showDetail (productId) {
				this.$store.dispatch('details/setProduct', productId)
				this.$router.push({ path: `/details?productId=${productId}` })
			},
			getInquiry (title) {
        const sendPage = {
					name: this.$route.name,
					path: this.$route.fullPath,
					additional: title
				}
        this.$store.commit('inquiry/SET_SEND_PAGE', sendPage)
        this.$router.push({ path: '/inquiry' })
      }
		}
	}
</script>

<style>
  .button {
    padding: 0;
    float: right;
  }

  .produc-card-image {
    width: 100%;
    display: block;
  }

	.prod-detail {
		padding: 6px;
		font-size: 13px;
		height: 53px;
	}

	.prod-name {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.prod-bottom {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding-top: 5px;
	}

	.price {
		color: #dd127b;
	}
	
	.prod-fav-cart {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.card-inquiry-btn {
		background-color: #dd127b;
		color: white;
		border-radius: 3px;
		padding: 4px 10px;
	}
</style>