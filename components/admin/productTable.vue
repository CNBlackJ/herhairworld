<template>
	<div class="table-container">
		<el-table
      :data="productList"
			style="width: 100%">
			<el-table-column type="expand">
				<template slot-scope="props">
					<addProdForm :isEdit=true :prodId="props.row._id"></addProdForm>
				</template>
			</el-table-column>
      <el-table-column
        prop="name"
        label="名称">
			</el-table-column>
      <el-table-column
        prop="orderMin"
        label="最小订单数">
			</el-table-column>
      <el-table-column
        prop="color"
        label="颜色">
			</el-table-column>
      <el-table-column
        prop="originPrice"
        label="原价 ($)">
			</el-table-column>
      <el-table-column
        prop="price"
        label="价格 ($)">
			</el-table-column>
      <el-table-column
        prop="quantity"
        label="库存数 (件)">
			</el-table-column>
			<el-table-column
			  :formatter="formatLen"
        label="长度 (cm)">
			</el-table-column>
			<el-table-column
				:formatter="formatWeight"
				label="重量 (g)">
			</el-table-column>
      <el-table-column
        prop="categories"
        label="类别">
			</el-table-column>
			<el-table-column label="状态">
				<template slot-scope="props">
					<el-tag size="small" :type="props.row.online ? 'default' : 'warning'">
						{{ props.row.online ? '上线' : '下线'  }}
					</el-tag>
					<el-tag size="small" :type="props.row.quantity > 10 ? 'success' : 'danger'">
						{{ props.row.quantity > 10 ? '库存充足' : '库存不足'  }}
					</el-tag>
				</template>
			</el-table-column>
    </el-table>
	</div>
</template>

<script>
	import product from '@/apis/product'
	import addProdForm from '@/components/admin/addProdForm'

	export default {
		components: {
			addProdForm
		},
		data() {
			return {
				productList: []
			}
		},
		created () {
			product.list({}).then((resp) => {
				this.productList = resp.data
			})
		},
		methods: {
			formatOnline (row, column) {
				return String(row.online)
			},
			formatWeight (row, column) {
				return `${row.minWeight} - ${row.maxWeight}`
			},
			formatLen (row, column) {
				return `${row.minLen} - ${row.maxLen}`
			}
		}
	}
</script>

<style>
	.table-container {
		width: 100%;
	}

  .prod-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  /* .prod-table-expand {
    font-size: 0;
  }

  .prod-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  } */
</style>