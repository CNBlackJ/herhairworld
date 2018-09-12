<template>
	<div class="cart-card-container">
		<el-row>
			<el-col :xs="2">
				<div class="cc-checkbox-con">
					<input type="checkbox">
				</div>
			</el-col>
			<el-col :xs="6">
				<div class="cart-card-img-con">
					<img class="cart-card-img" :src="cartProd.mainImg">
				</div>
			</el-col>
			<el-col :xs="16" style="padding-left: 10px;">
				<div class="cc-rigth">
					<div class="cc-name">
						{{cartProd.name}}
					</div>
					<div class="cc-detail">
						<div class="cc-parameters">
							10inch / natural color / 1Pcs
						</div>
					</div>
					<div class="cc-price">
						${{cartProd.price}}
					</div>
					<div class="cc-counter">
						<div>
							<el-input-number
								v-model="counter"
								@change="handleChange"
								size="mini"
								:min="1" 
								:max="10">
							</el-input-number>
						</div>
						<div>
							<i class="el-icon-close"></i>
						</div>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		props: [
			'cartProd'
		],
		data () {
			return {
				counter: 1
			}
		},
    methods: {
      handleChange(value) {
        console.log(value);
      }
    }
	}	
</script>

<style>
	.cart-card-container {
		padding: 10px;
		background-color: white;
		border-radius: 15px;
	}

	.cc-checkbox-con {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 80px;
	}

	.cart-card-img-con {
		width: 80px;
		height: 80px;
	}

	.cart-card-img {
		width: auto;
		height: auto;
		max-width: 100%;
		max-height: 100%;
	}

	.cc-right {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}

	.cc-name {
		font-size: 15px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.cc-detail {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 5px 0;
	}

	.cc-parameters {
		font-size: 12px;
		color: #808080;
	}

	.cc-price {
		font-size: 15px;
		color: #dd127b;
	}

	.cc-counter {
		padding: 5px 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
</style>