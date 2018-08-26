<template>
	<div class="dt-container">
		<div class="title">
			{{title}}
		</div>

		<el-row class="content">
			<el-col
				class="type-val"
				:span="6"
				v-for="val in vals"
				:key="val"
				:class="{'type-val-selected': selected === val}">

				<div class="val-content" @click="choose(val)">
					{{val}}
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		props:[
			'title',
			'vals'
		],
		data () {
			return {
				selected: this.vals[0]
			}
		},
		methods: {
			choose (val) {
				this.selected = val
			}
		}
	}
</script>

<style>
	.dt-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		font-size: 14px;
	}

	.title {
		padding: 20px 0 10px 0;
	}

	.content {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.type-val {
		width: 100%;
		height: 100%;
		text-align: center;
		margin: 5px;
		padding: 5px 0;
		border: 1px solid #efefef;
	}

	.type-val-selected {
		background: #dd127b;
		color: white;
	}

	.val-content {
		width: 100%;
		height: 100%;
	}
</style>