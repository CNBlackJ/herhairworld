<template>
	<div class="list-container">
		<types></types>
		<div class="prod-cards">
			<el-row>
				<el-col 
					class="prod-card" 
					v-for="prod in $store.state.productList" 
					:key="prod._id" 
					:span="12">
					<card :prod="prod">
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
	import types from '@/components/types'
	import card from '@/components/card'

	import product from '@/apis/product'

	export default {
		layout: 'mainWithInquiry',
		components: {
			types,
			card
		},
		created () {
			this.$store.dispatch('setProductList')
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
