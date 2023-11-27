

<template> 
  <div class="navigation">
    <a class="button" @click="handleClick">
      <img src="https://pbs.twimg.com/profile_images/378800000639740507/fc0aaad744734cd1dbc8aeb3d51f8729_400x400.jpeg">
      <div class="logout">LOGOUT</div>
    </a>
  </div>
</template>


<script>
import { defineComponent } from 'vue';
import { message } from 'ant-design-vue';
import AuthorizationServiceAdmin from '@/services/admin/authorization.service'

export default defineComponent({
  name: 'logout-button',
  components: {
  },
  data() {
    return {
      account: {},
    };
  },
  methods: {
    async getSingleAccount() {
      try {
        // const response = await AccountsServiceAdmin.getSingleAccount(this.$route.params.id);
          
        // if (response.success) {
        //   this.account = response.data;
        //   message.success(response.message, 3) 
        // }
        
      } catch (error) {
        console.log('Error occurred:', error);
        message.error('Error occurred, can not get account information', error);
      }
    },

    async handleClick() {
      console.log('ok')
      try {
        const response = await AuthorizationServiceAdmin.logOut();
        console.log('response:', response)
        if (response.success) {
          message.success('Log out successful!');
          this.$router.push('/admin/auth/login');
        } else {
          message.error('Error occurred, can not log out')
        }
      } catch (error) {
        console.log(error)
        message.error('Error occurred, can not log out')
      }    
    }
    
  },

  mounted() {
  },
});
</script>


<style lang="scss" scoped>
.navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 20rem;
  background-color: #fff;
  flex: 1;
}

img {
  width: 40px;
  height: auto;
  border-radius: 50%;
  float: left;
}

.logout {
  font-size: 1.8rem;
  color: #000;
  font-weight: 600;
	position: relative;
  right: -18px;
  bottom: -4px;
  overflow: hidden;
  letter-spacing: 3px;
  opacity: 0;
  transition: opacity .4s;
  -webkit-transition: opacity .6s;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  // margin: 15px;
  color: white;
  width: 7rem;
  // background-color: black;
  transition: width .5s;
  -webkit-transition: width .5s;
  overflow: hidden
}

a:hover {
  width: 200px;
}

a:hover .logout{
  opacity: .9;
}

a {
  text-decoration: none;
}
</style>