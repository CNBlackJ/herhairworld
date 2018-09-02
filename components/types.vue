<template>
	<div class="type-bar">
		<div
			v-for="item in columns"
			:key="item.key"
			@click="choice(item)"
			:class="{'type-btn-click': item.key === clcikType}">
			<a class="type-btn">
				{{item.name}}
			</a>
		</div>
	</div>
</template>

<script>

	export default {
		props: [
			'activeType'
		],
		data () {
			return {
				columns: [
					{ _id: 1, key: 'all', name: 'All' },
					{ _id: 2, key: 'frontal', name: 'Frontal' },
					{ _id: 3, key: 'closure', name: 'Closure' },
					{ _id: 4, key: 'lace_wigs', name: 'Lace Wigs' },
					{ _id: 5, key: 'hair_extension', name: 'Hair Extension' }
				],
				clcikType: this.activeType
			}
		},
    methods: {
      choice ({ _id, key, name }) {
        this.clcikType = key
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