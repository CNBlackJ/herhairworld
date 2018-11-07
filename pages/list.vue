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
		<div
			v-infinite-scroll="loadMore"
			infinite-scroll-disabled="busy"
			infinite-scroll-distance="20"
			class="list-nomore">
			<div class="list-nomore-text">
				no mores～
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex'

	import types from '@/components/types'
	import card from '@/components/card'
	import product from '@/apis/product'

	export default {
		layout: 'mainWithInquiry',
		components: {
			types,
			card
		},
		computed: {
			...mapState({
				productList: state => state.list.productList,
				count: state => state.list.count,
				pageSize: state => state.list.pageSize
			}),
			...mapGetters({
				maxPage: 'list/maxPage'
			})
		},
		async created () {
			await this.$store.dispatch('list/setProductList', { limit: 10 })
			this.$store.dispatch('cart/setLocalFavList')
		},
		data () {
			return {
				data: [],
				busy: false,
				currentPage: 1
			}
		},
		methods: {
			async loadMore () {
				if (this.maxPage > this.currentPage) {
					product.list({ limit: this.pageSize, skip: this.currentPage * this.pageSize }).then((resp) => {
						const { rows } = resp
						this.$store.dispatch('list/pushIntoProductList', rows)
						this.currentPage++
					})
					this.busy = false
				}
			}
		}
	}
</script>

<style>
	.list-container {
		padding-top: 48px;
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
