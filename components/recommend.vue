<template>
	<div class="recommend-container">
		<div class="recommend-title">
			MAY BE YOU LIKE
		</div>

		<el-row>
			<el-col 
				class="recommend-prod-card"
				v-for="product in recommendProds" 
				:key="product._id" 
				:span="12">
				<card :product="product">
				</card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import card from '@/components/card'

	import product from '@/apis/product'

	export default {
		components: {
			card
		},
		data () {
			return {
				recommendProds: []
			}
		},
		async created () {
			await this.listProd()
		},
		methods: {
			async listProd () {
				this.recommendProds = await product.recommand(2)
			}
		}
	}
</script>

<style>
	.recommend-container {
		padding: 10px;
	}
	.recommend-prod-card {
		padding: 5px;
	}
</style>