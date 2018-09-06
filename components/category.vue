<template>
	<div class="category-container">
		<el-row>
			<el-col
				:span="6"
				v-for="category in categories"
				:key="category.id"
				@click="goList(category.key)">
				<div class="category-card">
					<img :src="'https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/' + category.img" class="category-image">
					<div class="category-title">
						<span>{{category.title}}</span>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				categories: [
					{ id: 1, img: 'list_1.jpg', title: 'Frontal', key:'frontal' },
					{ id: 2, img: 'list_2.jpg', title: 'Closure', key:'closure' },
					{ id: 3, img: 'list_3.jpg', title: 'Lace Wigs', key:'lace_wigs' },
					{ id: 4, img: 'list_4.jpg', title: 'Hair Extension', key:'hair_extension' }
				]
			}
		},
		methods: {
			goList (activeType) {
				console.log(activeType)
				this.$router.push({ path: `/list?type=${activeType}` })
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