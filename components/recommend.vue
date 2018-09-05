<template>
	<div class="recommend-container">
		<div class="recommend-title">
			<strong>You may also like</strong>
		</div>

		<el-row>
			<el-col 
				class="recommend-prod-card"
				v-for="prod in recommendProds" 
				:key="prod._id" 
				:span="12">
				<card :prod="prod">
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
		created () {
			this.listProd()
		},
		methods: {
			listProd () {
				product.list({ limit: 2 }).then((resp) => {
					this.recommendProds = resp.data
				}).catch(err => {
					console.log(err)
				})
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