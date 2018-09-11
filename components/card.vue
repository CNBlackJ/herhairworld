<template>
	<div>
		<el-card :body-style="{ padding: '0px' }">
			<img
				src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/product_img_1.jpg"
				class="image"
				@click="showDetail(prod._id)">
			<div class="prod-detail">
				<span
					class="prod-name"
					@click="showDetail(prod._id)">
					{{prod.name}}
				</span>
				<div class="prod-bottom">
					<div class="price">
						$ {{prod.price.toFixed(2)}}
					</div>
					<div class="prod-fav-cart">
						<div>
							<img
								@click="addToFav(prod._id)"
								class="prod-fav-icon"
								src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/unfavorite.png">
						</div>
						<div>
							<img
								@click="addToCart(prod._id)"
								class="prod-fav-icon"
								src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/cart.png">
						</div>
					</div>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script>
	import favorite from '@/apis/favorite'

	export default {
		props: [
			'prod'
		],
		data () {
			return {
				desc: ''
			}
		},
		methods: {
			showDetail (id) {
				this.$router.push({ path: `/details?_id=${id}` })
			},
			addToCart (id) {
				console.log(id)
			},
			addToFav (id) {
				if (this.$store.state.isLogin) {
					const favoriteInfo = {
						productId: id,
						userId: this.$store.state.loginUser._id
					}
					favorite.create({ favorite: favoriteInfo }).then((resp) => {
						if (!resp.error_code) {
							console.log('fav success')
						} else {
							console.log(resp.error_msg)
						}
					}).catch(err => {
						console.log(err)
					})
				} else {
					// save into localstorage
					localStorage.productId = id
				}
			}
		}
	}
</script>

<style>
  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

	.prod-detail {
		padding: 6px;
		font-size: 13px;
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

	.prod-fav-icon {
		width: 18px;
		height: 18px;
		padding: 0 3px;
	}

</style>