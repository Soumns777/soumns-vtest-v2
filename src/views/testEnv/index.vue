<template>
  <div>
    testEnv

    <van-field v-model="CONTRACT_NAME" autosize type="textarea" />
    <van-cell title="承租人名称" :value="CONTRACT_NAME" />

    <van-field name="useSealReason" label="用印事由" placeholder="请输入用印事由" input-align="right" :rules="[{ required: true, message: '请输入用印事由' }]" error-message-align="right">
      <template #left-icon>*</template>
    </van-field>

    <Son :content.sync="CONTRACT_NAME"></Son>

    <button class="rem-class">测试rem</button>
  </div>
</template>

<script>
import Son from './son.vue'
export default {
  name: 'testEnv',
  components: {
    Son
  },
  data() {
    return {
      CONTRACT_NAME: '苏银租赁'
    }
  },
  created() {
    console.log(process.env.VUE_APP_DEPARTMENT_PORT, '💙💛 环境变量')
  },
  methods: {},
  watch: {
    CONTRACT_NAME() {
      console.log(this.CONTRACT_NAME, '💙💛 接收子组件传来的数据')
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .van-field__control {
  color: #969799;
}

::v-deep .van-field__left-icon {
  color: #df5d5a;
  margin: 0 10px;
}

.rem-class {
  width: 5.33rem;
  height: 5.33rem;

  width: 5.33rem;
  background-color: #ff6100;
}
</style>
