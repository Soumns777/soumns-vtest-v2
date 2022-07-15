<template>
  <div class="container">
    <van-uploader :max-count="1" :after-read="afterRead" v-model="fileList" />
  </div>
</template>

<script>
import { Toast } from 'vant'

import { uploadImgs, Login } from '@/services/request'

export default {
  name: 'uploadImg',
  data() {
    return {
      fileList: []
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    fileList() {
      console.log(this.fileList, '💛💙 fileList')
    }
  },

  methods: {
    async afterRead(file) {
      let formData = new FormData()
      formData.append('name', '小红')
      formData.append('age', '18')
      formData.append('file', this.fileList[0].file)
      const { RESULT_CODE } = await uploadImgs(formData)

      if (RESULT_CODE === '0000') {
        return Toast.success('上传图片成功!')
      }
    },

    async init() {
      const { data: res } = await Login({
        userName: 'admin',
        password: '123'
      })
      console.log(res, '💛💙 init login')
    }
  }
}
</script>

<style scoped lang="scss"></style>
