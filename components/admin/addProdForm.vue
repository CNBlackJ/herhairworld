<template>
	<div class="addprod-con">
		<el-form :model="prod" :rules="rules" ref="prod" label-width="100px">
			<el-row>
				<el-col :span="10">
					<el-form-item label="产品名称" prop="name">
						<el-input v-model="prod.name"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="model" prop="model">
						<el-input v-model="prod.model"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="最小订单数" prop="orderMin">
							<el-input v-model.number="prod.orderMin"></el-input>
						</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span="8">
					<el-form-item label="颜色" prop="color">
						<el-input v-model="prod.color"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="材料" prop="material">
						<el-input v-model="prod.material"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="包装" prop="package">
						<el-input v-model="prod.package"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			
			<el-row>
				<el-col :span="8">
					<el-form-item label="价格" prop="price">
						<el-input v-model.number="prod.price"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="库存数" prop="quantity">
						<el-input v-model.number="prod.quantity"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="重量" required>
						<el-col :span="11">
							<el-form-item prop="minWeight">
								<el-input v-model.number="prod.minWeight"></el-input>
							</el-form-item>
						</el-col>
						<el-col style="text-align:center" :span="2">-</el-col>
						<el-col :span="11">
							<el-form-item prop="maxWeight">
								<el-input v-model.number="prod.maxWeight"></el-input>
							</el-form-item>
						</el-col>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span="24">
					<el-form-item label="类别" prop="categories">
						<el-checkbox-group v-model="prod.categories">
							<el-checkbox
								v-for="category in categories"
								:key="category._id"
								:checked="prod.categories.map(e => e._id).indexOf(category._id) > -1"
								:label="category.name">
							</el-checkbox>
						</el-checkbox-group>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span="24">
					<el-form-item label="长度 / 价格">
						<el-card>
							<el-tag
								v-for="length in prod.lengths"
								:key="length._id"
								closable
								:disable-transitions="false"
								@close="removeLenPrice(length._id)">
								{{length.len}} inch - $ {{length.price}}
							</el-tag>
							<div v-if="priceLenVisible">
								<el-row>
									<el-col :span="2">
										Length: 
									</el-col>
									<el-col :span="6">
										<el-input
											v-model="length"
											size="small">
										</el-input>
									</el-col>
									<el-col :span="2" :offset="1">
										Price:
									</el-col>
									<el-col :span="6">
										<el-input
											v-model="price"
											size="small">
										</el-input>
									</el-col>
									<el-col :span="2" :offset="1">
										<el-button
											@click="lenPriceConfirm"
											size="small"
											type="primary">
										确定</el-button>
									</el-col>
									<el-col :span="2">
										<el-button
											@click="lenPriceCancle"
											size="small">
										取消</el-button>
									</el-col>
								</el-row>
							</div>
							<el-button
								style="margin-left: 10px"
								v-else
								size="small"
								@click="showInput">
								+ 添加尺寸
							</el-button>
						</el-card>
					</el-form-item>
				</el-col>
			</el-row>
	
			<el-row :gutter="20">
				<el-col :span="10">
					<el-form-item label="封面图" prop="description">
						<el-card>
							<div slot="header">
								<span>选择一张图片做为产品展示封面图片</span>
							</div>
							<div>
								<el-upload
									class="mainimg-uploader"
									action="http://localhost:3010/api/qiniu/upload"
									:show-file-list="false"
									:on-success="handleMainImgSuccess"
									:before-upload="beforeMainImgUpload">
									<img v-if="prod.mainImg" :src="prod.mainImg" class="mainimg">
									<i v-else class="el-icon-plus mainimg-uploader-icon"></i>
								</el-upload>
							</div>
						</el-card>
					</el-form-item>
				</el-col>

				<el-col :span="12">
					<el-form-item label="产品图" prop="description">
						<el-card>
							<div>
								<el-upload
									class="upload-demo"
									action="http://localhost:3010/api/qiniu/upload"
									:on-preview="handlePreview"
									:on-remove="handleRemove"
									:file-list="prod.imgs"
									:on-success="handleImgsSuccess"
									list-type="picture">
									<el-button size="small" type="primary">点击上传</el-button>
									<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
								</el-upload>
							</div>
						</el-card>
					</el-form-item>
				</el-col>
			</el-row>

			<el-form-item label="是否上线" prop="online">
				<el-switch v-model="prod.online"></el-switch>
			</el-form-item>

			<el-form-item>
				<el-button v-if="!isEdit" type="primary" @click="createProd('prod')">立即创建</el-button>
				<el-button v-if="!isEdit" @click="resetForm('prod')">重置</el-button>
				<el-button type="primary" v-if="isEdit" @click="updateProd('prod')">立即更新</el-button>
				<el-button type="danger" v-if="isEdit" @click="deleteProd()">删除</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import _ from 'lodash'

	import product from '@/apis/product'
	import category from '@/apis/category'
	
	export default {
		props: [
			'isEdit',
			'prodId'
		],
		data() {
			return {
        priceLenVisible: false,
				price: 0,
				length: 0,
				categories: [],
				prod: {
					model: `test model name ${new Date()}`,
					name: `test product name ${new Date()}`,
					quantity: 999,
					orderMin: 1,
					material: '100% Human Hair',
					package: '1pcs/lot(100g)',
					originPrice: 199,
					price: 99,
					color: 'Natural Color',
					mainImg: '',
					categories: [],
					imgs: [],
					minWeight: 90,
					maxWeight: 110,
					online: true,
					lengths: []
				},
				rules: {
					name: [
						{ required: true, message: '请输入产品名称', trigger: 'blur' },
					],
					model: [
						{ required: true, message: '请输入产品model', trigger: 'blur' }
					],
					quantity: [
						{ type: 'number', required: true, message: '请输入产品数量', trigger: 'blur' },
						{ type: 'number', message: '库存必须为数字', trigger: 'blur' },
					],
					orderMin: [
						{ type: 'number', required: true, message: '请输入产品最低价格', trigger: 'blur' },
						{ type: 'number', message: '最小订单数必须为数字', trigger: 'blur' },
					],
					material: [
						{ required: true, message: '请输入产品材料', trigger: 'blur' },
					],
					package: [
						{ required: true, message: '请输入包装内容', trigger: 'blur' }
					],
					price: [
						{ type: 'number', required: true, message: '请输入产品价格', trigger: 'blur' },
						{ type: 'number', message: '产品价格必须为数字', trigger: 'blur' },
					],
					color: [
						{ required: true, message: '请输入产品颜色', trigger: 'blur' }
					],
					minWeight: [
						{ type: 'number', required: true, message: '请输入产品最小重量', trigger: 'blur' },
						{ type: 'number', message: '产品重量必须为数字', trigger: 'blur' }
					],
					maxWeight: [
						{ type: 'number', required: true, message: '请输入产品最大重量', trigger: 'blur' },
						{ type: 'number', message: '产品重量必须为数字', trigger: 'blur' }
					],
					mainImgs: [
						{ required: true, message: '请上传封面图片', trigger: 'change' }
					],
					categories: [
						{ type: 'array', required: true, message: '请至少选择一个类别', trigger: 'change' }
					]
				}
			};
		},
		async created () {
			if (this.isEdit) this.prod = await product.getById(this.prodId)
			this.categories = await category.list({})
		},
		methods: {
      removeLenPrice(_id) {
        _.remove(this.prod.lengths, ele => ele._id === _id)
      },
      showInput() {
        this.priceLenVisible = true
      },
      lenPriceConfirm() {
				const len = this.length
				const price = this.price
        if (len && price) {
					const lenPrice = { len, price }
          this.prod.lengths.push(lenPrice)
				}
				this.lenPriceCancle()
			},
			lenPriceCancle () {
        this.priceLenVisible = false;
				this.length = 0
				this.price = 0
			},
			createProd(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						// 更新图片字段
						this.prod.imgs = this.prod.imgs.map(img => { return { name: img.name, url: img.url } })
						// 更新分类字段为ObjectId
						const objIdCat = []
						this.categories.forEach(category => {
							if (this.prod.categories.indexOf(category.name) > -1) objIdCat.push(category._id)
						})
						this.prod.categories = objIdCat
						await product.create(this.prod)
						this.$emit('closeAddProdForm')
					} else {
						console.log('error submit!!');
						return false;
					}
				})
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			deleteProd () {
				this.$confirm(`确认删除商品：${this.prod.name} ？`)
          .then(_ => {
            product.deleteById({ id: this.prod._id }).then(() => {
							console.log('success to delete')
						}).catch((err) => {
							console.log(`deleteProd: ${JSON.stringify(err)}`)
						})
          })
          .catch(_ => {});
			},
			updateProd (formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						this.prod.imgs = this.prod.imgs.map(img => {
							return { name: img.name, url: img.url }
						})
						// 更新分类字段为ObjectId
						const objIdCat = []
						this.categories.forEach(category => {
							if (this.prod.categories.indexOf(category.name) > -1) objIdCat.push(category._id)
						})
						this.prod.categories = objIdCat
						await product.update({ prod: this.prod })
					} else {
						return false;
					}
				});
			},
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
			handleMainImgSuccess(res, file) {
				// this.prod.mainImg = URL.createObjectURL(file.raw);
				this.prod.mainImg = res.data[0]
			},
			handleImgsSuccess (res, file, fileList) {
				const url = res.data[0]
				const payload = { name: file.name, url }
				this.prod.imgs.push(payload)
				// this.prod.imgs = fileList.map(file => {
				// 	return { name: file.name, url: res.data[0] }
				// })
			},
      beforeMainImgUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
		}
	}
</script>

<style>
  .mainimg-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .mainimg-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .mainimg-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .mainimg {
    width: 160px;
    height: 160px;
    display: block;
  }

	.el-tag + .el-tag {
    margin-left: 10px;
  }
</style>