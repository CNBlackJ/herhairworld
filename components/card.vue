<template>
	<div class="card-container">
		<div class="card-content">
			<div>
				<img class="img-card" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/product_img_1.jpg">
			</div>
	
			<div class="prod-name">
				#1B/99J Superior Grade 1 bundle Brazilian straight Virgin Human hair extensions
			</div>
	
			<div class="prod-price">
				<div class="price">${{price.toFixed(2)}}</div>
				<div class="sales">sales: {{sales}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				price: 53,
				sales: 999
			}
		}
	}
</script>

<style>
	.card-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		font-size: 12px;
		background-color: white;
	}

	.card-content {
		padding: 5px;
	}

	.img-card {
		width: 100%;
	}

	.prod-name {
		color: #818181;
	}

	.prod-price {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		padding: 5px 5px;
	}

	.price {
		color: #dd127b;
	}

	.sales {
		color: #818181;
		padding: 0 5px;
	}
</style>