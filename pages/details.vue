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
			<div class="prod-name">
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

			<div class="prod-quantity">
				<div class="cart-prod-count">
					<a @click="plus(prod._id)" class="cart-btn-plus" :class="{'cart-btn-dis': isMax}">+</a>
					<span class="cart-pord-sum">
							{{count}}
					</span>
					<a @click="minus(prod._id)" class="cart-btn-minus" :class="{'cart-btn-dis': isMinimum}">-</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import detailTypes from '@/components/detailTypes'

	export default {
		layout: 'main',
		components: {
			detailTypes
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
				prod: {
					name: '#1B/99J Superior Grade 1 bundle Brazilian straight Virgin Human hair extensions'
				},
				discount: {
					price: '$3',
					code: 'nadula'
				}
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

	.img {
		width: 100%;
	}

	.prod-name {
		padding: 10px 0;
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
</style>