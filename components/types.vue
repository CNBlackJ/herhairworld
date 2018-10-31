<template>
	<div class="type-bar">
		<no-ssr>
			<ly-tab
				v-model="selectedId"
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
				selectedId: 0,
				options: {
					activeColor: '#dd127b',
					labelKey: 'name'
				},
			}
		},
		created () {
			this.selectedId = this.activateCatId
		},
    methods: {
      choice (category) {
				const { _id, name} = category
				this.$store.commit('home/SET_ACTIVATE_CAT', name.toLowerCase() !== 'all' ? _id : '')
				this.$store.dispatch('list/setProductList', { limit: 100 })
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