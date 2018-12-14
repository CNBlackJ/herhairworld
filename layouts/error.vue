<template>
  <div class="error-container">
    <div>
      <img class="error-img" src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/404-mobile.gif">
      <div class="error-tips">
        You're lost in deep space.
        <div>
          <a @click="goHome">Click to go back.</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'mainWithFixedFooter',
  methods: {
    goHome () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style>
  .error-container {
    padding-top: 44px;
		position: absolute;
		width: 100%;
		top: 10%;
  }

  .error-img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }

  .error-tips {
    color: #E6A23C;
    text-align: center;
  }

  .error-tips a {
    border-bottom: 1px solid #E6A23C;
  }
</style>