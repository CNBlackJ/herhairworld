<template>
	<div class="admin-inquiry-con">
		<cusTable></cusTable>
	</div>
</template>

<script>
	import table from '@/components/admin/table'

	export default {
		layout: 'admin',
		components: {
			cusTable: table
		}
	}
</script>

<style>
	.admin-inquiry-con {
		width: 100%;
	}
</style>