<template>
  <section class="field">
    <form class="field" @submit.prevent="add_carousel(model_type)">
      <label class="label">Add {{ model_type }}</label>
      <div class="field">
        <div class="control m-2">
          <div class="file is-centered is-boxed is-success has-name">
            <label class="file-label">
              <input
                class="file-input"
                type="file"
                name="resume"
                v-on:change="file_upload($event, 'carousel')"
                required
              />
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fa fa-upload"></i>
                </span>
                <span class="file-label"> Upload Image </span>
              </span>
              <span class="file-name" v-if="image != null">
                {{ image.name }}
              </span>
            </label>
          </div>
          <input
            class="input m-2"
            type="text"
            placeholder="title"
            maxlength="225"
            v-model="add_carousel_title"
            required
          />
          <input
            class="input m-2 is-success"
            type="text"
            placeholder="slug"
            v-model="add_carousel_slug"
            maxlength="50"
            required
          />
          <textarea
            class="textarea m-2 is-success"
            type="text"
            placeholder="discription"
            v-model="add_carousel_discription"
            maxlength="525"
            required
          ></textarea>
          <input
            class="input m-2"
            type="text"
            placeholder="backgroundcolor"
            v-model="add_carousel_background_clr"
            maxlength="50"
            required
          />
          <div v-if="carousel_data[0] !== undefined">
            <div v-if="!(carousel_data[0].category === 'no category to show')">
              <div class="select is-success">
                <select v-model="category">
                  <option
                    v-for="cate in carousel_data[0].category"
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
        </div>

        <div class="control m-2 is-success">
          <button class="button is-success is-outlined">
            Add {{ model_type }}
          </button>
          <button
            class="button is-warning is-outlined ml-2"
            @click="model_type = 'carousel'"
          >
            Cancel
          </button>
        </div>
        <p class="help is-info">{{ msg_add_carousel_ }}</p>
      </div>
    </form>
    <section class="container">
      <div class="columns is-flex-wrap-wrap" v-if="carousel_data[2]">
        <div
          class="column card is-3 m-2"
          v-for="cat in carousel_data[2].carousel"
          :key="cat.id"
        >
          <div class="column">
            <figure class="image">
              <img :src="cat.get_image" :alt="cat.id" />
            </figure>
            <div
              class="content is-flex is-justify-content-space-evenly is-align-content-space-evenly"
            >
              {{ cat.title }}
            </div>
            <div
              class="is-flex is-justify-content-space-evenly is-align-content-space-evenly"
            >
              <a><i class="fa fa-pencil" @click="edit_carousel(cat.id)"></i></a>
              <a
                ><i
                  class="fa fa-trash-o has-text-danger"
                  @click="delete_carousel(cat.id)"
                ></i
              ></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>
<script setup>
import { ref, defineModel, computed } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import { toast } from "bulma-toast";

const add_carousel_slug = defineModel(
  "add_carousel_slug",
  { default: "" },
  { required: false }
);
const category = defineModel("category", { default: 1 }, { required: false });
const add_carousel_title = defineModel(
  "add_carousel_title",
  { default: "" },
  { required: false }
);
const add_carousel_discription = defineModel(
  "add_carousel_discription",
  { default: "" },
  { required: false }
);
const add_carousel_background_clr = defineModel(
  "add_carousel_background_clr",
  { default: "#ffffff" },
  { required: false }
);
const msg_add_carousel_ = ref();
const image = ref([]);
const edit_id = ref();
const model_type = ref("carousel");
const file_upload = (e, key) => {
  key === "carousel" ? (image.value = e.target.files[0]) : "";
};
const store = useStore();

let carousel_data = computed(() => store.getters.getAdminData);
carousel_data.value.length ? "" : store.dispatch("fetchAdmin");
const edit_carousel = async (id) => {
  model_type.value = "edit";
  edit_id.value = id;
  await axios
    .get(`api/v1/admin/carousel/` + id)
    .then((res) => {
      console.log(res.data);
      msg_add_carousel_.value = res.data.msg;
      add_carousel_title.value = res.data.title;
      add_carousel_slug.value = res.data.slug;
      add_carousel_discription.value = res.data.description;
      add_carousel_background_clr.value = res.data.background_clr;
      category.value = res.data.category;
      image.value = res.data.image;
    })
    .catch((e) => console.log(e));
};
const delete_carousel = async (id) => {
  await axios
    .delete(`api/v1/admin/carousel/` + id)
    .then((res) => {
      store.dispatch("fetchAdmin");

      toast({
        message: res.data.msg,
        type: "is-success",
        dismissible: true,
        pauseOnHover: true,
        duration: 2000,
        position: "bottom-right",
      });
    })
    .catch((e) => console.log(e));
};
const add_carousel = async () => {
  let fm = new FormData();
  fm.append("title", add_carousel_title.value);
  fm.append("description", add_carousel_discription.value);
  fm.append("category", category.value);
  fm.append("slug", add_carousel_slug.value);
  fm.append("image", image.value);
  fm.append("background_clr", add_carousel_background_clr.value);

  model_type.value === "carousel"
    ? await axios
        .post(`api/v1/admin/carousel/1`, fm)
        .then((res) => {
          msg_add_carousel_.value = res.data.msg;
          add_carousel_title.value = "";
          add_carousel_discription.value = "";
          add_carousel_background_clr.value = "";
          add_carousel_slug.value = "";
          image.value = "";
          toast({
            message: res.data.msg,
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: "bottom-right",
          });
          store.dispatch("fetchAdmin");
        })
        .catch((e) => console.log(e))
    : await axios
        .patch(`api/v1/admin/carousel/` + edit_id.value, fm)
        .then((res) => {
          store.dispatch("fetchAdmin");
          msg_add_carousel_.value = res.data.msg;
          add_carousel_title.value = "";
          add_carousel_discription.value = "";
          add_carousel_background_clr.value = "";
          add_carousel_slug.value = "";
          image.value = "";
          toast({
            message: res.data.msg,
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: "bottom-right",
          });
        })
        .catch((e) => console.log(e));
};
</script>
<style Scoped></style>
