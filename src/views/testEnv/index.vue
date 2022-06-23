<template>
  <div>
    testEnv

    <van-field v-model="CONTRACT_NAME" autosize type="textarea" />
    <van-cell title="承租人名称" :value="CONTRACT_NAME" />

    <van-field name="useSealReason" label="用印事由" placeholder="请输入用印事由" input-align="right" :rules="[{ required: true, message: '请输入用印事由' }]" error-message-align="right">
      <template #left-icon>*</template>
    </van-field>
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

// ::v-deep .van-cell {
//   color: #df5d5a;
//   margin: 0 10px;
// }

::v-deep .van-field__left-icon {
  color: #df5d5a;
  margin: 0 10px;
}
</style>
