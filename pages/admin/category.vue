<template>
	<div class="category-container">
		<el-row>
			<el-col :lg="12" :xl="8">
				<el-card>
					<div slot="header">
						<span>分类名称</span>
						<el-button 
							@click="addCategoryVisible = true"
							style="float: right; padding: 8px"
							type="primary">
							立即添加
						</el-button>
						<el-dialog
							:title="isEdit ? '更新分类' : '添加分类'"
							:visible.sync="addCategoryVisible"
							width="30%">
							<el-input
								v-model="categoryObj.name"
								placeholder="输入新添加类别的名称">
							</el-input>
							<span slot="footer" class="dialog-footer">
								<el-button @click="addCategoryVisible = false">取 消</el-button>
								<el-button v-if="!isEdit" type="primary" @click="createCategory">确 定</el-button>
								<el-button v-if="isEdit" type="primary" @click="updateCategory">确 定</el-button>
							</span>
						</el-dialog>
					</div>
					<div>
						<el-table
							:data="categories"
							stripe
							style="width: 100%">
							<el-table-column
								sortable
								prop="name"
								label="类别"
								width="180">
							</el-table-column>
							<el-table-column
							  sortable
								prop="createdAt"
								label="创建日期"
								:formatter="formatDate"
								width="180">
							</el-table-column>
							<el-table-column
								label="操作"
								width="180">
								<template slot-scope="scope">
									<el-button
										size="mini"
										@click="editCategory(scope.row)">编辑</el-button>
									<el-button
										size="mini"
										type="danger"
										@click="deleteCategory(scope.row)">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import category from '@/apis/category'	
	import formatters from '@/utils/formatters'

	export default {
		layout: 'admin',
		data() {
			return {
				addCategoryVisible: false,
				isEdit: false,
				categoryObj: {
					name: ''
				},
				categories: []
			}
		},
		created () {
			this.listCategory()
		},
		methods: {
			listCategory () {
				category.list({}).then(resp => {
					this.categories = resp.data
				}).catch(err => {
					console.log(`listCategory: ${JSON.stringify(err)}`)
				})
			},
			createCategory () {
				category.create({ category: this.categoryObj }).then(async resp => {
					this.addCategoryVisible = false
					await this.listCategory()
				}).catch(err => {
					console.log(`createCategory: ${JSON.stringify(err)}`)
				})
			},
			updateCategory () {
				category.update({ category: this.categoryObj }).then(async resp => {
					this.addCategoryVisible = false
					this.isEdit = false
					await this.listCategory()
				}).catch(err => {
					console.log(`updateCategory: ${JSON.stringify(err)}`)
				})
			},
			deleteCategory (row) {
				category.delete({ category: row }).then(async resp => {
					await this.listCategory()
				}).catch(err => {
					console.log(`deleteCategory: ${JSON.stringify(err)}`)
				})
			},
			editCategory (row) {
				this.addCategoryVisible = true
				this.isEdit = true
				this.categoryObj = row
			},
			formatDate (row) { return formatters.formatDate({ date: row.createdAt }) }
		}
	}
</script>

<style>
	.category-container {
		width: 100%;
		padding: 20px 20px;
	}
</style>