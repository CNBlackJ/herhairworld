<template>
	<div class="footer-container" :class="{'footer-fixed': fixedFooter}">
		<el-row class="links">
			<el-col class="link" :span="12" v-for="link in links" :key="link.id">
				{{link.title}}
			</el-col>
		</el-row>
		<div class="infos">
			HerHairWorld.com © All Rights Reserved.
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				fixedFooter: false,
				links: [
					{ id: 1, title: 'Contact Us', url: '' },
					{ id: 2, title: 'About Us', url: '' },
					{ id: 3, title: 'Why Choose Us', url: '' },
					{ id: 4, title: 'Return & Exchange', url: '' },
					{ id: 5, title: 'News', url: '' },
					{ id: 6, title: 'Home', url: '' }
				]
			}
		}
	}
</script>

<style>
	.footer-container {
		width: 100%;
		background-color: #dd127b;
		color: white;
		font-size: 80%;
	}

	.footer-fixed {
		position: fixed;
		bottom: 0;
	}

	.links {
		padding: 10px 20px;
	}

	.link {
		padding: 5px 0;
	}

	.infos {
		border-top: 1px solid white;
		text-align: center;
		padding: 10px 0;
	}
</style>