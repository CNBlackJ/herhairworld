<template>
	<div class="category-container">
		<el-row>
			<el-col
				:span="6"
				v-for="category in categories"
				:key="category.id">
				<div
					v-if="category.name !== 'All'"
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
	import { mapState } from 'vuex'
	import category from '@/apis/category'

	export default {
		computed: mapState({
			categories: state => state.home.categories
		}),
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