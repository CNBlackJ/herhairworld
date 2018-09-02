<template>
	<div @click="showDetail(prod._id)">
		<el-card :body-style="{ padding: '0px' }">
			<img src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/product_img_1.jpg" class="image">
			<div class="prod-detail">
				<span class="prod-name">{{prod.name}}</span>
				<div class="prod-bottom">
					<div class="price">
						$ {{prod.price.toFixed(2)}}
					</div>
					<div class="sales">
						sales: {{prod.sales}}
					</div>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script>
	export default {
		props: [
			'prod'
		],
		data () {
			return {
				price: 53,
				sales: 999
			}
		},
		methods: {
			showDetail (id) {
				this.$router.push({ path: `/details?_id=${id}` })
			}
		}
	}
</script>

<style>
  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

	.prod-detail {
		padding: 6px;
		font-size: 13px;
	}

	.prod-name {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.prod-bottom {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 5px 0;
	}

	.price {
		color: #dd127b;
	}

</style>