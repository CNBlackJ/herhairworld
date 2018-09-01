<template>
	<div class="products-container">
		<el-table
      :data="inquiryList"
			style="width: 100%">
			<el-table-column
				type="index"
				width="50">
			</el-table-column>
			<el-table-column
        prop="firstName"
				label="姓">
      </el-table-column>
      <el-table-column
        prop="lastName"
				label="名">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
			</el-table-column>
      <el-table-column
        prop="country"
        label="国家">
			</el-table-column>
      <el-table-column
        prop="phoneNum"
        label="手机">
			</el-table-column>
      <el-table-column
        prop="iMessage"
        label="Facetime & iMessage">
			</el-table-column>
      <el-table-column
        prop="whatsApp"
        label="Whatsapp">
			</el-table-column>
      <el-table-column
        prop="content"
        label="留言内容">
			</el-table-column>
			<el-table-column
			  sortable
        prop="createdAt"
        label="时间">
			</el-table-column>
			<el-table-column
				fixed="right"
				label="操作"
				width="100">
				<template slot-scope="scope">
					<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
					<el-button type="text" size="small">编辑</el-button>
				</template>
			</el-table-column>
    </el-table>
	</div>
</template>

<script>
	import inquiry from '@/apis/inquiry'

	export default {
		layout: 'admin',
		data () {
			return {
				inquiryList: []
			}
		},
		created () {
			inquiry.list({}).then((resp) => {
				this.inquiryList = resp.data
			})
		}
	}
</script>

<style>
	.products-container {
		width: 100%;
	}
</style>