<template>
  <div class="container">
    <div class="container-top">
      <div class="img">
        <img src="@/assets/uploads/yongyin-icon.png" alt="" />
      </div>
      <span>用印申请20220428011</span>
    </div>

    <van-cell-group>
      <van-cell title="单元格" value="1313139012390910390129121" />
    </van-cell-group>
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
.container {
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
}

/* 调整内容最小宽度 */
::v-deep .van-cell__value {
  min-width: 70%;
  span {
    display: inline-block;
    text-align: left;
    word-break: break-all;
  }
}
</style>
