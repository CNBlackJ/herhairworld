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
			<div class="pagination">
				<el-pagination
					background
					small
					layout="prev, pager, next"
					:total="100">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import types from '@/components/types'
	import card from '@/components/card'

	import product from '@/apis/product'

	export default {
		layout: 'main',
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
	}

	.prod-cards {
		padding-top: 6px;
	}

	.prod-card {
    padding: 6px;
	}

	.pagination {
		text-align: center;
		padding: 10px 0;
	}
</style>
