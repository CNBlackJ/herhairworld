<template>
	<div class="type-bar">
		<no-ssr>
			<ly-tab
				v-model="active"
				v-on:change="choice"
				:items="categories"
				:options="options">
			</ly-tab>
		</no-ssr>
	</div>
</template>

<script>
	import { mapGetters, mapState } from 'vuex'

	import category from '@/apis/category'

	export default {
		computed: {
			...mapGetters({
        activateCatId: 'home/activateCatId'
			}),
			...mapState({
				categories: state => state.home.categories,
				activateCat: state => state.home.activateCat
			})
		},
		data () {
			return {
				options: {
					activeColor: '#dd127b',
					labelKey: 'name'
				},
				active: 0
			}
		},
		created () {
			const { categoryId } = this.$route.query
			this.$store.commit('home/SET_ACTIVATE_CAT', categoryId)
			this.active = this.activateCatId
		},
    methods: {
      async choice (category) {
				const { _id, name } = category
				const { categoryId } = this.$route.query
				this.$store.commit('home/SET_ACTIVATE_CAT', _id)
				await this.$store.dispatch('list/setProductList', { limit: 10 })
				this.$router.push({ path: `/list?categoryId=${_id}&category=${name.toLowerCase().split(' ').join('-')}` })
			}
		}
	}
</script>

<style>
	.type-bar {
		display: flex;
		justify-content: space-between;
		padding: 10px 5px;
		background-color: white;
	}

	.type-btn {
		text-decoration: none;
		font-size: 16px;
	}

	.type-btn-click {
		color: #dd127b;
		box-shadow: inset 0 -3px 0 #dd127b;
	}
</style>