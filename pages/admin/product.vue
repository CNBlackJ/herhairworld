<template>
	<div class="admin-inquiry-con">
		<div class="prod-sub-menu">
			<el-row style="margin-bottom: 20px;">
				<el-col :xl="2" :lg="3">
					<el-button
						type="success" 
						plain
						@click="addProdDialogVisible = true">
						<i class="el-icon-circle-plus el-icon--right"></i>
						添加产品
					</el-button>
				</el-col>
				<el-col :xl="3" :lg="3">
					<el-button
						type="primary" 
						plain
						@click="uploadDialogVisible = true">
						<i class="el-icon-upload el-icon--right"></i>
						产品数据导入
					</el-button>
				</el-col>
			</el-row>

			<el-row>
				<el-col :xl="24" :lg="24">
					<el-form :inline="true" :model="searchCondition" class="demo-form-inline">
						<el-form-item label="产品名称">
							<el-input v-model="searchCondition.name" placeholder="产品名称"></el-input>
						</el-form-item>
						<el-form-item label="产品类型">
							<el-select v-model="searchCondition.type" placeholder="产品类型">
								<el-option label="类型1" value="longHair"></el-option>
								<el-option label="类型2" value="shortHair"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="价格范围">
							<el-col :span="11">
								<el-input v-model="searchCondition.minPrice" placeholder="输入价格"></el-input>
							</el-col>
							<el-col style="text-align:center" :span="2">-</el-col>
							<el-col :span="11">
								<el-input v-model="searchCondition.maxPrice" placeholder="输入价格"></el-input>
							</el-col>
						</el-form-item>
						<el-form-item label="库存状态" prop="delivery">
							<el-switch v-model="searchCondition.stock"></el-switch>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="searchProd">查询</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</div>

		<productTable></productTable>

		<el-dialog
			title="添加产品"
			:visible.sync="addProdDialogVisible"
			:before-close="handleClose"
			width="80%">
			<addProdForm v-on:closeAddProdForm="addProdDialogVisible = false"></addProdForm>
		</el-dialog>

		<el-dialog
			title="导入产品数据"
			:visible.sync="uploadDialogVisible"
			:before-close="handleClose"
			width="30%">
			<el-upload
				class="upload-demo"
				drag
				action="https://jsonplaceholder.typicode.com/posts/"
				accept=".xls,.xlsx"
				multiple>
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
				<div class="el-upload__tip" slot="tip">只能上传xls/xlsx文件，且不超过5M</div>
			</el-upload>
		</el-dialog>
	</div>
</template>

<script>
	import productTable from '@/components/admin/productTable'
	import addProdForm from '@/components/admin/addProdForm'

	export default {
		layout: 'admin',
		components: {
			productTable,
			addProdForm
		},
		data () {
			return {
				uploadDialogVisible: false,
				addProdDialogVisible: false,
				searchCondition: {
					name: '',
					type: '',
					size: '',
					minPrice: '',
					maxPrice: '',
					stock: ''
				}
			}
		},
		methods: {
			searchProd () {
				console.log('search prods')
			},
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
		}
	}
</script>

<style>
	.admin-inquiry-con {
		width: 100%;
		padding: 10px;
	}

	.prod-sub-menu {
		border-bottom: 1px solid #efefef;
	}
</style>