
import LayoutDefaultAdmin from '../views/admin/layouts/LayoutDefault.vue'

const requireAdminAuth = (to, from, next) => {
  try {
    const token = document.cookie.split('; ').find(row => row.startsWith('token')).split('=')[1];
    if (token) {
      next(); 
    } else {
      next('/admin/auth/login');
    }
  } catch (error) {
    next('/admin/auth/login');
  }
};

const adminRoutes = [
	{
		path: '/admin',
		name: 'layout-default-admin',
		component: LayoutDefaultAdmin,
    meta: { requiresAuth: true },
    beforeEnter: requireAdminAuth,
		children: [
			{
				path: 'dashboard',
				name: 'dashboard-page',
				component: () => import('@/views/admin/pages/dashboard/Dashboard.vue')
			},
			{
				path: 'products',
				name: 'products-page-admin',
				component: () => import('@/views/admin/pages/products/Products.vue')
			},
			{
        path: 'products/create',
        name: 'create-product-admin',
        component: () => import('@/views/admin/pages/products/CreateProduct.vue')
      },
			{
        path: 'products/edit/:id',
        name: 'edit-product-admin',
        component: () => import('@/views/admin/pages/products/EditProduct.vue')
      },
			{
				path: 'product-categories',
				name: 'categories-page-admin',
				component: () => import('@/views/admin/pages/categories/Categories.vue')
			},
			{
        path: 'product-categories/create',
        name: 'create-category-admin',
        component: () => import('@/views/admin/pages/categories/CreateCategory.vue')
      },
			{
        path: 'product-categories/edit/:id',
        name: 'edit-category-admin',
        component: () => import('@/views/admin/pages/categories/EditCategory.vue')
      },
			{
        path: 'roles',
        name: 'roles-admin',
        component: () => import('@/views/admin/pages/roles/Roles.vue')
      },
			{
        path: 'roles/create',
        name: 'create-role-admin',
        component: () => import('@/views/admin/pages/roles/CreateRole.vue')
      },
			{
        path: 'roles/edit/:id',
        name: 'edit-role-admin',
        component: () => import('@/views/admin/pages/roles/EditRole.vue')
      },
			{
        path: 'roles/permissions',
        name: 'roles-permissions-admin',
        component: () => import('@/views/admin/pages/roles/Permissions.vue')
      },
      {
        path: 'accounts',
        name: 'accounts-page-admin',
        component: () => import('@/views/admin/pages/accounts/Accounts.vue')
      },
      {
        path: 'accounts/create',
        name: 'create-account-admin',
        component: () => import('@/views/admin/pages/accounts/CreateAccount.vue')
      },
      {
        path: 'accounts/edit/:id',
        name: 'edit-account-admin',
        component: () => import('@/views/admin/pages/accounts/EditAccount.vue')
      },
		]
	},
  {
    path: '/admin/auth/login',
    name: 'login-page',
    component: () => import('@/views/admin/pages/Login/Login.vue')
  },
  {
    path: '/admin/auth/register',
    name: 'register-page',
    component: () => import('@/views/admin/pages/Register/Register.vue')
  }
]





export default adminRoutes;
