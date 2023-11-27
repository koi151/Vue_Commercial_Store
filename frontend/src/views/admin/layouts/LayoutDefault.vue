<template>
  <a-layout class="layout">
			<a-layout-header class="layout__header" style="background: #fff; padding: 0">
				<div :class="`header-logo-wrapper ${collapsed ? 'logo-narrow' : ''}`">
					<img
						src="@/assets/images/demo/sass.svg" 
						alt="logo" 
					>
				</div>
				<menu-unfold-outlined 
					v-if="collapsed" 
					class="trigger d-flex justify-content-center align-items-center" 
					@click="() => (collapsed = !collapsed)" 
				/>
				<menu-fold-outlined 
					v-else class="trigger d-flex justify-content-center align-items-center" 
					@click="() => (collapsed = !collapsed)" 
				/>
				<LogoutButton />
			</a-layout-header>
			<a-layout>
				<a-layout-sider class="layout__sider" theme="light" v-model:collapsed="collapsed" :trigger="null" collapsible>
					<a-menu class="sider-menu" v-model:selectedKeys="selectedKeys" theme="light" mode="inline">
						<a-menu-item class="sider-menu__item" key="1">
							<router-link to="/admin/dashboard">
								<dashboard-outlined />
								<span>Dashboard</span>
							</router-link>
						</a-menu-item>
						<a-menu-item class="sider-menu__item" key="2">
							<router-link to="/admin/products">
								<shopping-outlined />
								<span>Products</span>
							</router-link>
						</a-menu-item>
						<a-menu-item class="sider-menu__item" key="3">
							<router-link to="/admin/product-categories">
								<inbox-outlined />
								<span>Categories</span>
							</router-link>
						</a-menu-item>
						<a-menu-item class="sider-menu__item" key="4">
							<router-link to="/admin/roles">
								<shopping-outlined />
								<span>Roles</span>
							</router-link>
						</a-menu-item>
						<a-menu-item class="sider-menu__item" key="5">
							<router-link to="/admin/roles/permissions">
								<safety-outlined />
								<span>Permissions</span>
							</router-link>
						</a-menu-item>
						<a-menu-item class="sider-menu__item" key="6">
							<router-link to="/admin/accounts">
								<user-outlined />
								<span>Accounts</span>
							</router-link>
						</a-menu-item>
					</a-menu>
				</a-layout-sider>
				<a-layout-content class="layout__content"
					:class="`layout__content ${collapsed && 'narrow-content'}`"
				>
					<router-view />
				</a-layout-content>
			</a-layout>
			<a-layout-footer class="layout__footer">
				Footer Testing
			</a-layout-footer>
		</a-layout>
</template>

<script>
  
// import SiderMenu from './components/SiderMenu.vue';
import { defineComponent } from 'vue';
import { MenuUnfoldOutlined, MenuFoldOutlined, DashboardOutlined, SafetyOutlined,
			InboxOutlined, ShoppingOutlined, UserOutlined} from '@ant-design/icons-vue';
import { ref } from 'vue';
import LogoutButton from '../../../components/admin/LogoutButton.vue'

export default defineComponent({
	components: {
		// SiderMenu,
		LogoutButton,		
		'menu-unfold-outlined': MenuUnfoldOutlined,
		'menu-fold-outlined': MenuFoldOutlined,
		'inbox-outlined': InboxOutlined,
		'shopping-outlined': ShoppingOutlined,
		'dashboard-outlined': DashboardOutlined,
		'user-outlined': UserOutlined,
		'safety-outlined': SafetyOutlined
	},
	setup() {
		const selectedKeys = ref(['1']); // key
		const collapsed = ref(false);

		return {
			selectedKeys,
			collapsed,
		};
	},
	name: "layout-default-admin"

});
</script>

<style lang="scss">
.layout {
	&__header {
		box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.15);
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		border: 1px;
		z-index: 99;
		height: 60px;
		display: flex;

		.header-logo-wrapper {
			height: 100%;
			width: 200px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-right: 1px solid #ddd;
			transition: all ease-in-out .2s;

			img {
				height: 4rem;
				width: auto;
				object-fit: cover;
				transition: all .2s;
			}
		}

		.logo-narrow {
			width: 80px;

			img {
				height: 3.5rem;
			}
		}

		.trigger {
			margin-left: 2rem;
		}
	}

	&__sider {
		position: fixed !important;
		top: 60px;
		left: 0;
		height: calc(100vh - 60px);

		.sider-menu {
			&__item {
				a {
					display: flex;
					align-items: center;
					text-decoration: none;
				}
			}
		}
	}

	&__content {
		margin-top: calc(20px + 60px) !important;
		margin-left: calc(20px + 200px) !important;
		transition: ease-in-out .2s;

		.content-breadcrumb {}
	}

	.narrow-content {
		margin-left: calc(20px + 80px) !important;
	}

	&__footer {
		text-align: center;
		margin-left: 200px;
	}
}

#components-layout-demo-custom-trigger .trigger {
	font-size: 18px;
	line-height: 64px;
	padding: 0 24px;
	cursor: pointer;
	transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
	color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
	height: 32px;
	background: rgba(255, 255, 255, 0.3);
	margin: 16px;
}

.site-layout .site-layout-background {
	background: #fff;
}
</style>