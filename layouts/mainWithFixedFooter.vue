<template>
	<div>
		<navbar v-on:clickBtn="handleClick"></navbar>
		<sidebar
			v-show="!isCloseMenu"
			v-on:closeSidebar="closeSidebar">
		</sidebar>
		<nuxt/>
		<div class="fixed-footer">
			<cusFooter></cusFooter>
		</div>
	</div>
</template>

<script>
	import navbar from '@/components/navbar'
	import sidebar from '@/components/sidebar'
	import footer from '@/components/footer'

	export default {
		components: {
			navbar,
			sidebar,
			cusFooter: footer
		},
		data () {
			return {
				isCloseMenu: true
			}
		},
		methods: {
			handleClick ({ btn }) {
				if (btn === 'menu') this.isCloseMenu = false
			},
			closeSidebar () {
				this.isCloseMenu = true
			}
		}
	}
</script>

<style>
	body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,input,button,textarea,p,blockquote,th,td,form,legend{margin:0; padding:0; -webkit-tap-highlight-color:rgba(0,0,0,0)}

	body {
		font-size: 17px;
		font-family: 'Helvetica Neue', Helvetica, sans-serif
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	input:focus {
		outline: none;
	}

	.fixed-footer {
		position: fixed;
		bottom: 0;
	}
</style>