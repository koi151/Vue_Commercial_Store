<template> 
  <div class="darken-layer"></div>
  <div class="form-wrap">
    <div class="login-wrap">
      <div class="login-wrap__left">
        
      </div>
      <div class="login-wrap__right">
        <strong class="login-wrap__right--title">
          LOGIN
        </strong>
        <span class="login-wrap__right--welcome-text">
          Welcome to Admin Page
        </span>
        <form
          class='login-form'
          @submit="submitForm($event)"
          method="POST"
        >
          <div class="form-group"> 
            <label class="form-check-label" for="email"> 
              Gmail 
            </label> 
            <input 
              v-model="info.email" 
              class="form-check-input" 
              type="email"
              name="email"
              id="email"
              required
            > 
          </div>
          <div class="form-group"> 
            <label class="form-check-label" for="password"> 
              Password 
            </label> 
            <input 
              v-model="info.password" 
              class="form-check-input" 
              type="password"
              name="password"
              id="password"
              required
            > 
          </div>  
          <div class="form-group">
            <button 
              type="submit" 
              class="custom-submit-btn"
            >
              Sign in
            </button>
          </div>
        </form>
        <div class="d-flex justify-content-center align-items-center">
          <span class="line"></span>
          <span style="color: #aaa; font-size: 1.2rem; margin: 3rem 1rem;">or</span>
          <span class="line"></span>
        </div>
        <div class="d-flex justify-content-center align-items-center">
          <div style="font-size: 1.4rem;">New to admin page ? </div>
          <router-link 
            :to="`/admin/auth/register`" 
            class="redirect-page"
          >
            Create now
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { defineComponent } from 'vue';
import { message } from 'ant-design-vue';
import AuthorizationServiceAdmin from '../../../../services/admin/authorization.service'

export default defineComponent({
  name: 'login-page',
  components: {

  },
  data() {
    return {
      info: {}
    };
  },
  methods: {
    async submitForm($event) {
      $event.preventDefault();
      console.log('submit')

      try {
        const response = await AuthorizationServiceAdmin.submitLogin(this.info);

        switch (response) {
          case "wrong info":
            message.error('Account is not exists, please try again', 3);
            break;
          case "blocked":
            message.error('Account has been blocked!', 3);
            break;
          case "success":
            message.success('Login successful. Welcome to admin page !');
            this.$router.push('/admin/products');
            break;
          default:
            break;
        }

      } catch (error) {
        console.log('Error occurred:', error);
        message.error('Error occurred, can not login')
      }
    },
    
  },

  mounted() {
  },
});
</script>


<style lang="scss" scoped>
$color-fade: #666;

.darken-layer {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
}

.form-wrap {
  background-image: url('https://preview.colorlib.com/theme/bootstrap/login-form-20/images/bg.jpg.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-wrap {
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    width: 70%;
    height: 80%;
    position: relative;
    z-index: 3;

    &__left {
      background-image: url('https://preview.colorlib.com/theme/bootstrap/login-form-20/images/bg.jpg.webp');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      width: 50%;
    }

    &__right {
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 50%;
      padding: 2rem;


      &--title {
        font-size: 2.2rem;
        font-weight: 600;
        text-transform: uppercase;
      }

      &--welcome-text {
        color: $color-fade;
        margin-top: 1.8rem;
        font-size: 1.5rem;
      }
    }

    form {
      margin-top: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      label {
        margin-top: 2.5rem;
        color: $color-fade;
        font-size: 1.3rem;
      }

      input {
        color: #000;
        display: flex;
        width: 30rem;
        padding: 1.75rem;
      }

      .custom-submit-btn {
        margin-top: 3rem;
        font-size: 1.4rem;
        padding: .4rem 4rem;
        border-radius: 5px;
        color: #fff; 
        background-color: #595959;
      }
    }
  }
  
  .line {
    height: 2px;
    background-color: #ddd;
    width: 5rem;
  }
  .redirect-page {
    margin-left: .5rem; 
    font-size: 1.4rem; 
    color: #000
  }
}
</style>

