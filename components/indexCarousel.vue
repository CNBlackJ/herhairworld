<template>
	<div class="index-carousel">
		<div class="block">
			<el-carousel height="170px">
				<el-carousel-item v-for="item in 4" :key="item">
					<img class="imgs" src='https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/banner.jpg'>
				</el-carousel-item>
			</el-carousel>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {}
		}
	}
</script>

<style>
	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 150px;
		margin: 0;
	}

	.el-carousel__item:nth-child(2n) {
		/* background-color: #99a9bf; */
	}
	
	.el-carousel__item:nth-child(2n+1) {
		/* background-color: #d3dce6; */
	}

	.imgs {
		height: 170px;
		width: 100%;
	}
</style>