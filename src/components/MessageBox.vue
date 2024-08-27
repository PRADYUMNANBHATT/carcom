<template>
  <div class="content">
    <div class="d-flex overflow-auto">
      <div cols="12" sm="2" class="align-start">
        <div class="ma-2 pa-2">
          <button
            :append-icon="
              message.role === 'user' ? 'mdi-account' : 'mdi-assistant'
            "
          >
            {{ message.role }}
          </button>
        </div>
      </div>
      <div cols="12" sm="10" class="align-self-center">
        <div class="ma-2 pa-2">
          <div v-html="message.content" class="preWrap"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const message = defineProps("msg");
// export default {
//   props: ["msg"],
//   setup(props) {
//     const message = props.msg;
//     return { message };
//   },
// };
</script>

<style scoped>
.content {
  flex: 1;
}
.preWrap {
  white-space: pre-wrap;
}
</style>
