<template>
  <div>testEnv</div>
</template>

<script>
export default {
  name: 'testEnv',
  data() {
    return {}
  },
  created() {
    console.log(process.env.VUE_APP_DEPARTMENT_PORT, '💙💛 环境变量')
  },
  methods: {}
}
</script>

<style scoped lang="scss"></style>
