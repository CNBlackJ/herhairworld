<template>
	<div class="address-container">
		<el-card
			body-style="padding:0px;">
			<div slot="header">
				<span>Shipping Address</span>
				<el-button
					@click="addAddress"
					style="float: right; padding: 3px 0"
					type="text">
					<i class="el-icon-plus"></i>
					Add
				</el-button>
			</div>
			<div class="address-group">
				<addressCard
					v-for="item in 5" :key="item.id"></addressCard>
			</div>
		</el-card>

		<el-dialog
			center
			class="address-form-dialog"
			title="Address"
			:visible.sync="addressFormVisible"
			width="100%"
			:before-close="handleClose">
			<div class="address-form">
				<el-form
					size="small"
					ref="addressForm"
					:model="addressForm">
					<el-row>
						<el-col :span="11">
							<el-form-item label="FirstName *">
								<el-input v-model="addressForm.firstName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="11" :offset="2">
							<el-form-item label="LastName *">
								<el-input v-model="addressForm.lastName"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-form-item label="Address Line 1 *">
						<el-input v-model="addressForm.addressLine1"></el-input>
					</el-form-item>
					<el-form-item label="Address Line 2">
						<el-input v-model="addressForm.addressLine2"></el-input>
					</el-form-item>
					<el-form-item label="City *">
						<el-input v-model="addressForm.city"></el-input>
					</el-form-item>
					<el-form-item label="Destination Country/Region *">
						<el-select 
							v-model="addressForm.country"
							style="width: 100%">
							<el-option
								v-for="item in countries"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="State / Province / Region">
						<el-select
							v-model="addressForm.state"
							style="width: 100%">
							<el-option
								v-for="item in states"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="API / Postal Code *">
						<el-input v-model="addressForm.zipCode"></el-input>
					</el-form-item>
					<el-form-item label="Phone Number *">
						<el-input v-model="addressForm.mobile">
							<el-select v-model="addressForm.mobilePrefix" slot="prepend" placeholder="请选择">
								<el-option label="+1" value="1"></el-option>
								<el-option label="+86" value="86"></el-option>
								<el-option label="+020" value="020"></el-option>
							</el-select>
						</el-input>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addressFormVisible = false">Back</el-button>
				<el-button class="address-save-btn" type="primary" @click="saveAddress">Save</el-button>
			</span>
		</el-dialog>
	
	</div>
</template>

<script>
	import addressCard from '@/components/addressCard'

	export default {
		layout: 'main',
		components: {
			addressCard
		},
		data () {
			return {
				addressFormVisible: false,
				countries: [ 
					{ id: 1, value: 'United State', value: 'unitedState' },
					{ id: 2, value: 'Japan', value: 'japan' },
					{ id: 3, value: 'China', value: 'china' },
					{ id: 4, value: 'Canada', value: 'canada' }
				],
				states: [ 
					{ id: 1, value: 'Alabma', value: 'alabma' },
					{ id: 2, value: 'Florida', value: 'florada' },
					{ id: 3, value: 'New Zealand', value: 'newZealand' }
				],
				addressForm: {
					firstName: '',
					lastName: '',
					addressLine1: '',
					addressLine2: '',
					city: '',
					country: 'United State',
					state: 'Alabma',
					zipCode: '',
					mobile: '',
					mobilePrefix: '+1'
				}
			}
		},
		methods: {
			addAddress () {
				this.addressFormVisible = true
			},
      handleClose(done) {
				this.addressFormVisible = false
			},
			saveAddress () {
				this.addressFormVisible = false
				console.log(this.addressForm)
			}
		}
	}
</script>

<style>
	.address-container {
		padding-top: 50px;
	}

	.address-group {
		background-color: #efefef;
	}

	.address-form-dialog .el-dialog__body {
		padding: 0 20px;
	}

	.address-save-btn {
		background-color: #dd127d;
		border: 1px solid #dd127d;
	}
</style>