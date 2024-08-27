<template>
  <section class="field">
    <form class="field" @submit.prevent="add_category(model_type)">
      <label class="label">Add {{ model_type }}</label>
      <div class="field">
        <div class="control m-2">
          <div class="file is-centered is-boxed is-success has-name">
            <label class="file-label">
              <input
                class="file-input"
                type="file"
                name="resume"
                v-on:change="file_upload($event, 'trending')"
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
          <input
            class="input m-2"
            type="text"
            placeholder="name"
            v-model="add_category_"
            maxlength="225"
            required
          />
          <input
            class="input m-2 is-success"
            type="text"
            placeholder="slug"
            v-model="add_category_slug"
            maxlength="50"
            required
          />
        </div>

        <div class="control m-2 is-success">
          <button class="button is-success is-outlined">
            Add {{ model_type }}
          </button>
          <button
            class="button is-warning is-outlined ml-2"
            @click="model_type = 'trending'"
          >
            Cancel
          </button>
        </div>
        <p class="help is-info">{{ msg_add_category_ }}</p>
      </div>
    </form>
    <section class="container">
      <div class="columns is-flex-wrap-wrap" v-if="category_data[5]">
        <div
          class="column card is-2 m-3"
          v-for="cat in category_data[4].trending"
          :key="cat.id"
        >
          <div class="column">
            <div
              class="content is-flex is-justify-content-space-evenly is-align-content-space-evenly"
            >
              {{ cat.name }}
            </div>
            <div
              class="is-flex is-justify-content-space-evenly is-align-content-space-evenly"
            >
              <a><i class="fa fa-pencil" @click="edit_category(cat.id)"></i></a>
              <a
                ><i
                  class="fa fa-trash-o has-text-danger"
                  @click="delete_category(cat.id)"
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
const add_category_slug = defineModel(
  "add_category_slug",
  { default: "" },
  { required: false }
);
const add_category_ = defineModel(
  "add_category_",
  { default: "" },
  { required: false }
);
const msg_add_category_ = ref();
const thumbnail = ref([]);
const edit_id = ref();
const model_type = ref("trending");
const file_upload = (e, key) => {
  key === "trending" ? (thumbnail.value = e.target.files[0]) : "";
};
const store = useStore();

let category_data = computed(() => store.getters.getAdminData);
category_data.value.length ? "" : store.dispatch("fetchAdmin");
const edit_category = async (id) => {
  model_type.value = "edit";
  edit_id.value = id;
  await axios
    .get(`api/v1/admin/trending/` + id)
    .then((res) => {
      msg_add_category_.value = res.data.msg;

      add_category_.value = res.data.name;
      add_category_slug.value = res.data.slug;
      thumbnail.value = res.data.thumbnai;
    })
    .catch((e) => console.log(e));
};
const delete_category = async (id) => {
  await axios
    .delete(`api/v1/admin/trending/` + id)
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
const add_category = async () => {
  let fm = new FormData();
  fm.append("name", add_category_.value);
  fm.append("slug", add_category_slug.value);
  fm.append("thumbnail", thumbnail.value);
  model_type.value === "trending"
    ? await axios
        .post(`api/v1/admin/trending/1`, fm)
        .then((res) => {
          msg_add_category_.value = res.data.msg;
          add_category_.value = "";
          add_category_slug.value = "";
          thumbnail.value = "";
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
        .patch(`api/v1/admin/trending/` + edit_id.value, fm)
        .then((res) => {
          store.dispatch("fetchAdmin");
          add_category_.value = "";
          add_category_slug.value = "";
          thumbnail.value = "";
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
