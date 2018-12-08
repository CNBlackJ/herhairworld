<template>
	<div class="index-carousel">
		<div class="block">
			<el-carousel :height="carouselHeigth">
				<el-carousel-item
					v-for="item in banner"
					:key="item._id">
					<img
						@click="redirectTo(item.path)"
						class="carousel-img"
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
			// 监听窗口大小变化
			window.addEventListener('resize', this.handleResize)
			this.handleResize()

			this.$store.dispatch('home/setPageConfig')
		},
		destroyed () {
			window.removeEventListener('resize', this.handleResize)
		},
		data () {
			return {
				carouselHeigth: ''
			}
		},
		methods: {
			redirectTo (path) {
				this.$router.push({ path })
			},
			handleResize() {
				const windowWidth = window.innerWidth / 2
				this.carouselHeigth = `${windowWidth}px`
			},
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