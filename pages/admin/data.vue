<template>
	<div class="data-container">
		<div class="data-import">
			<div class="data-type">
				导入产品数据
			</div>
			<el-upload
				class="upload-demo"
				drag
				action="https://jsonplaceholder.typicode.com/posts/"
				multiple>
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
				<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
		</div>

		<div class="data-import">
			<div class="data-type">
				导入订单数据
			</div>
			<el-upload
				class="upload-demo"
				drag
				action="https://jsonplaceholder.typicode.com/posts/"
				multiple>
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
				<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
		</div>
	</div>
</template>

<script>
	export default {
		layout: 'admin',
    data() {
      return {
        fileList3: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }]
      };
    },
    methods: {
      handleChange(file, fileList) {
        this.fileList3 = fileList.slice(-3);
      }
    }
	}
</script>

<style>
	.data-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		padding: 10px;
		justify-content: center;
	}

</style>