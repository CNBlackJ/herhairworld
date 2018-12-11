<template>
	<div class="wholesale-container">
		<div class="wholesale-head">
			<img src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/about_head.jpg" alt="">
		</div>
		<section id="contact" class="contatc-section">
			<div class="wholesale-contact">
				<el-row>
					<div class="contact-head">Contact Us Now</div>
				</el-row>
				<el-row type="flex" justify="cenetr" align="middle">
					<el-col :span="2">
						<img src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/contact_phone.jpg" alt="">
					</el-col>
					<el-col :span="20">Whatsapp / Imessage: 008613416209411</el-col>
				</el-row>
				<el-row>
					<el-col :span="2">
							<img src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/contact_email.jpg" alt="">
					</el-col>
					<el-col :span="20">Email: info@herhairworld.com</el-col>
				</el-row>
			</div>
		</section>
		<div class="wholesale-or">OR</div>
		<section id="inquiry" class="wholesale-inquiry">
			<el-row>
				<div class="inquiry-desc">
					Send an inquiry and we will contact you within 24 hours
				</div>
			</el-row>
			<el-row>
				<img src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/about_inquiry.jpg" alt="">
			</el-row>
			<div class="wholesale-form">
				<inquiryForm></inquiryForm>
			</div>
		</section>
		<section id="aboutus">
			<div class="section-head">ABOUT US</div>
			<el-row>
				<img class="section-angle" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/about_angle.jpg" alt="">
			</el-row>
			<p class="aboutus-content"><b>HerHairWorld Co.,LTD</b> the reliable and professional hair factory located
				in China. Now China is the biggest country export the human hair to 
				USA and other coutries. You can enjoy the high quality human hair with
				factory directly prices. We insist on the spirit of the honest,creation and 
				development and the principle of <span style="color:#dd127b">"Your Business is Our Business"</span>.</p>
			<img class="aboutus-img" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/aboutus.jpg" alt="">
		</section>
		<section id="chooseus">
			<div class="section-head">WHY CHOOSE US</div>
			<el-row type="flex" justify="cenetr" align="middle">
				<img class="section-angle" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/about_angle.jpg" alt="">
			</el-row>
			<whyChooseUs></whyChooseUs>
			<social></social>
		</section>
	</div>
</template>

<script>
	import whyChooseUs from '@/components/whyChooseUs'
	import social from '@/components/social'
	import inquiryForm from '@/components/inquiryForm'

	export default {
		layout: 'mainWithInquiry',
		components: {
			whyChooseUs,
			social,
			inquiryForm
		},
		mounted () {
			this.goAnchor(this.$route.hash)
		},
		methods: {
			goAnchor (selector) {
				const options = {
					easing: 'ease-in-out',
					offset: -50
				}
				this.$nextTick(() => {
          this.$scrollTo(selector, 1000, options)
        })
			}
		}
	}
</script>

<style>
	.wholesale-container {
		padding-top: 48px;
	}

	.wholesale-head {
		width: 100%;
	}

	.wholesale-head img {
		max-width: 100%;
	}

	.contatc-section {
		padding: 15px;
	}

	.wholesale-contact {
		color: #dd127b;
	}

	.wholesale-contact .contact-head {
		text-align: center;
		font-size: 16px;
		font-weight: bold;
	}

	.wholesale-contact .el-row {
		text-align: left;
		font-size: 14px;
		border-bottom: 1px dashed black;
		padding: 5px 0;
	}

	.wholesale-contact img {
		width: auto;
		max-width: 100%;
		width: 20px;
	}

	.wholesale-or {
		text-align: center;
		font-size: 24px;
		color: #dd127b;
		padding-bottom: 15px;
	}

	.inquiry-desc {
		text-align: center;
		padding: 0 20px 20px 20px;
		font-size: 18px;
	}

	.wholesale-inquiry img {
		width: auto;
		max-width: 100%;
		padding-bottom: 20px;
	}

	.section-head {
		text-align: center;
	}

	.section-angle {
		width: auto;
		max-width: 100%;
	}

	.aboutus-content {
		font-size: 12px;
		padding: 5px 10px;
	}

	.aboutus-img {
		width: auto;
		max-width: 100%;
	}

	.wholesale-form {
		padding: 10px;
	}

</style>