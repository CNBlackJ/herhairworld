<template>
	<div class="list-container">
		<types v-if="activeType" v-on:fetchList="fetchList" :activeType="activeType"></types>
		<div class="prod-cards">
			<el-row>
				<el-col
					class="prod-card" 
					v-for="(product, i) in productList" 
					:key="i" 
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
				<i v-if="isLoading" class="el-icon-loading"></i>
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
				count: state => state.list.count,
				pageSize: state => state.list.pageSize,
				currentPage: state => state.list.currentPage,
				activateCat: state => state.home.activateCat,
				listData: state => state.list.data,
				listList: state => state.list.list,
				categories: state => state.home.categories
			}),
			...mapGetters({
				maxPage: 'list/maxPage',
				allCategoryId: 'home/allCategoryId'
			})
		},
		async created () {
			await this.$store.dispatch('home/setCategories')
			const _id = this.$route.query.categoryId
			this.activeType = this.categories.findIndex(ele => String(ele._id) === String(_id))
			await this.fetchList({ _id })
		},
		data () {
			return {
				busy: false,
				isLoading: false,
				productList: [],
				activeType: 0
			}
		},
		methods: {
			async fetchList ({ _id }) {
				this.isLoading = true
				await this.$store.dispatch('list/setData')
				this.productList = _id === this.allCategoryId ? this.listList :
					this.listList.filter(item => String(item.category._id) === String(_id))
				this.isLoading = false
			},
			async loadMore () {
				let currentPage = this.currentPage
				const pageSize = this.pageSize
				if (this.maxPage > currentPage) {
					this.isLoading = true
					this.busy = true
					const resp = await product.list({
						limit: pageSize,
						skip: currentPage * pageSize,
						categoryId: this.activateCat || '',
						online: true,
						sort: 'categoryIndex'
					})
					const { rows } = resp
					this.$store.dispatch('list/pushIntoProductList', rows)
					this.$store.commit('list/SET_CURRENT_PAGE', ++currentPage)
					this.busy = false
					this.isLoading = false
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
