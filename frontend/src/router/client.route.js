// clientRoutes.js
import LayoutDefaultClient from '../views/client/layouts/LayoutDefault.vue'

const clientRoutes = [
	{
		path: '/',
		name: 'layout-default-client',
		component: LayoutDefaultClient,
		children: [
			{
				path: '',
				name: 'home-page',
				component: () => import('@/views/client/pages/home/Home.vue')
			},
			{
				path: 'products',
				name: 'products-page-client',
				component: () => import('@/views/client/pages/products/Products.vue')
			},
			{
				path: 'products/detail/:productSlug',
				name: 'product-detail-client',
				component: () => import('@/views/client/pages/products/ProductDetail.vue')
			},
			{
				path: 'cart',
				name: 'product-cart-client',
				component: () => import('@/views/client/pages/cart/ProductCart.vue')
			},
			{
				path: 'checkout',
				name: 'checkout-client',
				component: () => import('@/views/client/pages/checkout/Checkout.vue')
			}
		]
	},
	{
		path: "/:pathMatch(.*)*",
		name: "not-found-page",
		component: () => import("@/views/client/pages/NotFound.vue"),
	}
]

export default clientRoutes;