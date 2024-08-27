<template>
  <div class="page-success">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Thank you</h1>
        <p class="has-grey-text mb4">Your order will be processed with 48hr</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SuccessView",
  mounted() {
    document.title = "Success|Hootkart";
  },
};
</script>
