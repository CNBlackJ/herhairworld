<template>
	<div class="address-card-container">
		<div class="address-card-main">
			<div class="address-card-content">
				<div class="address-card-icon">
					<i class="el-icon-location-outline"></i>
				</div>
				<div class="address-card-info">
					<div class="pa-userinfo">
						<div class="pa-userinfo-text"><strong>Name:</strong> VinliCheung</div>
						<div class="pa-userinfo-text">13631146428</div>
					</div>
					<div class="pa-address">
						<strong>Address:</strong> 10600 North Tantau AvenueCupertino, CA 95014
					</div>
				</div>
			</div>
			<div class="address-card-operation">
				<div class="default-address">
					<el-checkbox>Default</el-checkbox>
				</div>
				<div class="address-edit">
					<div class="address-edit-text">
						<el-button type="text" icon="el-icon-edit">Edit</el-button>
					</div>
					<div class="address-edit-text">
						<el-button type="text" icon="el-icon-delete">Delete</el-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

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
	}

	.pa-userinfo {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
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