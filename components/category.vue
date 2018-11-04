<template>
	<div class="category-container">
		<el-row>
			<el-col :span="12">
				<el-row>
					<el-col :span="12">
						<div class="img-con">
							<img :src="baseUrl + imgs[0]" class="category-image">
						</div>
					</el-col>
					<el-col :span="12">
						<div class="img-con">
							<img :src="baseUrl + imgs[1]" class="category-image">
						</div>
					</el-col>
				</el-row>
			</el-col>
			<el-col :span="12">
				<el-row>
					<el-col :span="24">
						<div class="img-con">
							<img :src="baseUrl + imgs[2]" class="category-image">
						</div>
					</el-col>

					<el-col :span="12">
						<div class="img-con img-small">
							<img :src="baseUrl + imgs[3]" class="category-image">
						</div>
					</el-col>
					<el-col :span="12">
						<div class="img-con img-small">
							<img :src="baseUrl + imgs[4]" class="category-image">
						</div>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				baseUrl: 'https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/categories/',
				imgs: [
					'01.jpg',
					'02.jpg',
					'03.jpg',
					'04.jpg',
					'05.jpg'
				]
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