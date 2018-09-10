<template>
	<div class="wholesale-inquiry">
		<div
			class="wi-form-group"
			v-if="!inquirySuccess">
			<div class="wi-header" @click="goHome">
				<i class="el-icon-arrow-left"></i>
				wholesale inquiry
			</div>
			<div class="wi-form">
				<div class="wi-description">
					Join us! Accessiong <strong>factory direct prices</strong> and <strong>exciting business solution</strong>.
				</div>
	
				<el-form
					:model="inquiryInfo"
					:rules="inquiryFormRules"
					ref="inquiryInfo"
					size="small">
					<el-form-item
						v-for="inquiryForm in inquiryFormGroup"
						:key="inquiryForm.id"
						:prop="inquiryForm.tag">
						<div>
							<span class="required-span">*</span>{{inquiryForm.text}}
						</div>
						<el-input
							type="text"
							v-model="inquiryInfo[inquiryForm.tag]">
						</el-input>
					</el-form-item>
					<el-form-item
						prop="country">
						<div>
							<span class="required-span">*</span>Country :
						</div>
						<el-select v-model="inquiryInfo.country" filterable placeholder="please choose">
							<el-option
								v-for="country in countries"
								:key="country.value"
								:label="country.label"
								:value="country.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item
						prop="businessTypes">
						<div>
							<span class="required-span">*</span>Business Type :
						</div>
						<el-row>
							<el-col
								:span="12"
								v-for="businessType in businessTypes"
								:key="businessType.id">
								<el-checkbox-group
									v-model="inquiryInfo.businessTypes">
									<el-checkbox
										:label="businessType.tag">
										{{businessType.text}}
									</el-checkbox>
								</el-checkbox-group>
							</el-col>
						</el-row>
					</el-form-item>
					<el-form-item
						prop="comment">
						<div>
							<span class="required-span">*</span>Comment :
						</div>
						<el-input
							type="textarea"
							:rows="4"
							v-model="inquiryInfo.comment"
							placeholder="Enter anything you would like to know here,such as  the product">
						</el-input>
					</el-form-item>
	
					<el-form-item>
						<div
							class="wi-btn"
							@click="createInquiry('inquiryInfo')">
							Submit
						</div>
					</el-form-item>
				</el-form>
			</div>
		</div>

		<div
			class="wi-success"
			v-if="inquirySuccess">
			<div class="wi-success-content">
				<div class="wi-success-title">
					Thank you!
				</div>
				<div class="wi-success-desc">
					Your inquiry have been received! We’ll get back to you in 24 hours.
				</div>
			</div>

			<recommend></recommend>
		</div>
	</div>
</template>

<script>
	import inquiry from '@/apis/inquiry'

	import recommend from '@/components/recommend'

	export default {
		layout: 'main',
		components: {
			recommend
		},
		data () {
			return {
				inquirySuccess: false,
				countries: [
					{
						value: 'china',
						label: 'China'
					}, {
						value: 'canada',
						label: 'Canada'
					}, {
						value: 'russia',
						label: 'Russia'
					}, {
						value: 'usa',
						label: 'United States of America'
					}, {
						value: 'india',
						label: 'India'
					}
				],
				inquiryInfo: {
					name: '',
					mobile: '',
					email: '',
					country: '',
					businessTypes: [],
					comment: ''
				},
				inquiryFormGroup: [
					{ id: 1, text: 'Name :', tag: 'name' },
					{ id: 2, text: 'Phone :', tag: 'mobile' },
					{ id: 3, text: 'Email :', tag: 'email' }
				],
				businessTypes: [
					{ id: 1, text: 'Boutique or Shop', tag: 'boutiqueOrShop' },
					{ id: 2, text: 'Website/Social Medica', tag: 'website' },
					{ id: 3, text: 'Salon/Stylist', tag: 'salon' },
					{ id: 4, text: 'New Start Bunsiness', tag: 'newStart' },
					{ id: 5, text: 'Others', tag: 'others' }
				],
				inquiryFormRules: {
					name: [
						{ required: true, message: 'Please enter your name', trigger: 'blur' }
					],
					mobile: [
						{ required: true, message: 'Please enter your phone', trigger: 'blur' },
						{ type: 'number', message: 'It must be number', trigger: 'blur' }
					],
					email: [
						{ required: true, message: 'Please enter your email', trigger: 'blur' }
					],
					country: [
						{ required: true, message: 'Please choose your country', trigger: 'blur' }
					],
					businessTypes: [
						{ type: 'array', required: true, message: 'Please chooce your business type', trigger: 'blur' }
					],
					comment: [
						{ required: true, message: 'Please enter your comment', trigger: 'blur' }
					]
				}
			}
		},
		methods: {
			createInquiry (formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						inquiry.create({ inquiry: this.inquiryInfo }).then((resp) => {
							if (!resp.error_code) {
								this.inquirySuccess = true
							} else {
								alert(resp.error_msg)
							}
						}).catch((err) => {
							alert(err)
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				})
			},
			goHome () {
				this.$router.push({ path: '/' })
			}
		}
	}
</script>

<style>
	.wholesale-inquiry {
		padding-top: 50px;
	}

	.wi-header {
		text-transform: capitalize;
		background-color: #efefef;
		font-size: 18px;
		padding: 10px 5px;
	}

	.wi-form {
		padding: 10px 20px;
	}

	.wi-description {
		font-size: 14px;
		padding-bottom: 20px;
	}

	.required-span {
		color: #dd127b;
		padding: 0 3px;
	}

	.wi-btn {
		background-color: #dd127b;
		color: white;
		text-align: center;
		padding: 5px 0;
		border-radius: 5px;
	}

	.wi-success-content {
		padding: 60px 8px;
	}

	.wi-success-title {
		color: #dd127b;
		font-size: 38px;
		text-align: center;
		font-style: italic;
	}

	.wi-success-desc {
		text-align: center;
		font-size: 16px;
		padding: 10px 0;
	}
</style>