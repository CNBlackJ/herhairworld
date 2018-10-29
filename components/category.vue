<template>
	<div class="category-container">
		<el-row>
			<el-col
				v-for="category in categories"
				:key="category.id"
				:span="12">
				<div>
					<vue-flip
						v-if="category.name !== 'All'"
						:active-click="true"
						width="100%" 
						height="200px">
						<div slot="front">
							<img :src="category.img" class="category-image">
						</div>
						<div slot="back">
							<div class="sub-categories">
								<span
									@click="goList(category._id)"
									v-for="item in 3"
									:key="item">
									<i class="el-icon-arrow-right"></i>
									sub-category-{{item}}
								</span>
							</div>
						</div>
					</vue-flip>
					<div
						v-if="category.name !== 'All'"
						class="category-title">
						<span>{{category.name}}</span>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex'
	import category from '@/apis/category'

	import VueFlip from 'vue-flip'

	export default {
		computed: {
			...mapState({
				categories: state => state.home.categories
			}),
			...mapGetters({
        isShowCategories: 'home/isShowCategories'
			}),
		},
		components: {
			'vue-flip': VueFlip
		},
		created () {
			this.$store.dispatch('home/setCategories')
		},
		methods: {
			goList (activateCat) {
				this.$store.commit('home/SET_ACTIVATE_CAT', activateCat)
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
		width: auto;
		height: auto;
		max-width: 100%;
		max-height: 100%;	
		border: 1px solid #cacaca;
	}

	.category-title {
		padding: 5px;
		width: 100%;
		text-align: center;
		font-size: 70%;
	}

	.sub-categories {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 200px;
		background-color: #eeeeee;
	}	

	.sub-categories span {
		padding: 5px;
	}
</style>