<template>
  <BaseFormSlot>
    <button
      class="button is-success is-link m-1"
      @click="model_selector('category')"
    >
      Add Category
    </button>
    <button
      class="button is-success is-link m-1"
      @click="model_selector('type')"
    >
      Add Type
    </button>
    <button
      class="button is-success is-link m-1"
      @click="model_selector('trending')"
    >
      Add trending
    </button>
    <div :class="['model', model_opener ? '' : 'is-hidden']">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modal</p>
          <button
            class="delete"
            aria-label="close"
            @click="model_opener = !model_opener"
          ></button>
        </header>
        <section class="modal-card-body">
          <form class="field" @submit.prevent="add_category">
            <label class="label">Add {{ model_type }}</label>
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="name"
                  v-model="add_category_"
                />
                <input
                  class="input"
                  type="text"
                  placeholder="slug"
                  v-model="add_category_slug"
                />
              </div>
              <div class="file is-centered is-boxed is-success has-name">
                <label class="file-label">
                  <input
                    class="file-input"
                    type="file"
                    name="resume"
                    v-on:change="file_upload($event, 'category')"
                    required
                  />
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fa fa-upload"></i>
                    </span>
                    <span class="file-label"> Upload Image </span>
                  </span>
                  <span class="file-name" v-if="thumbnail != null">
                    {{ thumbnail.name }}
                  </span>
                </label>
              </div>
              <div class="control">
                <button class="button is-success">Add {{ model_type }}</button>
              </div>
              <p class="help is-info">{{ msg_add_category_ }}</p>
            </div>
          </form>
        </section>
        <footer class="modal-card-foot">
          <div class="buttons">
            <button class="button" @click="model_category = !model_category">
              Cancel
            </button>
          </div>
        </footer>
      </div>
    </div>
    <form @submit.prevent="postProduct">
      <div class="file is-centered is-boxed is-success has-name">
        <label class="file-label">
          <input
            class="file-input"
            type="file"
            name="resume"
            v-on:change="file_upload($event, 'product')"
            required
          />
          <span class="file-cta">
            <span class="file-icon">
              <i class="fa fa-upload"></i>
            </span>
            <span class="file-label"> Upload Product Image </span>
          </span>
          <span class="file-name" v-if="file != null"> {{ file.name }} </span>
        </label>
      </div>
      <div class="field">
        <label class="label">Name</label>
        <div class="control has-icons-left">
          <input
            class="input is-success"
            type="text"
            placeholder="Text input Name"
            v-model="name"
            required
          />
          <span class="icon is-small is-left">
            <i class="fa fa-header"></i>
          </span>
          <p class="help is-success">Name</p>
        </div>
      </div>

      <div class="field">
        <label class="label">Discription</label>
        <div class="control is-success">
          <textarea
            class="textarea"
            placeholder="Discription"
            v-model="discription"
            required
          ></textarea>
        </div>
      </div>
      <div class="field">
        <label class="label">slug</label>
        <div class="control is-success">
          <input
            class="input"
            type="text"
            placeholder="Slug"
            v-model="slug"
            maxlength="50"
            required
          />
        </div>
      </div>
      <div class="field">
        <label class="label">Price</label>
        <div class="control has-icons-left">
          <input
            class="input is-success"
            type="number"
            placeholder="Price"
            v-model="price"
            required
          />
          <span class="icon is-small is-left">
            <i class="fa fa-rupee"></i>
          </span>
        </div>
      </div>

      <div v-if="load_primary_data_[0] !== undefined">
        <div class="field">
          <label class="label">Category </label>
          <div
            v-if="!(load_primary_data_[0].category === 'no category to show')"
          >
            <div class="select is-success">
              <select v-model="category">
                <option
                  v-for="cate in load_primary_data_[0].category"
                  :key="cate.id"
                  :value="cate.id"
                >
                  {{ cate.name }}
                </option>
              </select>
            </div>
          </div>
          <div v-else>
            <article class="message is-warning">
              <div class="message-header">
                <p>No Category to Show</p>
                <button class="delete" aria-label="delete"></button>
              </div>
              <div class="message-body">Please add category to proceed</div>
            </article>
          </div>
        </div>
        <div class="field">
          <label class="label">Type</label>
          <div
            class="control is-success"
            v-if="!(load_primary_data_[3].cartype === 'no type to show')"
          >
            <div class="select is-success">
              <select v-model="type">
                <option
                  v-for="trend in load_primary_data_[3].cartype"
                  :key="trend.key"
                  :value="trend.id"
                >
                  {{ trend.name }}
                </option>
                <!-- <option value="2">With options</option> -->
              </select>
            </div>
          </div>
          <div v-else>
            <article class="message is-warning">
              <div class="message-header">
                <p>No Type to Show</p>
                <button class="delete" aria-label="delete"></button>
              </div>
              <div class="message-body">Please add Type to proceed</div>
            </article>
          </div>
        </div>
        <div class="field pb-5">
          <label class="label">Trending</label>
          <div
            class="control"
            v-if="!(load_primary_data_[4].trending === 'no trending to show')"
          >
            <div class="select is-success">
              <select v-model="trending">
                <option
                  v-for="trend in load_primary_data_[4].trending"
                  :key="trend.key"
                  :value="trend.id"
                >
                  {{ trend.name }}
                </option>
              </select>
            </div>
          </div>
          <div v-else>
            <article class="message is-warning">
              <div class="message-header">
                <p>No Trending to Show</p>
                <button class="delete" aria-label="delete"></button>
              </div>
              <div class="message-body">Please add Trending to proceed</div>
            </article>
          </div>
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control is-success">
          <button class="button is-success" :disabled="Is_Available">
            Submit
          </button>
        </div>
        <div class="control">
          <button class="button is-danger is-light">Cancel</button>
        </div>
      </div>
      <p class="help is-info">{{ msg }}</p>
    </form>
  </BaseFormSlot>
