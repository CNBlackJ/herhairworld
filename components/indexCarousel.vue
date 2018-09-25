<template>
	<div class="index-carousel">
		<div class="block">
			<el-carousel height="170px">
				<el-carousel-item
					v-for="item in banner"
					:key="item._id">
					<img class="carousel-img"
						:src="item.img">
				</el-carousel-item>
			</el-carousel>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		computed: mapState({
			banner: state => state.home.pageConfig.index.banner
		}),
		created () {
			this.$store.dispatch('home/setPageConfig')
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

	.carousel-img {
		width: 100%;
	}
</style>