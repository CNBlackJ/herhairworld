<template>
	<div class="category-container">
		<el-row>
			<el-col
				:span="6"
				v-for="category in categories"
				:key="category.id">
				<div
					class="category-card"
					@click="goList(category._id)">
					<img :src="category.img" class="category-image">
					<div class="category-title">
						<span>{{category.name}}</span>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import category from '@/apis/category'

	export default {
		data () {
			return {
				categories: []
			}
		},
		created () {
			this.listCategory()
		},
		methods: {
			listCategory () {
				category.list({}).then((resp) => {
					this.categories = resp.data
				}).catch(err => {
					console.log()
				})
			},
			goList (activeType) {
				this.$router.push({ path: '/list' })
			}
		}
	}
</script>

<style>
	.category-container {
		padding: 0 10px;
	}

	.category-image {
		width: 100%;
		display: block;
		border: 1px solid #cacaca;
	}

	.category-card {
		padding: 0 5px;
	}

	.category-title {
		padding: 5px;
		width: 100%;
		text-align: center;
		font-size: 70%;
	}
</style>