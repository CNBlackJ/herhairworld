<template>
	<div class="about-container">
		<div class="about-head">
			<img src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/about_head.jpg" alt="">
		</div>
		<section id="contact" class="contatc-section">
			<div class="about-contact">
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
		<div class="about-or">OR</div>
		<section id="inquiry" class="about-inquiry">
			<el-row>
				<div class="inquiry-desc">
					Send an inquiry and we will contact you within 24 hours
				</div>
			</el-row>
			<el-row>
				<img src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/about_inquiry.jpg" alt="">
			</el-row>
			<div class="about-form">
				<inquiryForm></inquiryForm>
			</div>
		</section>
		<section id="aboutus">
			<div class="section-head">ABOUT US</div>
			<el-row>
				<el-col :span="11"><hr></el-col>
				<el-col class="section-icon" :span="2">
					<i class="el-icon-caret-bottom"></i>
				</el-col>
				<el-col :span="11"><hr></el-col>
			</el-row>
			<p class="aboutus-content">Not checking certificates means that you cannot be certain of the identity of the other party and so might be subject to a spoofed host. Even if you do not check certificates, however, you still get encrypted communication that cannot be (easily) spied on. So adding this line does not "remove the security" of SSL nor, as another commenter said "disable[] the entire benefit of SSL".</p>
			<img class="aboutus-img" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/aboutus.jpg" alt="">
		</section>
		<section id="chooseus">
			<div class="section-head">WHY CHOOSE US</div>
			<el-row type="flex" justify="cenetr" align="middle">
				<el-col :span="11"><hr></el-col>
				<el-col class="section-icon" :span="2">
					<i class="el-icon-caret-bottom"></i>
				</el-col>
				<el-col :span="11"><hr></el-col>
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
				// const anchor = this.$el.querySelector(selector)
				// document.documentElement.scrollTop = anchor.offsetTop - 50
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
	.about-container {
		padding-top: 48px;
	}

	.about-head {
		width: 100%;
	}

	.about-head img {
		max-width: 100%;
	}

	.contatc-section {
		padding: 15px;
	}

	.about-contact {
		color: #dd127b;
	}

	.about-contact .contact-head {
		text-align: center;
		font-size: 16px;
		font-weight: bold;
	}

	.about-contact .el-row {
		text-align: left;
		font-size: 14px;
		border-bottom: 1px dashed black;
		padding: 5px 0;
	}

	.about-contact img {
		width: auto;
		max-width: 100%;
		width: 20px;
	}

	.about-or {
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

	.about-inquiry img {
		width: auto;
		max-width: 100%;
		padding-bottom: 20px;
	}

	.section-head {
		text-align: center;
	}

	.section-icon {
		text-align: center;
		font-size: 30px;
		margin-top: -8px;
	}

	.aboutus-content {
		font-size: 12px;
		padding: 5px 10px;
	}

	.aboutus-img {
		width: auto;
		max-width: 100%;
	}

	.about-form {
		padding: 10px;
	}

</style>