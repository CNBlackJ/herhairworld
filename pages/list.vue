<template>
	<div class="list-container">
		<types></types>
		<div class="prod-cards">
			<el-row>
				<el-col class="prod-card" v-for="item in 10" :key="item.id" :span="12">
					<card></card>
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

	export default {
		layout: 'main',
		components: {
			types,
			card
		}
	}
</script>

<style>
	.list-container {
		padding-top: 50px;
		background-color: #efefef;
	}

	.prod-card {
    padding: 10px;
	}

	.pagination {
		text-align: center;
		padding: 10px 0;
	}
</style>
