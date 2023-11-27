<template>
  <a-layout class="client-layout">
    <a-layout-header class="client-layout__header">
      <div class="logo-wrap">
				<a href="/">
					<img src="../../../assets/images/core/logo.png">
					<span>Funiro</span>
				</a>
			</div>
      <a-menu
        class="header-menu"
        theme="light"
        mode="horizontal"
      >
        <a-menu-item class="header-menu__item" key="1">
          <router-link to="/">
            Home
          </router-link>
        </a-menu-item>
        <a-menu-item class="header-menu__item" key="2">
          <router-link to="/products">
            Products
          </router-link>
        </a-menu-item>
        <a-menu-item class="header-menu__item" key="3">
          <router-link to="/categories">
            Categories
          </router-link>
        </a-menu-item>
      </a-menu>
      <div class="features-wrapper">
        <router-link to="/" class="features-wrapper__item">
          <i class="fa-solid fa-magnifying-glass"></i>
        </router-link>
        <router-link to="/" class="features-wrapper__item">
          <i class="fa-regular fa-user"></i>
        </router-link>
        <router-link to="/cart" class="features-wrapper__item">
          <shopping-cart-outlined />
        </router-link>
      </div>
    </a-layout-header>
    <a-layout-content class="client-layout__content">
      <!-- <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
      </a-breadcrumb> -->
      <!-- <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">Content</div> -->
        <router-view />
      </a-layout-content>
    <a-layout-footer style="text-align: center">
      Created by Koi151
    </a-layout-footer>
  </a-layout>
</template>

<script>
  
// import SiderMenu from './components/SiderMenu.vue';
import { defineComponent } from 'vue';
import { ShoppingCartOutlined } from '@ant-design/icons-vue';

// import { ref } from 'vue';

export default defineComponent({
	components: {
    'shopping-cart-outlined': ShoppingCartOutlined,
	},
	setup() {
		// const selectedKeys = ref(['1']); // key
		// const collapsed = ref(false);

		return {
			// selectedKeys,
			// collapsed,
		};
	},
	name: "layout-default-client"

});
</script>

<style lang="scss">
$section-1-bg: url('../../../assets/images/core/home-section-1-bg.jpg') center/cover;

.client-layout {
  &__header {
		display: flex;
		align-items: center;
    justify-content: space-between;
		background-color: #fff !important;

		.logo-wrap {
      display: flex;
      align-items: center;
  
			a {
        display: flex;
        align-items: center;
        text-decoration: none;
        span {
          color: #000;
          font-family: var(--font-1);
          font-weight: 700;
          font-style: normal;
          line-height: normal;
          font-size: 2.5rem;
        }

				img {
					width: 6rem;
					height: auto;
					object-fit: cover;
				}
			}
		}

    .header-menu {
      &__item {
        a {
          text-decoration: none;
        }
      }

      .ant-menu-item-active {
        &::after {
          color: var(--color-hightlight-client) !important;
        }
      }

      .ant-menu-item-selected {
        color: var(--color-hightlight-client) !important;

        &::after {
          border-bottom-color: #f2cd52;
        }
      }

      &__item {
        font-size: 1.5rem;
        
      }
    }

    .features-wrapper {
      display: flex;
      align-items: center;

      &__item {
        display: flex; 
        align-items: center;
        text-decoration: none;
        color: #000;
        transition: all .3s;
        padding: 0 1.75rem;

        &:hover {
          transform: scale(1.2);
          color: #bc9514
        }

        i {
          font-size: 1.8rem;
        }

        span {
          svg {
            width: 2.2rem;
            height: auto;
          }
        }
        
      }
    }
	}
}

</style>