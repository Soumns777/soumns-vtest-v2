<template>
  <div class="container-top">
    <div class="img">
      <img src="@/assets/uploads/yongyin-icon.png" alt="" />
    </div>
    <span>用印申请20220428011</span>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="scss">
.container-top {
  display: flex;
  align-items: center;

  .img {
    width: 23px;
    height: 28px;
    img {
      width: 100%;
    }
  }

  span {
    font-size: 30px;
  }
}
</style>
