<template>
	<div class="wholesale-inquiry">
		<div class="wi-header">
			<i class="el-icon-arrow-left"></i>
			wholesale inquiry
		</div>

		<div class="wi-form">
			<div class="wi-description">
				Join us! Accessiong factory direct prices and exciting business solution.
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		layout: 'main',
		data () {
			return {
				desc: 'join'
			}
		}
	}
</script>

<style>
	.wholesale-inquiry {
		padding-top: 50px;
	}

	.wi-header {
		text-transform: capitalize;
		background-color: #efefef;
		font-size: 18px;
		padding: 10px 5px;
	}

	.wi-form {
		padding: 10px 20px;
	}



</style>