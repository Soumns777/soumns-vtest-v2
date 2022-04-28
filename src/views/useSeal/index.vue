<template>
  <div class="container">
    <div class="container-top">
      <div class="container-top-bg"></div>

      <div class="container-top-search" :class="showBackToTop ? 'stay-top' : ''">
        <div class="container-top-search-inp" @click="jumpTo()">
          <van-search placeholder="请输入关键字搜索" disabled>
            <template #left-icon>
              <div class="container-top-search-inp-icon">
                <img src="@/assets/uploads/search-icon.png" alt="" />
              </div>
            </template>
          </van-search>
        </div>

        <div class="container-top-search-shaixuan">
          <img src="@/assets/uploads/shaixuan-icon.png" alt="" />
          筛选
        </div>
      </div>

      <div class="container-top-content">
        <div class="container-top-content-apply" @click="selectApplyTypes.showApply = !selectApplyTypes.showApply">
          <div class="container-top-content-apply-img">
            <img src="@/assets/uploads/apply-icon.png" alt="" />
          </div>
          <div class="container-top-content-apply-text">发起申请</div>
        </div>

        <div class="container-top-content-line"></div>

        <div class="container-top-content-apply" @click="$router.push({ name: 'zancun' })">
          <div class="container-top-content-apply-img">
            <img src="@/assets/uploads/zancun-icon.png" alt="" />
          </div>
          <div class="container-top-content-apply-text">暂存记录</div>
        </div>
      </div>
    </div>

    <!-- <div class="container-stay-in-top" :class="showBackToTop ? 'stay-top' : ''" v-show="showBackToTop">
      <div class="container-top-search">
        <div class="container-top-search-inp" @click="jumpTo()">
          <van-search placeholder="请输入关键字搜索" disabled>
            <template #left-icon>
              <div class="container-top-search-inp-icon">
                <img src="@/assets/uploads/search-icon.png" alt="" />
              </div>
            </template>
          </van-search>
        </div>

        <div class="container-top-search-shaixuan">
          <img src="@/assets/uploads/shaixuan-icon.png" alt="" />
          筛选
        </div>
      </div>
    </div> -->

    <div class="container-history" :class="showBackToTop ? 'margin-top' : ''" v-if="dropDownRefresh.documentHistoryData.length">
      <van-pull-refresh v-model="dropDownRefresh.refreshing">
        <van-list v-model="dropDownRefresh.loading" :finished="dropDownRefresh.finished">
          <div class="container-history-eval" v-for="(item, index) in dropDownRefresh.documentHistoryData" :key="index">
            <div class="container-history-eval-top">
              <div class="container-history-eval-top-img1">
                <img src="@/assets/uploads/yongyin-icon.png" alt="" />
              </div>
              <span class="container-history-eval-top-text">用印申请{{ item.approvalNumber }}</span>

              <div class="container-history-eval-top-img2" v-if="item.billStatus == documentStatus.AUDITING">
                <img src="@/assets/uploads/yongyin-shenpizhong.png" alt="" />
              </div>

              <div class="container-history-eval-top-img2" v-if="item.billStatus == documentStatus.PASS">
                <img src="@/assets/uploads/yongyin-tongguo.png" alt="" />
              </div>

              <div class="container-history-eval-top-img2" v-if="item.billStatus == documentStatus.REJECT">
                <img src="@/assets/uploads/yongyin-bohui.png" alt="" />
              </div>
            </div>

            <div class="container-history-eval-line"></div>

            <div class="container-history-eval-content">
              <div class="container-history-eval-content-eval">
                <span class="container-history-eval-content-eval-span1">用印类型</span>
                <span class="container-history-eval-content-eval-span2">{{ item.useSealType == 'USE_SEAL_CONTRACT' ? '合同用印' : item.useSealType == 'USE_SEAL_OTHER' ? '其他用印' : '' }}</span>
              </div>

              <div class="container-history-eval-content-eval">
                <span class="container-history-eval-content-eval-span1">承租人名称</span>
                <span class="container-history-eval-content-eval-span2">{{ item.lesseeName }}</span>
              </div>

              <div class="container-history-eval-content-eval">
                <span class="container-history-eval-content-eval-span1">合同名称</span>
                <span class="container-history-eval-content-eval-span2">{{ item.contractName }}</span>
              </div>

              <div class="container-history-eval-content-eval">
                <span class="container-history-eval-content-eval-span1">用印申请时间</span>
                <span class="container-history-eval-content-eval-span2">{{ item.useSealDate }}</span>
              </div>
            </div>

            <div class="container-history-eval-line1"></div>
            <div class="container-history-eval-bottom">
              <button class="container-history-eval-bottom-btn" v-if="item.billStatus == documentStatus.AUDITING || item.billStatus == documentStatus.PASS" @click="getApprovalDetail(item)">
                查看详情
              </button>

              <button class="container-history-eval-bottom-btn-left" v-if="item.billStatus == documentStatus.REJECT || item.billStatus == documentStatus.INVALID" @click="editApprovalHistory(item)">
                编辑
              </button>

              <button class="container-history-eval-bottom-btn-right" v-if="item.billStatus == documentStatus.REJECT || item.billStatus == documentStatus.INVALID" @click="getApprovalDetail(item)">
                查看详情
              </button>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>

    <div class="container-no-data" v-else>
      <div class="no-data-img"></div>
      <div class="no-data-text">暂无数据</div>
    </div>

    <div class="container-back-to-top" v-show="showBackToTop" @click="backToTop">
      <div class="container-back-to-top-img">
        <img src="@/assets/uploads/back-to-top.png" alt="" />
      </div>
    </div>

    <van-popup v-model="selectApplyTypes.showApply" round :style="{ left: '50%', top: '50%', zIndex: '2001', background: '#ffffff', borderRadius: '8px' }">
      <div class="container-popup-select-applytype">
        <div class="container-popup-top">请选择申请类型</div>

        <div class="container-popup-top-select">
          <el-select v-model="selectApplyTypes.selectValue" placeholder="请选择" @focus="setMinWidth" style="width: 100%">
            <el-option v-for="item in selectApplyTypes.options" :key="item.value" :label="item.label" :value="item.value" :style="{ 'min-width': selectApplyTypes.minWidth + 'px' }"> </el-option>
          </el-select>
        </div>

        <div class="container-popup-line"></div>

        <div class="container-popup-bottom">
          <div class="container-popup-bottom-left" @click="selectApplyTypes.showApply = !selectApplyTypes.showApply">取消</div>
          <div class="container-popup-bottom-line"></div>
          <div class="container-popup-bottom-right" @click="selectApplyType">确认</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from 'vant'

