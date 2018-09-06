<template>
	<div class="detail-container">
		<div class="block">
			<el-carousel height="375px">
				<el-carousel-item v-for="img in imgs" :key="img.id">
					<img class="img" :src="'https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/' + img.name">
				</el-carousel-item>
			</el-carousel>
		</div>
	
		<div class="detail-content">
			<div class="detail-prod-name">
				{{prod.name}}
			</div>

			<div class="discount">
				<span class="discount-price">{{discount.price}}</span>
				off to your hair with Coupon Code: 
				<span class="discount-code">{{discount.code}}</span>
			</div>

			<div class="prod-attr">
				<detailTypes title="hair closure" v-bind:vals="['free part', 'middle part', 'three part']"></detailTypes>
				<detailTypes title="Hair Closure Length/inch" v-bind:vals="[10, 12, 14, 16, 18, 20]"></detailTypes>
				<detailTypes title="hair type" v-bind:vals="['Brazilian Hair', 'Peruvian Hair', 'Malaysian Hair', 'Indian Hair']"></detailTypes>
			</div>

			<div class="prod-count-con">
				<div class="quantity-title">Quantity: </div>
				<div class="cart-prod-count">
					<a @click="minus(prod._id)" class="cart-btn-minus" :class="{'cart-btn-dis': isMinimum}">-</a>
					<span class="cart-pord-sum">
							{{count}}
					</span>
					<a @click="plus(prod._id)" class="cart-btn-plus" :class="{'cart-btn-dis': isMax}">+</a>
				</div>
			</div>

			<div class="total-price">
				<div class="tp-title">Total Price: </div>
				<div class="tp-price">$ {{totalPrice.toFixed(2)}}</div>
			</div>

			<purchase
				v-on:addToCart="addToCart"
				v-on:buyNow="buyNow"></purchase>
		</div>

		<div class="prod-descriptions">
			TODO: It is prod descriptions
		</div>
	</div>
</template>

<script>
	import detailTypes from '@/components/detailTypes'
	import purchase from '@/components/purchase'

	import product from '@/apis/product'
	import cart from '@/apis/cart'

	export default {
		layout: 'main',
		components: {
			detailTypes,
			purchase
		},
		data () {
			return {
				imgs: [
					{
						id: 1,
						name: 'details_img_1.jpg'
					},
					{
						id: 2,
						name: 'details_img_2.jpg'
					},
					{
						id: 3,
						name: 'details_img_3.jpg'
					}
				],
				prod: {},
				discount: {
					price: '$3',
					code: 'nadula'
				},
				count: 1,
        isMinimum: false,
				isMax: false,
				totalPrice: 0
			}
		},
		created () {
			const { _id } = this.$route.query
			this.getProd(_id)
		},
		methods: {
			addToCart () {
				const cartInfo = {
					userId: '5b91368f2bfd7c2fa8124652',
					productId: this.prod._id,
					count: this.count
				}
				cart.create({ cart: cartInfo }).then((resp) => {
					if (resp.code === 200) {
						this.$router.push({ path: '/cart' })
					} else {
						alert(resp.error_msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			buyNow () {
				console.log('buy now')
			},
			plus (prodId) {
        this.isMinimum = false
        if (this.count >= this.prod.quantity) {
					this.isMax = true
				} else {
					this.count ++
					this.calculatePrice()
				}
      },
      minus (prodId) {
        this.isMax = false
        if (this.count <= 0) {
					this.isMinimum = true
				} else {
					this.count --
					this.calculatePrice()
				}
			},
			getProd (id) {
				product.getById({ id }).then((resp) => {
					this.prod = resp.data
					this.calculatePrice()
				}).catch(err => {
					console.log(err)
				})
			},
			calculatePrice () {
				this.totalPrice = this.count * this.prod.price
			}
		}
	}
</script>

<style>
	.detail-container {
		padding-top: 50px;
	}

	.detail-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10px;
	}

	.detail-prod-name {
		padding: 10px 0;
	}

	.img {
		width: 100%;
	}

	.discount {
		border: 1px dotted #dd127b;
		padding: 5px 0;
		font-size: 12px;
		width: 100%;
		text-align: center;
	}

	.discount-price {
		color: #dd127b;
		font-weight: bold;
	}

	.discount-code {
		color: #dd127b;
		text-transform: uppercase;
		font-weight: bold;
	}

	.prod-attr {
		width: 100%;
		text-transform: capitalize;
	}

	.prod-count-con {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		padding: 10px 0;
		width: 100%;
	}

  .cart-prod-count {
    font-size: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
		padding: 0 20px;
  }

  .cart-btn-plus {
    padding: 5px 10px;
    border: 1px solid #efefef;
    border-radius: 5px;
  }

  .cart-btn-minus {
    padding: 5px 10px;
    border: 1px solid #efefef;
    border-radius: 5px;
  }

  .cart-pord-sum {
    padding: 5px 15px;
    border: 1px solid #efefef;
    border-radius: 5px;
  }

	.total-price {
		display: flex;
		flex-direction: row;
		width: 100%;
	}

	.tp-price {
		padding: 0 10px;
		color: #dd127b;
	}
</style>