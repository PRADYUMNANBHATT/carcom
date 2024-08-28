<template>
  <div class="chatbox">
    <div class="chat-head">
      <h1>Chat With AI</h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
        @click="boxHeight = !boxHeight"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
        />
      </svg>
    </div>
    <div v-if="boxHeight">
      <div class="chat-btm">
        <div class="msg-box container" elevation="4" max-width="85%">
          <MessageBox
            v-for="(message, index) in messages"
            :key="index"
            :msg="message"
          />
        </div>
        <div
          class="mx-auto mt-1 container pa-5"
          elevation="4"
          max-width="85%"
          height="auto"
        >
          <div class="d-flex">
            <textarea
              label="prompt"
              variant="underlined"
              class="text-area"
              v-model="message"
            ></textarea>
            <button
              @click="userInput"
              icon="mdi-send"
              class="text-btn"
            ></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MessageBox from "./MessageBox.vue";
import { reactive, ref } from "vue";
import openai from "../mixin/useOpenAi";

export default {
  components: {
    MessageBox,
  },
  setup() {
    const message = ref(null);
    const messages = reactive([]);
    const boxHeight = ref(false);

    const userInput = () => {
      messages.push({
        role: "user",
        content: message.value,
      });
      message.value = null;
      chat(messages);
    };

    const chat = async (msgs) => {
      const chatCompletion = await openai.chat.completions.create({
        messages: msgs,
        model: "gpt-3.5-turbo",
        stream: true,
      });

      // console.log(chatCompletion.choices[0].message)
      // messages.value.push(chatCompletion.choices[0].message)

      for await (const chunk of chatCompletion) {
        // console.log(chunk.choices[0].delta.content);
        // messages.value.push({
        //     role: 'assistant',
        //     content: chunk.choices[0].delta.content
        // })

        if (chunk.choices) {
          if (messages[messages.length - 1].role === "assistant") {
            messages[messages.length - 1].content +=
              chunk.choices[0].delta.content;
          } else {
            messages.push({
              role: "assistant",
              content: chunk.choices[0].delta.content,
            });
          }
        }
      }
    };

    return { userInput, message, messages, boxHeight };
  },
};
</script>

<style scoped>
.container {
  max-height: 400px;
  overflow-y: auto;
  flex-direction: column;
}
.chatbox {
  width: 400px;
  z-index: 9999;
  position: fixed;
  right: 10px;
  bottom: 10px;
  background-color: white;
}
.chat-btm {
  height: 350px;
}
.chat-head {
  width: 100%;
  height: 50px;
  background-color: var(--pc);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
}
.chat-head > h1 {
  font-size: 1.5rem;
  color: white;
  text-transform: capitalize;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
}
.chat-head > svg {
  height: 50px;
  color: white;
}
.chat-head > svg :hover {
  color: gray;
}
.msg-box {
  height: 200px;
  background-color: whitesmoke;
}
.text-area {
  width: 100%;
  border: 1px solid var(--pc);
}
.text-area:focus {
  border: 1px solid var(--pc);
  outline: none;
}
.text-btn {
  background-color: aqua;
  color: gray;
  padding-right: 15px;
  padding-left: 15px;
  border-radius: 5%;
  border: none;
  margin-left: 20px;

  height: 40px;
}
.text-btn::after {
  content: "Enquire";
  box-shadow: inset 3px 3px 3px var(--pc);
  padding-right: 8px;
  padding-left: 8px;
}
.text-btn:hover {
  box-shadow: inset 3px 3px 3px var(--pc);
  color: white;
}
</style>
