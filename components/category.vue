<template>
	<div class="category-container">
		<el-row>
			<el-col :span="12">
				<el-row>
					<el-col :span="12">
						<div class="img-con" @click="goList(0)">
							<img :src="featuredCategories[0] ? featuredCategories[0].img : ''" class="category-image">
						</div>
					</el-col>
					<el-col :span="12">
						<div class="img-con" @click="goList(1)">
							<img :src="featuredCategories[1] ? featuredCategories[1].img : ''" class="category-image">
						</div>
					</el-col>
				</el-row>
			</el-col>
			<el-col :span="12">
				<el-row>
					<el-col :span="24">
						<div class="img-con" @click="goList(2)">
							<img :src="featuredCategories[2] ? featuredCategories[2].img : ''" class="category-image">
						</div>
					</el-col>

					<el-col :span="12">
						<div class="img-con img-small" @click="goList(3)">
							<img :src="featuredCategories[3] ? featuredCategories[3].img : ''" class="category-image">
						</div>
					</el-col>
					<el-col :span="12">
						<div class="img-con img-small" @click="goList(4)">
							<img :src="featuredCategories[4] ? featuredCategories[4].img : ''" class="category-image">
						</div>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		computed: {
			...mapState({
				featuredCategories: state => state.home.pageConfig.index.categories,
				categories: state => state.home.categories
			})
		},
		methods: {
			goList (index) {
				const featuredCategory = this.featuredCategories.find(ele => ele.index == index)
				const currentId = featuredCategory.url
				const category = this.categories.find(category => String(category._id) === String(currentId))
				this.$router.push({ path: `/list?categoryId=${currentId}&category=${category.name.toLowerCase().split(' ').join('-')}` })
			}
		}
	}
</script>

<style>
	.category-container {
		padding: 0 5px;
	}

	.category-image {
		width: auto;
		height: auto;
		max-width: 100%;
		max-height: 100%;	
	}

	.img-con {
		padding: 0 2px;
	}

	.img-small {
		margin-top: -2px;
	}
</style>