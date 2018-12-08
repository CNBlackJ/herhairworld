<template>
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
				v-if="inquiryForm.type === 'number'"
				type="string"
				v-model.number="inquiryInfo[inquiryForm.tag]">
			</el-input>
			<el-input
				v-else
				type="string"
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
					:value="country.label">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item
			prop="comment">
			<div>
				Comment :
			</div>
			<el-input
				type="textarea"
				:rows="4"
				v-model="inquiryInfo.comment"
				placeholder="Enter anything you would like to know here,such as the product,prices and etc.">
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
</template>

<script>
		import inquiry from '@/apis/inquiry'
		import country from '@/apis/country'
	
		import recommend from '@/components/recommend'
	
		import { mapState } from 'vuex'
	
		export default {
			layout: 'main',
			components: {
				recommend
			},
			computed: {
				...mapState({
					sendPage: state => state.inquiry.sendPage
				})
			},
			data () {
				return {
					inquirySuccess: false,
					countries: [],
					inquiryInfo: {
						name: '',
						mobile: '',
						email: '',
						country: 'United States of America',
						businessTypes: [],
						comment: ''
					},
					inquiryFormGroup: [
						{ id: 1, text: 'Name :', tag: 'name', type: 'text', modelType: '' },
						{ id: 2, text: 'Phone :', tag: 'mobile', type: 'number', modelType: 'number' },
						{ id: 3, text: 'Email :', tag: 'email', type: 'text', modelType: '' }
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
							{ required: true, message: 'Please enter your email', trigger: 'blur' },
							{ type: 'email', message: 'Please checking your email format', trigger: ['blur', 'change'] }
						],
						country: [
							{ required: true, message: 'Please choose your country', trigger: 'blur' }
						]
					}
				}
			},
			async created () {
        const sendPage = {
					name: this.$route.name,
					path: this.$route.fullPath,
					additional: '/about'
				}
        this.$store.commit('inquiry/SET_SEND_PAGE', sendPage)
				await this.listCountries()
			},
			methods: {
				async listCountries () {
					const countries = await country.list({ limit: 300, sort: 'name' })
					this.countries = countries.map(ele => {
						return {
							value: ele.alpha3Code,
							label: ele.name
						}
					})
				},
				createInquiry (formName) {
					this.$refs[formName].validate((valid) => {
						if (valid) {
							inquiry.create({ inquiry: Object.assign({}, this.inquiryInfo, { sendPage: this.sendPage }) }).then((resp) => {
								if (!resp.error_code) {
									this.inquirySuccess = true
									this.inquiryInfo = {
										name: '',
										mobile: '',
										email: '',
										country: 'United States of America',
										businessTypes: [],
										comment: ''
									}
									this.$message('Thank you, we are recieved your inqury message.')
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
				goBack () {
					this.$router.back(-1)
				}
			}
		}
	</script>
	
	<style>
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