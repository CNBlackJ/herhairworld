<template>
	<div class="admin-layout-con">
		<div class="sidebar">
			<sidebar></sidebar>
		</div>
		<div class="main">
			<div class="navbar">
				<navbar></navbar>
			</div>

			<div class="main-body">
				<nuxt/>
			</div>

			<div class="footer">
				<adminFooter></adminFooter>
			</div>
		</div>
	</div>
</template>

<script>
	import navbar from '@/components/admin/navbar'
	import sidebar from '@/components/admin/sidebar'
	import footer from '@/components/admin/footer'
	
	export default {
		components: {
			navbar,
			sidebar,
			adminFooter: footer
		}
	}
</script>

<style>
body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,input,button,textarea,p,blockquote,th,td,form,legend{margin:0; padding:0; -webkit-tap-highlight-color:rgba(0,0,0,0)}

body {
	font-size: 17px;
	font-family: 'Helvetica Neue', Helvetica, sans-serif;
	background-color: #efefef;
}

a {
	text-decoration: none;
	color: inherit;
}

.admin-layout-con {
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: space-between;
}

.sidebar {
	width: 15%;
}

.main {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
}

.navbar {
	width: 100%;
	padding-bottom: 30px;
}

.main-body {
	padding: 10px;
	width: 95%;
	background-color: white;
}

</style>