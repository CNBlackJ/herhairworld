<template>
	<div class="type-bar">
		<div
			v-for="item in categories"
			:key="item._id"
			@click="choice(item._id)"
			:class="{'type-btn-click': item._id === ($store.state.selectedCart || '5b8b3ec925890f283385d085') }">
			<a class="type-btn">
				{{item.name}}
			</a>
		</div>
	</div>
</template>

<script>
	import category from '@/apis/category'

	export default {
		data () {
			return {
				categories: [],
			}
		},
		created () {
			this.listCategory()
		},
    methods: {
			listCategory () {
				category.list({}).then((resp) => {
					const categories = resp.data
					categories.unshift({ _id: '5b8b3ec925890f283385d085', name: 'All' })
					this.categories = categories
				}).catch(err => {
					console.log(err)
				})
			},
      choice (categoryId) {
				this.$store.dispatch('setselectedCart', { categoryId })
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