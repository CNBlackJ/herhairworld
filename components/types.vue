<template>
	<div class="type-bar">
		<div
			@click="choice()"
			:class="{'type-btn-click': !activateCat }">
			<a class="type-btn">
				All
			</a>
		</div>
		<div
			v-for="cat in categories"
			:key="cat._id"
			@click="choice(cat._id)"
			:class="{'type-btn-click': cat._id === activateCat}">
			<a class="type-btn">
				{{cat.name}}
			</a>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'

	import category from '@/apis/category'

	export default {
		computed: mapState({
			categories: state => state.home.categories,
			activateCat: state => state.home.activateCat
		}),
    methods: {
      choice (categoryId) {
				this.$store.commit('home/SET_ACTIVATE_CAT', categoryId)
				this.$store.dispatch('list/setProductList')
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