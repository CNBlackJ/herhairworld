<template>
	<div :class="{'footer-fixed': fixedFooter}" class="footer-container">
		<el-row class="social-con">
			<el-col
				v-for="(item, index) in Object.values(socialImgs)"
				:key="index"
				:span="2"
				:offset="index === 0 ? 8 : 1">
				<img
					@click="goLink(item.link)"
					class="foot-img"
					:src="baseUrl + item.img">
			</el-col>
		</el-row>
		<div class="footer-center">
			<el-row class="links">
				<el-col
					class="link"
					:span="12"
					v-for="link in links"
					:key="link.id">
					<span @click="goPage(link)">
						{{link.title}}
					</span>
				</el-col>
			</el-row>
		</div>
		<el-row class="footer-support" type="flex" justify="start" align="middle" :gutter="10">
			<el-col
				v-for="(item, index) in footerImgs"
				:key="index"
				:span="3"
				:offset="index === 0 ? 6 : 0">
				<img
					class="foot-img"
					:src="baseUrl + item">
			</el-col>
		</el-row>
		<el-row>
			<div class="infos">
				HerHairWorld.com © All Rights Reserved.
			</div>
		</el-row>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				fixedFooter: false,
				baseUrl: 'https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/',
				links: [
					{ id: 1, title: 'Contact Us', url: '/wholesale#contact' },
					{ id: 2, title: 'About Us', url: '/about' },
					{ id: 3, title: 'Why Choose Us', url: '/wholesale#chooseus' },
					{ id: 4, title: 'Return & Exchange', url: '/exchange' },
					{ id: 5, title: 'Wholesale', url: '/wholesale#contact' },
					{ id: 6, title: 'Home', url: '/' }
				],
				socialImgs: {
					ins: {
						img: 'footer_Instagram.png',
						link: 'https://www.instagram.com/herhairworld_factory/'
					},
					fb: {
						img: 'footer_fb.png',
						link: 'https://www.facebook.com/herhairworld/'
					},
					youtube: {
						img: 'footer_youtube.png',
						link: 'https://www.youtube.com/channel/UCs5egl2u3CHKxW4mcMRnofA'
					}
				},
				footerImgs: [
					'footer_paypal.png',
					'footer_western_unnion.png',
					'footer_master.png',
					'footer_visa.png'
				]
			}
		},
		methods: {
			goPage ({ url }) {
				this.$router.push({ path: url })
				const eleId = url.split('#')[1]
				if (this.$route.path === '/wholesale' && eleId) {
					const selector = `#${eleId}`
					const options = {
						easing: 'ease-in-out',
						offset: -72
					}
					this.$scrollTo(selector, 1000, options)
				}
			},
			goLink(link) {
				window.location.href = link
			}
		}
	}
</script>

<style>
	.footer-container {
		border-top: 1px dashed #dd127b;
	}

	.footer-center {
		width: 100%;
		background-color: #dd127b;
		color: white;
		font-size: 80%;
	}

	.footer-fixed {
		position: fixed;
		bottom: 0;
	}

	.social-con {
		padding: 5px 0;
	}

	.foot-img {
		width: auto;
		height: auto;
		max-width: 100%;
		max-width: 100%;
	}

	.links {
		padding: 10px 20px;
	}

	.link {
		padding: 5px 0;
	}

	.footer-support {
		padding-top: 3px;
		margin: 0!important;
	}

	.infos {
		border-top: 1px solid white;
		text-align: center;
		font-size: 12px;
		padding-bottom: 5px;
	}
</style>