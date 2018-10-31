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
				<!-- <no-ssr>
					<infinite-loading @infinite="infiniteHandler">
						<div slot="no-more" class="list-nomore">
							<div class="list-nomore-text">
								no mores～
							</div>
						</div>
					</infinite-loading>
				</no-ssr> -->
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
		async created () {
			this.$store.dispatch('list/setProductList', { limit: 100 })
			this.$store.dispatch('cart/setLocalFavList')
		},
		data () {
			return {
				page: 1
			}
		},
		methods: {
			async infiniteHandler ($state) {
				await this.$store.dispatch('list/setProductList', { limit: 100 })
				if (this.productList.length === (this.page * 2)) {
					this.page += 1
					$state.loaded()
				} else {
					$state.complete()
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
