<template>
	<div class="float-btns-container">
		<div
			class="float-left-con"
			@click="inquiry">
			<div class="float-btn-left">
				<div class="float-btn-text">
					wholesale inquiry
				</div>
			</div>
		</div>

		<div class="float-right-con">
			<div
				class="float-btn-right"
				@click="chatNow">
				<div class="float-btn-text chat-now">
					<img class="chat-img" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/chat.png">
					<div>
						chat now
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				mobile: '13631146428'
			}
		},
		methods: {
			chatNow () {
				window.location.href = `sms:${this.mobile}`
			},
			inquiry () {
				this.$router.push({ path: '/inquiry' })
			}
		}
	}
</script>

<style>
	.float-btns-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		text-transform: uppercase;
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: #efefef;
		padding: 10px 0;
	}

	.float-left-con {
		width: 50%;
		padding: 0 10px;
	}

	.float-btn-left {
		background-color: #dd127b;
		color: white;
		width: 100%;
		border-radius: 5px;
	}

	.float-right-con {
		width: 50%;
		padding: 0 10px;
	}

	.float-btn-right {
		background-color: #e6e3e5;
		width: 100%;
		border-radius: 5px;
	}

	.float-btn-text {
		font-size: 14px;
		text-align: center;
		padding: 15px 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.chat-img {
		width: 18px;
		height: 18px;
		padding-right: 5px;
	}
</style>