<template>
	<main id="notfound">
		<h1>404 Error - Page is not exist</h1>
		<p class="back-to-prev" @click="goBack">
      Redirect to previous page
    </p>
	</main>
</template>

<script>
export default {
  name: 'not-found-page',
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="scss">
#notfound {
  height: 100%;
  display: flex;
  align-items: center;
  margin-top: 15rem;
  padding: 5rem;
  flex-direction: column;
  background: #fff;

  h1 {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .back-to-prev {
    cursor: pointer;

    &:hover {
      font-weight: 500;
    }
  }
}


</style>