<template>
	<div class="addprod-con">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="产品名称" prop="name">
				<el-input v-model="prod.name"></el-input>
			</el-form-item>
			<el-form-item label="closure" prop="closure">
				<el-select v-model="prod.closure" placeholder="请选择closure">
					<el-option label="closure 1" value="closure_1"></el-option>
					<el-option label="closure 2" value="closure_2"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="类型" prop="type">
				<el-select v-model="prod.type" placeholder="请选择类型">
					<el-option label="Frontal" value="frontal"></el-option>
					<el-option label="Closure" value="closure"></el-option>
					<el-option label="Lace Wigs" value="lace_wigs"></el-option>
					<el-option label="Hair Extension" value="hair_extension"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否上线" prop="online">
				<el-switch v-model="prod.online"></el-switch>
			</el-form-item>
			<el-form-item label="活动性质" prop="type">
				<el-checkbox-group v-model="ruleForm.type">
					<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
					<el-checkbox label="地推活动" name="type"></el-checkbox>
					<el-checkbox label="线下主题活动" name="type"></el-checkbox>
					<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="特殊资源" prop="resource">
				<el-radio-group v-model="ruleForm.resource">
					<el-radio label="线上品牌商赞助"></el-radio>
					<el-radio label="线下场地免费"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="活动形式" prop="desc">
				<el-input type="textarea" v-model="ruleForm.desc"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				prod: {
					name: '',
					closure: '',
					length: '',
					type: '',
					stock: '',
					originPrice: '',
					price: '',
					description: '',
					imgs: [],
					online: ''
				},
				ruleForm: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				rules: {
					name: [
						{ required: true, message: '请输入活动名称', trigger: 'blur' },
						{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
					],
					region: [
						{ required: true, message: '请选择活动区域', trigger: 'change' }
					],
					date1: [
						{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }
					],
					date2: [
						{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }
					],
					type: [
						{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
					],
					resource: [
						{ required: true, message: '请选择活动资源', trigger: 'change' }
					],
					desc: [
						{ required: true, message: '请填写活动形式', trigger: 'blur' }
					]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>