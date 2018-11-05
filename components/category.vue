<template>
	<div class="category-container">
		<el-row>
			<el-col :span="12">
				<el-row>
					<el-col :span="12">
						<div class="img-con" @click="goList(0)">
							<img :src="categories[0] ? categories[0].img : ''" class="category-image">
						</div>
					</el-col>
					<el-col :span="12">
						<div class="img-con" @click="goList(1)">
							<img :src="categories[1] ? categories[1].img : ''" class="category-image">
						</div>
					</el-col>
				</el-row>
			</el-col>
			<el-col :span="12">
				<el-row>
					<el-col :span="24">
						<div class="img-con" @click="goList(2)">
							<img :src="categories[2] ? categories[2].img : ''" class="category-image">
						</div>
					</el-col>

					<el-col :span="12">
						<div class="img-con img-small" @click="goList(3)">
							<img :src="categories[3] ? categories[3].img : ''" class="category-image">
						</div>
					</el-col>
					<el-col :span="12">
						<div class="img-con img-small" @click="goList(4)">
							<img :src="categories[4] ? categories[4].img : ''" class="category-image">
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
				categories: state => state.home.pageConfig.index.categories
			})
		},
		methods: {
			goList (index) {
				const category = this.categories.find(ele => ele.index == index)
				this.$store.commit('home/SET_ACTIVATE_CAT', category.url)
				this.$router.push({ path: '/list' })
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