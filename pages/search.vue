<template>
	<div class="search-container">
		<div class="search-head">
			<div @click="$router.back(-1)">
				<i class="el-icon-arrow-left"></i>
			</div>
			<div>Search</div>
			<div></div>
		</div>
		<div class="search-input-con">
			<el-input
				clearable
				size="small"
				placeholder="Please enter ..."
				v-model="searchVal">
				<el-button
					@click="search(searchVal)"
					slot="append"
					icon="el-icon-search">
				</el-button>
			</el-input>
		</div>
		<div
			v-if="!isSearched"
			class="search-recommand">
			<div class="sr-title">
				Hot :
			</div>
			<div class="hot-tags">
				<div
					class="hot-tag"
					v-for="hotTag in hotTags"
					@click="search(hotTag.tag)"
					:key="hotTag._id">
					{{hotTag.tag}}
				</div>
			</div>
		</div>
		<div class="search-result">
			<el-row>
				<el-col 
					class="prod-card" 
					v-for="prod in prodList" 
					:key="prod._id" 
					:span="12">
					<card :product="prod">
					</card>
				</el-col>
			</el-row>
		</div>
		<div
			class="empty-search"
			v-if="isSearched && prodList.length === 0">
			It`s empty ~~
		</div>
	</div>
</template>

<script>
	import card from '@/components/card'

	import product from '@/apis/product'

	export default {
		layout: 'mainWithoutFooter',
		components: {
			card
		},
		data () {
			return {
				searchVal: '',
				prodList: [],
				isSearched: false,
				hotTags: [
					{ _id: 1, tag: 'iphone' },
					{ _id: 2, tag: 'hair' },
					{ _id: 3, tag: 'new style' }
				]
			}
		},
		methods: {
			async search (searchVal) {
				this.isSearched = true
        this.prodList = await product.list({ search: searchVal })
			}
		}
	}
</script>

<style>
	.search-container {
		padding-top: 48px;
	}

	.search-head {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 10px 0;
		background-color: #efefef;
	}

	.search-input-con {
		padding: 10px;
	}

	.search-recommand {
		display: flex;
		flex-direction: column;
		padding: 10px;
	}

	.sr-title {
		font-size: 14px;
	}

	.hot-tags {
		display: flex;
		flex-direction: row;
		padding-top: 10px;
		font-size: 13px;
	}

	.hot-tag {
		background-color: #dfdfdf;
		margin-right: 8px;
		padding: 3px 10px;
		border-radius: 25px;
	}

	.prod-card {
    padding: 6px;
	}

	.empty-search {
		width: 100%;
		text-align: center;
		padding-top: 20%;
		color: #808080;
	}
</style>