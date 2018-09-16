<template>
	<div class="search-container">
		<div class="search-head">
			<div @click="$router.back(-1)" class="search-back">
				<i class="el-icon-arrow-left"></i>
			</div>
			<div>Search</div>
			<div></div>
		</div>
		<div class="search-input-con">
			<el-autocomplete
				style="display: block;"
				v-model="searchVal"
				:fetch-suggestions="querySearch"
				placeholder="Please enter ..."
				@select="handleSelect"
				clearable>
				<i slot="prefix" class="el-input__icon el-icon-search"></i>
			</el-autocomplete>
		</div>
		<div class="search-result">
			<el-row>
				<el-col 
					class="prod-card" 
					v-for="prod in prodList" 
					:key="prod._id" 
					:span="12">
					<card :prod="prod">
					</card>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import card from '@/components/card'

	import product from '@/apis/product'

	export default {
		layout: 'main',
		components: {
			card
		},
		data () {
			return {
				searchVal: '',
				searchAdvices: [],
				prodList: []
			}
		},
    mounted() {
      this.searchAdvices = this.loadAll();
    },
		methods: {
			handleSelect (item) {
				console.log(item)
        this.listProd()
			},
			listProd () {
				product.list({}).then((resp) => {
					this.prodList = resp.data
				}).catch(err => {
					console.log(err)
				})
			},
      querySearch(queryString, cb) {
        const searchAdvices = this.searchAdvices;
        const results = queryString ? searchAdvices.filter(this.createFilter(queryString)) : searchAdvices;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (searchVal) => {
          return (searchVal.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
			},
			loadAll () {
				return [
					{ value: 'hair' },
					{ value: 'hair 2' },
					{ value: 'hair 3' }
				]
			}
		}
	}
</script>

<style>
	.search-container {
		padding-top: 50px;
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

	.prod-card {
    padding: 6px;
	}
</style>