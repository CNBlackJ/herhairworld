<template>
	<div>
		<div class="index-btn-container">
			<div class="index-btn">
				<span>{{title}}</span>
			</div>
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
	.index-btn-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0 10%;
	}

	.index-btn {
		padding: 10px 20px;
		background-color: #dd127b;
		color: white;
		text-transform: uppercase;
		text-align: center;
		border-radius: 2%;
		width: 100%;
		font-size: 80%;
	}
</style>