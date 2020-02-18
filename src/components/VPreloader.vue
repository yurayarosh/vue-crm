<template>
  <div class="preloader-real-wrapper">
    <div class="preloader-wrapper active">
      <div class="spinner-layer spinner-blue-only">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-preloader',
}
</script>

<style lang="sass">
.preloader-real-wrapper
  display: flex
  align-items: center
  justify-content: center
  #app > &
    height: 100vh
</style>
