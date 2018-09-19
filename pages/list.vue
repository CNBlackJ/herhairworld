<template>
	<div class="list-container">
		<types></types>
		<div class="prod-cards">
			<el-row>
				<el-col 
					class="prod-card" 
					v-for="product in productList" 
					:key="product._id" 
					:span="12">
					<card :product="product">
					</card>
				</el-col>
			</el-row>
		</div>
		<div class="list-nomore">
			<div class="list-nomore-text">
				no mores～
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'

	import types from '@/components/types'
	import card from '@/components/card'

	export default {
		layout: 'mainWithInquiry',
		components: {
			types,
			card
		},
		computed: mapState({
			productList: state => state.list.productList
		}),
		created () {
			this.$store.dispatch('list/setProductList')
			this.$store.dispatch('home/setCategories')
			this.$store.dispatch('cart/setLocalFavList')
			this.$store.dispatch('cart/setLocalCartList')
		}
	}
</script>

<style>
	.list-container {
		padding-top: 50px;
		background-color: #efefef;
		min-height: 450px;
	}

	.prod-cards {
		padding-top: 6px;
	}

	.prod-card {
    padding: 6px;
	}

	.list-nomore {
		padding: 20px;
	}

	.list-nomore-text {
		text-align: center;
		font-size: 14px;
	}
</style>
