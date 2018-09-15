<template>
	<div class="address-card-container">
		<div class="address-card-main">
			<div class="address-card-content">
				<div class="address-card-icon">
					<i class="el-icon-location-outline"></i>
				</div>
				<div class="address-card-info">
					<div class="pa-userinfo">
						<div class="pa-userinfo-text"><strong>Name:</strong> {{address.firstName}} {{address.lastName}}</div>
						<div class="pa-userinfo-text">{{address.mobile}}</div>
					</div>
					<div class="pa-address">
						<strong>Address:</strong> {{address.addressLine1}} {{address.addressLine2}}
					</div>
				</div>
			</div>
			<div class="address-card-operation">
				<div class="default-address">
					<el-checkbox
						v-model="address.isDefault"
						@change="setDefault(address._id)">Default</el-checkbox>
				</div>
				<div class="address-edit">
					<div class="address-edit-text">
						<el-button type="text" icon="el-icon-edit">Edit</el-button>
					</div>
					<div class="address-edit-text">
						<el-button
							@click="deleteAddress(address._id)"
							type="text"
							icon="el-icon-delete">
							Delete</el-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import address from '@/apis/address'

	export default {
		props: [
			'address'
		],
		methods: {
			deleteAddress (id) {
				address.delete({ id }).then((resp) => {
					if (!resp.error_code) {
						this.$emit('listAddress')
					} else {
						console.log(resp.error_msg)
					}
				})
			},
			setDefault (id) {
				address.setDefault({ id }).then((resp) => {
					if (!resp.error_code) {
						this.$emit('listAddress')
					} else {
						console.log(resp.error_msg)
					}
				})
			}
		}
	}
</script>

<style>
	.address-card-container {
		padding-bottom: 15px;
		font-size: 13px;
	}

	.address-card-main {
		background-color: white;
		padding: 10px;
		display: flex;
		flex-direction: column;
	}

	.address-card-content {
		display: flex;
		flex-direction: row;
		padding: 5px 0 10px 0;
	}

	.address-card-icon {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 24px;
		padding-right: 10px;
	}

	.address-card-info {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.pa-userinfo {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}

	.pa-userinfo-text {
		padding-bottom: 5px;
	}

	.address-card-operation {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border-top: 1px solid #efefef;
		padding-top: 5px;
	}

	.default-address {
		padding-left: 5px;
	}

	.address-edit {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.address-edit-text {
		padding: 0 5px;
	}
</style>