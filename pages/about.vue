<template>
	<div class="about-container">
		<div class="about-head">ABOUT HERHAIRWORLD</div>
		<p class="about-content">
			<b>HerHairWorld Co.,LTD</b> the reliable and professional hair factory locatedin China. 
			Now China is the biggest country export the human hair to USA and other coutries. 
			You can enjoy the high quality human hair withfactory directly prices. 
			We insist on the spirit of the honest,creation and development and the principle of 
			<span style="color: #dd127b">"Your Business is Our Business"</span>.
		</p>
		<img class="about-img" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/aboutus.jpg" alt="">

		<div class="about-head">OUR FACTORY</div>
		<p class="about-content">
			Being one of the Top Manufacturers of Human Hair Products,
			our factory specializesin all kinds of human hair. We own a set of sophisticated 
			and mature production line and professional technicians.
		</p>
		<img class="about-img" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/aboutus.jpg" alt="">

		<inquiryForm></inquiryForm>
	</div>
</template>

<script>
	import inquiryForm from '@/components/inquiryForm'

	export default {
		layout: 'main',
		components: {
			inquiryForm
		}
	}
</script>

<style>
	.about-container {
		padding: 0 10px;
		padding-top: 48px;
	}
	.about-head {
		padding: 10px 0;
		color: #dd127b;
	}

	.about-content {
		font-size: 14px;
	}

	.about-img {
		width: auto;
		max-width: 100%;
	}
</style>