</template>
<script setup>
import BaseFormSlot from "@/components/BaseFormSlot.vue";

import axios from "axios";
import { computed, defineModel, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
let load_primary_data_ = computed(() => store.getters.getAdminData);
load_primary_data_.value.length ? "" : store.dispatch("fetchAdmin");
let model_opener = ref(false);
let model_type = ref("");
const name = defineModel("name", { default: "" }, { required: false });
const discription = defineModel(
  "discription",
  { default: "" },
  { required: false }
);
const price = defineModel("price", { default: "" }, { required: false });
const category = defineModel("category", { default: "" }, { required: false });
const type = defineModel("type", { default: "" }, { required: false });
const slug = defineModel("slug", { default: "" }, { required: false });
const add_category_slug = defineModel(
  "add_category_slug",
  { default: "" },
  { required: false }
);
const trending = defineModel("trending", { default: "" }, { required: false });
const add_category_ = defineModel(
  "add_category_",
  { default: "" },
  { required: false }
);
const msg = ref();
const msg_add_category_ = ref();

const file = ref([]);
const thumbnail = ref([]);
let Is_Available = ref(true);
Is_Available = computed(() => {
  if (
    name.value != "" &&
    discription.value != "" &&
    price.value != null &&
    category.value != "" &&
    type.value != "" &&
    trending.value != "" &&
    file.value != ""
  ) {
    return false;
  } else {
    return true;
  }
});
const file_upload = (e, key) => {
  key === "category" ? (thumbnail.value = e.target.files[0]) : "";
  key === "product" ? (file.value = e.target.files[0]) : "";
  // console.log((file.value = e.target.files[0]));
};

let postProduct = async () => {
  let fm = new FormData();
  fm.append("name", name.value);
  fm.append("slug", slug.value);
  fm.append("price", price.value);
  fm.append("description", discription.value);
  fm.append("category", category.value);
  fm.append("car_type", type.value);
  fm.append("trending", trending.value);
  fm.append("image", file.value);
  await axios
    .post("api/v1/admin/product/1", fm)
    .then((res) => {
      msg.value = res.data.msg;
      name.value = "";
      slug.value = "";
      category.value = "";
      discription.value = "";
      type.value = "";
      trending.value = "";
      file.value = "";
      price.value = "";
    })
    .catch((e) => console.log(e));
};
const add_category = async () => {
  let fm = new FormData();
  fm.append("name", add_category_.value);
  fm.append("slug", add_category_slug.value);
  fm.append("thumbnail", thumbnail.value);

  await axios
    .post(`api/v1/admin/` + model_type.value + `/1`, fm)
    .then((res) => {
      msg_add_category_.value = res.data.msg;
      add_category.value = "";
      add_category_slug.value = "";
      thumbnail.value = "";
    })
    .catch((e) => console.log(e));
};

const model_selector = (key) => {
  model_opener.value = !model_opener.value;
  model_type.value = key;
};
</script>
<style Scoped></style>
