<template>
	<div class="sidebar-container">
		<div class="fe-sidebar-left">
			<div class="sidebar-head">
				<div class="menu-icon" @click="goIndex">
					<img class="navbar-icon" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/home.png">
				</div>
				<div class="menu-text">
					Menu
				</div>
				<div class="menu-close" @click="closeSidebar">
					<i class="el-icon-close"></i>
				</div>
			</div>
			<div class="sidebar-group">
				<div v-for="category in categories"
					:key="category._id"
					class="sidebar-menu"
					@click="closeSidebar">
					<div
						@click="goList(category)">
						{{ category.name }}
					</div>
				</div>
				<div
					class="sidebar-menu"
					v-for="item in customerLink"
					:key="item.id"
					@click="closeSidebar">
					<div
						:style="item.style"
						@click="goCustomerLink(item)">
						{{ item.name }}
					</div>
				</div>
			</div>
		</div>
		<div class="fe-sidebar-right" @click="closeSidebar"></div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import category from '@/apis/category'

	export default {
		computed: mapState({
			categories: state => state.home.categories
		}),
		data () {
			return {
				customerLink: [
					{ id: 1, name: 'Wholesale', link: '/wholesale#contact', style: 'color: #dd127b' },
					{ id: 2, name: 'About us', link: '/about', style: '' },
					{ id: 3, name: 'Contact us', link: '/wholesale#contact', style: '' }
				]
			}
		},
		methods: {
			closeSidebar () {
				this.$emit('closeSidebar')
			},
			goIndex () {
				this.$router.push({ path:'/' })
				this.closeSidebar()
			},
			goCustomerLink ({ link }) {
				this.$router.push({ path: link })
				const eleId = link.split('#')[1]
				if (this.$route.path === '/wholesale' && eleId) {
					const selector = `#${eleId}`
					const options = {
						easing: 'ease-in-out',
						offset: -72
					}
					this.$scrollTo(selector, 1000, options)
				}
			},
			async goList (category) {
				this.$store.commit('home/SET_ACTIVATE_CAT', category._id)
				await this.$store.dispatch('list/setProductList', { limit: 10 })
				this.$router.push({ path: `/list?categoryId=${category._id}&category=${category.name.toLowerCase().split(' ').join('-')}` })
			}
		}
	}
</script>

<style>
	.sidebar-container {
		z-index: 5;
		position: fixed;
		top: 0;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		font-size: 15px;
	}

	.fe-sidebar-left {
		width: 70%;
		height: 100%;
		background-color: black;
		color: white;
	}

	.fe-sidebar-right {
		background-color: #efefef;
		opacity: .5;
		height: 100%;
		width: 100%;
	}

	.sidebar-head {
		text-align: center;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 10px;
		border-bottom: 1px solid #efefef;
	}

	.menu-text {
		text-transform: uppercase;
	}

	.sidebar-group {
		display: flex;
		flex-direction: column;
		align-items: left;
		text-transform: capitalize;
		padding: 10px 0 0 10px;
	}

	.sidebar-menu {
		padding: 5px 0;
	}
</style>