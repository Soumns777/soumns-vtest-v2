<template>
  <div>子组件</div>
</template>

<script>
export default {
  name: 'Son',
  props: {
    content: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
  created() {
    console.log(this.content, '💙💛 content')

    this.$emit('update:content', '苏银租赁-儿子')
  },
  methods: {}
}
</script>

<style scoped lang="scss"></style>
