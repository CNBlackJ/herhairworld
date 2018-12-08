<template>
	<div :class="{'footer-fixed': fixedFooter}" class="footer-container">
		<el-row class="social-con">
			<el-col :span="2" :offset="8">
				<img class="foot-img" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/footer_Instagram.png">
			</el-col>
			<el-col :span="2" :offset="1">
				<img class="foot-img" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/footer_fb.png">
			</el-col>
			<el-col :span="2" :offset="1">
				<img class="foot-img" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/footer_youtube.png">
			</el-col>
		</el-row>
		<div class="footer-center">
			<el-row class="links">
				<el-col
					class="link"
					:span="12"
					v-for="link in links"
					:key="link.id">
					{{link.title}}
				</el-col>
			</el-row>
		</div>
		<el-row class="footer-support" type="flex" justify="start" align="middle" :gutter="10">
			<el-col :span="3" :offset="6">
				<img class="foot-img" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/footer_paypal.png">
			</el-col>
			<el-col :span="3">
				<img class="foot-img" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/footer_western_unnion.png">
			</el-col>
			<el-col :span="3">
				<img class="foot-img" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/footer_master.png">
			</el-col>
			<el-col :span="3">
				<img class="foot-img" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/footer_visa.png">
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
				links: [
					{ id: 1, title: 'Contact Us', url: '/about#contact' },
					{ id: 2, title: 'About Us', url: '/about#aboutus' },
					{ id: 3, title: 'Why Choose Us', url: '/about#chooseus' },
					{ id: 4, title: 'Return & Exchange', url: '' },
					{ id: 5, title: 'News', url: '' },
					{ id: 6, title: 'Home', url: '/' }
				]
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