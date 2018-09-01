<template>
	<div class="inquiry-container">
		<div class="inquiry-top" @click="cancelInquiry">
		</div>
		<div class="inquiry-content">
			<div class="inquiry-title">
				Leave your message, 
				<br>
				we will contact with you
			</div>
			<div class="inquiry-group">
				<div class="inquiry-form">
					<div class="inquiry-form-label">First Name :</div>
					<el-input
						class="inquiry-input"
						v-model="inquiryInfo.firstName"
						placeholder="Your first name"
						size="small"
						clearable
					></el-input>
				</div>
				<div class="inquiry-form">
					<div class="inquiry-form-label">Last Name :</div>
					<el-input
					 class="inquiry-input"
					 v-model="inquiryInfo.lastName"
					 placeholder="Your last name"
					 size="small"
					 clearable
					></el-input>
				</div>
				<div class="inquiry-form">
					<div class="inquiry-form-label">Email :</div>
					<el-input
						class="inquiry-input"
						v-model="inquiryInfo.email"
						placeholder="Your e-mail"
						size="small"
						clearable
					></el-input>
				</div>
				<div class="inquiry-form">
					<div class="inquiry-form-label">Country :</div>
					<el-input 
						class="inquiry-input"
						v-model="inquiryInfo.country"
						placeholder="Your Country"
						size="small"
						clearable
					></el-input>
				</div>
				<div class="inquiry-form">
					<div class="inquiry-form-label">Tel Number :</div>
					<el-input 
						class="inquiry-input"
						v-model="inquiryInfo.phoneNum"
						placeholder="Your tel number"
						size="small"
						clearable
					></el-input>
				</div>
				<div class="inquiry-form">
					<div class="inquiry-form-label">Facetime & iMessage :</div>
					<el-input
						class="inquiry-input"
						v-model="inquiryInfo.iMessage"
						placeholder="Your Facetime or iMessage id"
						size="small"
						clearable
					></el-input>
				</div>
				<div class="inquiry-form">
					<div class="inquiry-form-label">Whatsapp :</div>
					<el-input
						class="inquiry-input"
						v-model="inquiryInfo.whatsApp" 
						placeholder="Your Whatsapp id"
						size="small"
						clearable
					></el-input>
				</div>
				<div class="inquiry-form">
					<div class="inquiry-form-label">Content :</div>
					<el-input 
						class="inquiry-input" 
						type="textarea" 
						:rows="3" 
						v-model="inquiryInfo.content" 
						placeholder="Your message"
					></el-input>
				</div>
			</div>

			<div class="inquiry-btns">
				<div class="inquiry-cancel" @click="cancelInquiry">
					CANCEL
				</div>
				<div class="inquiry-submit" @click="addInquiry">
					SEND
				</div>
			</div>
		</div>
		<div class="inquiry-bottom" @click="cancelInquiry">
		</div>
	</div>
</template>

<script>
	import inquiry from '@/apis'

	import store from '@/store'

	export default {
		store,
		data () {
			return {
				inquiryInfo: {
					firstName: '',
					lastName: '',
					email: '',
					country: '',
					phoneNum: '',
					iMessage: '',
					whatsApp: '',
					content: ''
				}
			}
		},
		fetch ({ store }) {
			store.commit('setIsInquiry')
		},
		methods: {
			async addInquiry () {
				inquiry.create({ inquiry: this.inquiryInfo }).then((resp) => {
					if (resp.status === "OK") this.cancelInquiry()
				})
			},
			cancelInquiry () {
				this.$emit('updateInquiry', false)
			}
		}
	}
</script>

<style>
	.inquiry-container {
		z-index: 5;
		position: fixed;
		top: 0;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.inquiry-top {
		height: 100%;
		width: 100%;
		background-color: #efefef;
		opacity: .5;
	}

	.inquiry-content {
		height: 100%;
		width: 100%;
		background-color: white;
		opacity: none;
		border-radius: 5px;
	}

	.inquiry-title {
		text-align: center;
		padding: 20px;
		border-bottom: 1px solid #efefef;
	}

	.inquiry-group {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		font-size: 14px;
		padding: 15px 0;
	}

	.inquiry-form {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		justify-content: space-between;
		padding: 8px;
	}

	.inquiry-form-label {
		width: 25%;
		padding-right: 15px;
		text-align: right;
	}

	.inquiry-input {
		width: 70%;
		margin-right: 10px;
	}

	.inquiry-btns {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		border-top: 1px solid #efefef;
		padding: 10px 0;
	}

	.inquiry-submit {
		padding: 10px;
		background-color: #dd127b;
		border-color: #dd127b;
		border-radius: 5px;
		margin-left: 5px;
	}

	.inquiry-cancel {
		padding: 10px;
		background-color: #6c757d;
		border-color: #6c757d;
		border-radius: 5px;	
		margin-right: 5px;
	}

	.inquiry-bottom {
		height: 100%;
		width: 100%;
		background-color: #efefef;
		opacity: .5;
	}

</style>