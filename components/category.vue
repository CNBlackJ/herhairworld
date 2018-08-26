<template>
	<div class="category-container">
		<el-row>
			<el-col :span="6" v-for="c in categories" :key="c.id">
				<div class="category-card">
					<img :src="'https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/' + c.img" class="image">
					<div class="category-title">
						<span>{{c.title}}</span>
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
					{
						id: 1,
						img: 'list_1.jpg',
						title: 'Frontal'
					},
					{
						id: 2,
						img: 'list_2.jpg',
						title: 'Closure'
					},
					{
						id: 3,
						img: 'list_3.jpg',
						title: 'Lace Wigs'
					},
					{
						id: 4,
						img: 'list_4.jpg',
						title: 'Hair Extension'
					}
				]
			}
		}
	}
</script>

<style>
	.category-container {
		padding: 0 10px;
	}

	.image {
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