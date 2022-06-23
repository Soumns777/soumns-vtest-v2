<template>
  <div>
    testEnv

    <van-field v-model="CONTRACT_NAME" autosize type="textarea" />
    <van-cell title="承租人名称" :value="CONTRACT_NAME" />
  </div>
</template>

<script>
export default {
  name: 'testEnv',
  data() {
    return {
      CONTRACT_NAME: '苏银租赁'
    }
  },
  created() {
    console.log(process.env.VUE_APP_DEPARTMENT_PORT, '💙💛 环境变量')
  },
  methods: {}
}
</script>

<style scoped lang="scss">
::v-deep .van-field__control {
  color: #969799;
}
</style>
