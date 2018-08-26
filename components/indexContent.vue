<template>
	<div class="title-container">
		<div class="line-left">
			<hr>
		</div>
		<div class="title">{{title}}</div>
		<div class="line-right">
			<hr>
		</div>
	</div>
</template>

<script>
	export default {
		props: [
			'title'
		]
	}
</script>

<style>
	.title-container {
		display: flex;
		flex-direction: row;
		width: 100%;
		align-items: center;
		padding: 20px 0;
	}
	
	.title {
		text-transform: uppercase;
		width: 100%;
		text-align: center;
		padding: 0 10px;
	}

	.line-left {
		width: 30%;
	}
	
	.line-right {
		width: 30%;
	}
</style>