export default {
  name: 'Home',
  data() {
    return {
      Toast,
      documentStatus: {
        INITIAL: 'INITIAL',
        ALL: 'ALL',
        AUDITING: 'AUDITING',
        PASS: 'PASS',
        REJECT: 'REJECT',
        INVALID: 'INVALID'
      }, // 历史单据状态

      dropDownRefresh: {
        pageIndex: 1,
        pageSize: 6,
        loading: false,
        finished: false,
        refreshing: false,
        documentHistoryData: []
      }, // 历史单据列表下拉刷新
      showBackToTop: false,

      selectApplyTypes: {
        showApply: false,
        options: [],
        selectValue: '',
        minWidth: ''
      }
    }
  },

  mounted() {
    this.initHistory()

    // 添加页面滚动事件
    window.addEventListener('scroll', this.scrollToTop)
  },

  destroyed() {
    // 移除页面滚动事件
    window.removeEventListener('scroll', this.scrollToTop)
  },
  methods: {
    /**
     * 初始化历史数据
     */
    async initHistory() {
      try {
        Toast.loading({
          duration: 0,
          forbidClick: true,
          message: '数据加载中...'
        })

        if (this.dropDownRefresh.refreshing) {
          this.dropDownRefresh.documentHistoryData = []
          this.dropDownRefresh.refreshing = false
        }

        const RESULT_DATA = [
          {
            approvalNumber: '20220425009',
            billStatus: 'AUDITING',
            canEdit: false,
            channel: 'MXMOP',
            contractName: '字第23253号',
            lesseeName: '常州市xxx公司',
            useSealClassify: 'USE_SEAL_COMMON',
            useSealDate: '2022-04-25',
            useSealType: 'USE_SEAL_CONTRACT'
          },
          {
            approvalNumber: '20220425009',
            billStatus: 'AUDITING',
            canEdit: false,
            channel: 'MXMOP',
            contractName: '字第23253号',
            lesseeName: '常州市xxx公司',
            useSealClassify: 'USE_SEAL_COMMON',
            useSealDate: '2022-04-25',
            useSealType: 'USE_SEAL_CONTRACT'
          },
          {
            approvalNumber: '20220425009',
            billStatus: 'AUDITING',
            canEdit: false,
            channel: 'MXMOP',
            contractName: '字第23253号',
            lesseeName: '常州市xxx公司',
            useSealClassify: 'USE_SEAL_COMMON',
            useSealDate: '2022-04-25',
            useSealType: 'USE_SEAL_CONTRACT'
          },
          {
            approvalNumber: '20220425009',
            billStatus: 'AUDITING',
            canEdit: false,
            channel: 'MXMOP',
            contractName: '字第23253号',
            lesseeName: '常州市xxx公司',
            useSealClassify: 'USE_SEAL_COMMON',
            useSealDate: '2022-04-25',
            useSealType: 'USE_SEAL_CONTRACT'
          }
        ]

        Toast.clear()

        this.dropDownRefresh.documentHistoryData = RESULT_DATA
      } catch (err) {
        console.log(err, '💥💥 初始化历史单据数据失败')
        Toast.fail('初始化历史单据数据失败!')
      }
    },

    jumpTo() {
      console.log('🍊 搜索')
      // this.$store.commit(`User/${SET_SEARCH_TYPE}`, AUDITING)
      // this.$router.push({ path: '/search' })
    },

    setMinWidth(val) {
      console.log(val.srcElement.clientWidth, '💥💥 minWidth')
      this.selectApplyTypes.minWidth = val.srcElement.clientWidth
    },

    /**
     * 下拉刷新触发刷新时间事件
     */
    refreshDocumentList() {
      // 清空列表数据
      this.dropDownRefresh.finished = false
      this.dropDownRefresh.pageIndex = 1

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.dropDownRefresh.loading = true
      this.initHistory()
    },

    backToTop() {
      const that = this
      that.showBackToTop = !that.showBackToTop

      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
        if (that.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 40)
    },

    // 为了计算距离顶部的高度，当滚动高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop() {
      const that = this
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      that.scrollTop = scrollTop

      console.log(that.scrollTop, '🍊 滚动距离')
      if (that.scrollTop >= 175) {
        that.showBackToTop = true
      } else {
        that.showBackToTop = false
      }
    },

    /**
     * 选择申请审批类型-开放开关
     */
    selectApplyType() {
      this.selectApplyTypes.showApply = !this.selectApplyTypes.showApply
      console.log(this.selectApplyTypes.selectValue, '🎈 选择申请审批类型')
    },

    /**
     * 申请状态转换 中文 -> 码值
     */
    applyStatusTransfer(status) {
      if (status == '全部') {
        return ALL
      } else if (status == '审批中') {
        return AUDITING
      } else if (status == '通过') {
        return PASS
      } else if (status == '驳回') {
        return REJECT
      }
    },

    selectCalendar(calendar) {
      this.shaixuan[calendar] = !this.shaixuan[calendar]
    },

    confirmCalendar(date, calendar, formatDate) {
      this.shaixuan[formatDate] = this.$formatDate(date)
      this.shaixuan[calendar] = !this.shaixuan[calendar]
    },

    reset() {
      this.shaixuan.startDate = this.$formatDate(new Date())
      this.shaixuan.endDate = this.$formatDate(new Date(new Date(new Date().toLocaleDateString()).getTime() + 7 * 24 * 3600 * 1000))
      this.shaixuan.applyStatusActive = 0
    },

    /**
     * 筛选申请审批历史
     */
    async shaixuanApplyHistory() {
      try {
        Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: '数据加载中...'
        })

        if (getDaysBetween(this.shaixuan.startDate, this.shaixuan.endDate) == 0) {
          return Toast.fail('申请日期结束日期不能小于开始日期!')
        }

        const query = {
          pageIndex: 1,
          pageSize: 6,
          userCode: this.$store.state.User.user.login_name,
          startDate: this.shaixuan.startDate,
          endDate: this.shaixuan.endDate
        }

        if (this.applyStatusTransfer(this.shaixuan.billStatus[this.shaixuan.applyStatusActive]) != this.documentStatus.ALL) {
          query['billStatus'] = [this.applyStatusTransfer(this.shaixuan.billStatus[this.shaixuan.applyStatusActive])]
        }

        this.$store.commit(`User/${SET_SHAIXUAN_RESULT}`, {
          startDate: this.shaixuan.startDate,
          endDate: this.shaixuan.endDate,
          billStatus: query.billStatus || ''
        })

        this.$router.push({ name: 'shaixuan' })
      } catch (err) {
        console.log(err, '💥💥 筛选失败!')
        Toast.fail('筛选失败!!')
      }
    },

    async getApprovalDetail(item) {
      try {
        Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: '数据加载中...'
        })

        Toast.clear()

        this.$store.commit(`User/${GET_HISTORY_DETAIL}`, RESULT_DATA)
        this.$router.push({ path: `/useSealDetails/${item.canEdit}` })
      } catch (err) {
        console.log(err, '💥💥 查看详情失败!')
        Toast.fail('查看详情失败!!')
      }
    },

    async editApprovalHistory(item) {
      try {
        Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: '数据加载中...'
        })

        Toast.clear()

        for (const key in RESULT_DATA.details) {
          if (key == 'useSealType') {
            RESULT_DATA.details.useSealType = RESULT_DATA.details.useSealType == 'USE_SEAL_CONTRACT' ? '合同用印' : RESULT_DATA.details.useSealType == 'USE_SEAL_OTHER' ? '其他用印' : ''
          }
        }

        this.$set(RESULT_DATA.details, 'selectedContractName', RESULT_DATA.details.contractName)

        this.$store.commit(`User/${SET_USE_SEAL_DATA}`, RESULT_DATA.details)

        this.$store.commit(`User/${SET_APPLY_TYPE}`, 'history')
        this.$router.push({ name: 'useSeal' })
      } catch (err) {
        console.log(err, '💥💥 编辑历史单笔申请审批失败!')
        Toast.fail('编辑历史单笔申请审批失败!')
      }
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .container-history::-webkit-scrollbar {
  display: none;
}

