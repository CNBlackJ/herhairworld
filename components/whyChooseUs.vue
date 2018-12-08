<template>
	<div>
		<div class="choose-container">
			<div class="choose-img-container" v-for="c in choices" :key="c.id">
				<img class="choose-img" :src="'https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/' + c.img"/>
			</div>
		</div>
		<div class="choose-container">
			<div class="choose-img-container" v-for="c in choices" :key="c.id">
				<div class="choose-title">{{c.title}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				choices: [
          { id: 1, title: 'Hugu Profit', img: 'why_choose_us_1.jpg' },
          { id: 2, title: 'High Quality', img: 'why_choose_us_2.jpg' },
          { id: 3, title: 'Fast Shipment', img: 'why_choose_us_3.jpg' },
          { id: 4, title: 'Branding', img: 'why_choose_us_4.jpg' }
        ]
			}
		}
	}
</script>

<style>
	.choose-container {
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }

  .choose-img-container {
    padding: 0 5px;
    width: 20%;
  }

  .choose-img {
    border-radius: 50%;
    width: 100%;
  }

  .choose-title {
    font-size: 70%;
    text-align: center;
  }
</style>