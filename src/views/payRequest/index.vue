<template>
  <div>
    <div v-if="getList.PAY_ACCOUNTS.length > 0">
      <van-cell-group v-for="(item, idx) in getList.PAY_ACCOUNTS" :key="idx" :title="`收款方式${idx + 1}`">
        <van-icon name="arrow-up" class="group-icon" @click="item.showPayRequest = !item.showPayRequest" v-if="item.showPayRequest" />
        <van-icon name="arrow-down" class="group-icon" @click="item.showPayRequest = !item.showPayRequest" v-else />

        <div :style="{ display: item.showPayRequest ? 'block' : 'none' }">
          <van-cell title="申请支付日期" :value="item.PLAN_DATE" />
          <van-cell title="支付方式 " :value="item.PAY_TYPE" />
          <van-cell title="收款方名称 " :value="item.PAYEE_NAME" />
          <van-cell title="收款方账号 " :value="item.ACCOUNT_NO" />
          <van-cell title="收款方开户银行 " :value="item.ACCOUNT_BANK" />
          <van-cell title="收款方开户银行行号 " :value="item.BANK_NO" />
        </div>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      console,
      getList: {
        PAY_ACCOUNTS: []
      }
    }
  },
  created() {},
  methods: {
    init() {
      this.getList.PAY_ACCOUNTS = [
        {
          PLAN_DATE: '2022-05-27',
          RECEIVE_BANK_ACCOUNT_ID: 'a6bf1ff5-6c92-4e20-b049-c5f52c43759c',
          PAYEE_NAME: '新奥集团',
          PAY_TYPE: '转账',
          CREATION_TS: 1653635185000,
          UPDATION_TS: 1653635185000,
          PAY_ACCOUNT_INFO_ID: '9f3e0b19-ba5b-4080-87b7-50f24b5f13e8',
          SOURCE_BILL_TYPE: 'REQUEST',
          PAY_DATE: '2022-05-27',
          ACCOUNT_BANK: '农业银行',
          DATA_VERSION: 1,
          PAY_EXEC_ID: '5899d65f-2b8a-4972-a948-ac9ebab16737',
          CREATOR_ID: '4f12a2d3-d99d-4772-b699-7dd8f23333bc',
          BANK_NO: '457899',
          REQUEST_AMOUNT: 1000000,
          UPDATOR_ID: '4f12a2d3-d99d-4772-b699-7dd8f23333bc',
          ACCOUNT_NO: '32627888262525',
          PAY_METHOD: 'TRANSFER_ACCOUNTS',
          PAY_REQ_ID: '5899d65f-2b8a-4972-a948-ac9ebab16737'
        },
        {
          PLAN_DATE: '2022-05-27',
          RECEIVE_BANK_ACCOUNT_ID: 'a6bf1ff5-6c92-4e20-b049-c5f52c43759c',
          PAYEE_NAME: '新奥集团',
          PAY_TYPE: '转账',
          CREATION_TS: 1653635185000,
          UPDATION_TS: 1653635185000,
          PAY_ACCOUNT_INFO_ID: '9f3e0b19-ba5b-4080-87b7-50f24b5f13e8',
          SOURCE_BILL_TYPE: 'REQUEST',
          PAY_DATE: '2022-05-27',
          ACCOUNT_BANK: '农业银行',
          DATA_VERSION: 1,
          PAY_EXEC_ID: '5899d65f-2b8a-4972-a948-ac9ebab16737',
          CREATOR_ID: '4f12a2d3-d99d-4772-b699-7dd8f23333bc',
          BANK_NO: '457899',
          REQUEST_AMOUNT: 1000000,
          UPDATOR_ID: '4f12a2d3-d99d-4772-b699-7dd8f23333bc',
          ACCOUNT_NO: '32627888262525',
          PAY_METHOD: 'TRANSFER_ACCOUNTS',
          PAY_REQ_ID: '5899d65f-2b8a-4972-a948-ac9ebab16737'
        }
      ]

      this.getList.PAY_ACCOUNTS.forEach((item) => {
        this.$set(item, 'showPayRequest', false)
      })
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped lang="scss">
::v-deep .van-cell-group {
  .group-icon {
    position: absolute;
    right: 40px;
    top: -54px;
    width: 40px;
    height: 40px;
    z-index: 200;
  }
}
</style>