::v-deep .van-pull-refresh {
  overflow: visible;
}

.isFixed {
  position: fixed;
  top: -100px;
  z-index: 999;
  box-sizing: border-box;
  width: 750px;
  height: 128px;

  background: #ffffff;
  // padding: 30px 0 0px 30px;
}

.container {
  min-height: 100vh;
  background-color: $background-color;

  .container-top {
    background-color: #fff;
    width: 100%;
    height: 448px;
    .container-top-bg {
      width: 100%;
      height: 249px;
      /* background-image: url('../../assets/uploads/container-top-bg.png'); */
      background-image: url('~@/assets/uploads/container-top-bg.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }

    .container-top-search {
      display: flex;
      // height: 68px;
      margin: 100px 30px 0 0px;

      .container-top-search-inp {
        margin-left: 30px;
        z-index: 99;
        .van-search {
          background: #f9f9f9;
          border-radius: 34px;
          width: 532px;
          height: 68px;
          overflow: hidden;
          display: flex;
          align-items: middle;
          justify-content: center;

          .van-search__content {
            background: #f9f9f9;
          }

          .container-top-search-inp-icon {
            width: 28px;
            height: 28px;
            margin-top: 6px;

            img {
              width: 100%;
            }
          }
        }
      }

      .container-top-search-shaixuan {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 20px;
        width: 138px;
        height: 68px;
        border: 1px solid #3184fe;
        border-radius: 34px;
        font-size: 26px;
        color: #3184fe;

        img {
          width: 26px;
          height: 28px;
          margin-right: 10px;
          vertical-align: middle;
        }
      }

      ::v-deep .container-stay-in-top {
        box-sizing: border-box;
        width: 750px;
        height: 128px;

        background: #ffffff;
        padding: 30px 0 0px 30px;

        .container-top-search {
          display: flex;
          height: 68px;
          margin: 0px 30px 0 0px;

          .container-top-search-inp {
            .van-search {
              background: #f9f9f9;
              border-radius: 34px;
              width: 532px;
              height: 68px;
              overflow: hidden;
              display: flex;
              align-items: middle;
              justify-content: center;

              .van-search__content {
                background: #f9f9f9;
              }

              .container-top-search-inp-icon {
                width: 28px;
                height: 28px;
                margin-top: 6px;

                img {
                  width: 100%;
                }
              }
            }
          }

          .container-top-search-shaixuan {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 20px;
            width: 138px;
            height: 68px;
            border: 1px solid #3184fe;
            border-radius: 34px;
            font-size: 26px;
            color: #3184fe;

            img {
              width: 26px;
              height: 28px;
              margin-right: 10px;
              vertical-align: middle;
            }
          }
        }
      }
    }

    .container-top-content {
      position: absolute;
      top: 91px;
      left: 31px;
      display: flex;

      z-index: 2;
      width: 690px;
      height: 229px;
      background-color: #ffffff;
      box-shadow: 0 2px 10px 0 rgba(68, 83, 105, 0.1);
      border-radius: 16px;

      .container-top-content-apply {
        width: 344px;
        height: 100%;
        flex: 1;

        .container-top-content-apply-img {
          width: 68px;
          height: 68px;
          margin: 49px 125px 22px 152px;

          img {
            width: 100%;
          }
        }

        .container-top-content-apply-text {
          margin-left: 130px;
          font-size: 28px;
          color: #535353;
        }
      }

      .container-top-content-zancun {
        .container-top-content-apply-img {
          margin: 50px 1158px 30px 127px;
        }
      }

      .container-top-content-line {
        width: 1px;
        height: 88px;
        background-color: rgba(51, 51, 51, 0.1);
        margin-top: 71px;
      }
    }
  }

  .container-history {
    box-sizing: border-box;
    padding: 30px 30px 0 30px;

    .container-history-eval {
      width: 690px;
      height: 522px;
      background: #ffffff;
      box-shadow: 0 2px 10px 0 rgba(68, 83, 105, 0.1);
      border-radius: 16px;
      margin-bottom: 37px;

      .container-history-eval-top {
        display: -webkit-flex;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;

        height: 82px;
        padding: 30px 30px 10px 30px;

        .container-history-eval-top-img1 {
          width: 23px;
          height: 28px;
          margin-right: 10px;

          img {
            width: 100%;
          }
        }

        .container-history-eval-top-text {
          width: 500px;
          color: #343333;
          font-size: 30px;

          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .container-history-eval-top-img2 {
          width: 98px;
          height: 90px;
          margin-top: -24px;

          img {
            width: 100%;
          }
        }
      }

      .container-history-eval-line {
        width: 510px;
        height: 1px;
        margin-left: 30px;
        background-color: rgba(51, 51, 51, 0.1);
      }

      .container-history-eval-content {
        margin-top: 30px;

        padding: 0 30px;

        .container-history-eval-content-eval {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 30px;

          .container-history-eval-content-eval-span1 {
            font-size: 28px;
            color: #333333;
            white-space: nowrap;
          }
          .container-history-eval-content-eval-span2 {
            font-size: 28px;
            margin-left: 70px;
            color: #9a9999;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }

      .container-history-eval-line1 {
        width: 631px;
        height: 2px;
        background-color: rgba(51, 51, 51, 0.1);
        margin-left: 30px;
      }

      .container-history-eval-bottom {
        display: flex;
        margin-top: 40px;
        margin-left: 30px;

        .container-history-eval-bottom-btn {
          @include complete-btn();
        }

        .container-history-eval-bottom-btn-left {
          @include left-btn();
          margin-right: 30px;
        }

        .container-history-eval-bottom-btn-right {
          @include right-btn();
        }
      }
    }
  }

  .container-no-data {
    @include no-data();
  }

  .container-back-to-top {
    position: fixed;
    right: 20px;
    bottom: 261px;
    width: 88px;
    height: 88px;
    border-radius: 45px;
    background-image: linear-gradient(180deg, #5fbaff 0%, #3184fe 100%);
    box-shadow: 0 2px 10px 0 rgba(49, 132, 254, 0.5);

    .container-back-to-top-img {
      margin: 24px 0 0 30px;
      width: 30px;
      height: 39px;

      img {
        width: 100%;
      }
    }
  }

  .margin-top {
    margin-top: 128px;
  }

  .stay-top {
    @include stay-top();
  }

  ::v-deep .van-overlay {
    z-index: 2000 !important;
  }

  .container-popup-select-applytype {
    box-sizing: border-box;
    height: 338px;
    width: 500px;
    .container-popup-top {
      margin: 35px 0 0 145px;
      font-size: 30px;
      color: #343333;
    }

    .container-popup-top-select {
      width: 432px;
      height: 80px;
      padding: 50px 0 0 34px;
      border-radius: 8px;
    }

    .container-popup-line {
      margin: 50px 0 0 34px;
      background-color: #edecef;
      height: 1px;
      width: 432px;
    }

    .container-popup-bottom {
      display: flex;
      align-items: center;
      width: 100%;
      height: 80px;
      margin-top: 12px;

      .container-popup-bottom-left,
      .container-popup-bottom-right {
        flex: 1;
        margin: 19.5px 0 0 98px;
        color: #438dfe;
        font-size: 28px;
      }

      .container-popup-bottom-right {
        color: #3284fe;
      }

      .container-popup-bottom-line {
        width: 1px;
        height: 62.6px;
        margin-top: 8px;
        background-color: #edecef;
      }
    }
  }

  .van-popup--bottom::-webkit-scrollbar {
    display: none;
  }

  .container-popup-shaixuan {
    height: 762px;
    box-sizing: border-box;

    .container-popup-shaixuan-top {
      box-sizing: border-box;
      margin: 50px 0 0 32px;
      display: flex;
      align-items: center;

      .line {
        width: 4px;
        height: 30px;
        background: #3184fe;
        border-radius: 4px;
        margin-right: 12px;
      }

      .span1 {
        color: #333333;
        font-size: 30px;
        margin-right: 440px;
      }

      .span2 {
        font-size: 28px;
        color: #2c88fb;
      }
    }

    .container-popup-shaixuan-apply-date {
      margin-top: 50px;
      padding-left: 31px;
      box-sizing: border-box;

      .top {
        font-size: 28px;
        color: #333333;
      }

      .container-popup-baoxiao-date-select {
        margin-top: 30px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 64px;

        .container-popup-baoxiao-date-select-start,
        .container-popup-baoxiao-date-select-end {
          display: flex;
          align-items: center;

          width: 316px;
          height: 64px;
          border: 1px solid #c8c8c8;
          border-radius: 8px;
          span {
            color: #7f7f7f;
            font-size: 26px;
            margin: 0px 0 0 20px;
          }

          .container-popup-baoxiao-date-select-start-calendar {
            margin-left: 92px;
            width: 36px;
            height: 36px;
            img {
              width: 100%;
            }
          }
        }

        .container-popup-baoxiao-date-select-line {
          display: inline-block;
          margin-left: 16px;
          width: 28px;
          height: 2px;
          background-color: #b3b3b3;
        }

        .container-popup-baoxiao-date-select-end {
          margin-left: 14px;
        }
      }
    }

    .container-popup-baoxiao-date-line {
      box-sizing: border-box;
      margin: 30px 0 0 31px;
      width: 690px;
      height: 1px;
      background-color: #f1f1f1;
    }

    .container-popup-shaixuan-apply-status {
      margin-top: 30px;
      padding-left: 31px;
      box-sizing: border-box;

      .top {
        font-size: 28px;
        color: #333333;
      }

      .content {
        margin-top: 30px;
        display: flex;
        align-items: center;
        box-sizing: border-box;

        .eval {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 174px;
          height: 64px;
          margin-right: 19px;
          color: #898989;
          font-size: 26px;
          border: 1px solid #c8c8c8;
          border-radius: 8px;

          &:nth-child(1) {
            width: 110px;
          }
        }

        .active {
          background: #3184fe;
          color: #ffffff;
        }
      }
    }

    .container-bottom {
      @include container-bottom();
      background-color: #ffffff;
      margin-top: 168px;
      height: 140px;
      box-sizing: border-box;
      padding-top: 17px;
    }
  }
}
</style>
