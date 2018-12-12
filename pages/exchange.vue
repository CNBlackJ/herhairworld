<template>
	<div class="exchange-container">
		<div class="exchange-head">Return & Exchange</div>
		<div class="exchange-item">
			<div class="item-title">SHIPPING POLICY</div>
			<div class="item-content">
				<p>
					We normally ship our packages out via DHL or Fedex express. 
					Orders will ship within 1-2 business days of receiving payment. 
					Orders require 3-5 business days for delivery after it ships depending on its destination.
					Once an express shipment is placed please contact HerHairWorld Hair Company to verify we have received your request.
				</p>
				<p>
					HerHairWorld Hair Company is not responsible for any fees (custom fees or taxes) associated with your shipment upon delivery.
				</p>
				<p>
					We do NOT refund shipping charges for orders returned.
				</p>
			</div>
		</div>
		<div class="exchange-item">
			<div class="item-title">RETURN POLICY</div>
			<div class="item-content">
				<p>
					We exercise a very strict quality control process to ensure that our clients receive only the best virgin hair.
					The items must be mailed for return in its original condition.
					We will not accept any merchandise that is not in its original condition.
					The returned item must be unopened, unaltered, unworn, undamaged and all tags and packaging must be included.
					If you want to exchange an item you will need to contact our customer service via email.
					We will not accept any merchandise that has been used or altered (brushed, combed, picked, cut, or washed).
				</p>
				<p>
					Items meeting the above conditions may be exchanged within 7 days of the original receipt. We honor this for up to 7 days after purchase.
				</p>
			</div>
		</div>
		<div class="form-title">
			Please complete the form below to get wholesale prices.
		</div>
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
	.exchange-container {
		padding: 48px 10px 0 10px;
	}

	.exchange-head {
		font-size: 16px;
		border-bottom: 1px solid #ccc;
		padding: 10px 0;
	}

	.exchange-item {
		padding-top: 10px;
	}

	.item-title {
		padding: 5px 0;
		font-size: 18px;
	}

	.item-content {
		font-size: 12px;
	}

	.item-content p {
		padding: 5px 0;
	}

	.form-title {
		font-size: 14px;
		text-align: center;
		padding: 10px;
		border-top: 1px solid #ccc;
	}
</style>