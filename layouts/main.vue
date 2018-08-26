<template>
	<div>
		<navbar></navbar>
		<nuxt/>
		<cusFooter></cusFooter>
	</div>
</template>

<script>
	import navbar from '@/components/navbar'
	import footer from '@/components/footer'
	
	export default {
		components: {
			navbar,
			cusFooter: footer 
    },
	}
</script>

<style>
body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,input,button,textarea,p,blockquote,th,td,form,legend{margin:0; padding:0; -webkit-tap-highlight-color:rgba(0,0,0,0)}

body {
	font-size: 17px;
	font-family: 'Helvetica Neue', Helvetica, sans-serif
}
</style>