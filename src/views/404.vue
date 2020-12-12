<template>
  <div></div>
</template>

<script>
export default {
  name: '404',

  funtional: true,

  beforeMount () {
    this.$router.push({
      name: 'home',
      params: { error: { message: 'Page not found!' } }
    })
  }
}
</script>
