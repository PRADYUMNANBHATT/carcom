<template>
  <section class="field">
    <BaseFormSlot>
      <form class="field" @submit.prevent="add_product(model_type)">
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

        <div v-if="product_data[0] !== undefined">
          <div class="field">
            <label class="label">Category </label>
            <div v-if="!(product_data[0].category === 'no category to show')">
              <div class="select is-success">
                <select v-model="category">
                  <option
                    v-for="cate in product_data[0].category"
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
              v-if="!(product_data[3].cartype === 'no type to show')"
            >
              <div class="select is-success">
                <select v-model="type">
                  <option
                    v-for="trend in product_data[3].cartype"
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
              v-if="!(product_data[4].trending === 'no trending to show')"
            >
              <div class="select is-success">
                <select v-model="trending">
                  <option
                    v-for="trend in product_data[4].trending"
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

          <div class="control m-2 is-success">
            <button
              class="button is-success is-outlined"
              :disabled="Is_Available"
            >
              Add {{ model_type }}
            </button>
            <button
              class="button is-warning is-outlined ml-2"
              @click="model_type = 'product'"
            >
              Cancel
            </button>
          </div>
          <p class="help is-info">{{ msg_add_product_ }}</p>
        </div>
      </form>
    </BaseFormSlot>
    <section class="container">
      <div
        class="page-product columns is-flex-wrap-wrap"
        v-if="product_data[1]"
      >
        <div
          class="column is-3"
          v-for="cat in product_data[1].product"
          :key="cat.id"
        >
          <div class="column">
            <div class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img :src="cat.get_image" alt="Placeholder image" />
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <img :src="cat.get_image" alt="Placeholder image" />
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="title is-4">{{ cat.name }}</p>
                    <p class="subtitle is-6">@johnsmith</p>
                  </div>
                </div>

                <div class="content">
                  {{ cat.description }}
                </div>
              </div>
              <div
                class="is-flex is-justify-content-space-evenly is-align-content-space-evenly"
              >
                <a
                  ><i
                    class="fa fa-pencil has-text-success"
                    @click="edit_product(cat.id)"
                  ></i
                ></a>
                <a
                  ><i
                    class="fa fa-trash-o has-text-danger"
                    @click="delete_product(cat.id)"
                  ></i
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>
<script setup>
import BaseFormSlot from "@/components/BaseFormSlot.vue";
import { ref, defineModel, computed } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import { toast } from "bulma-toast";
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
// const add_category_slug = defineModel(
//   "add_category_slug",
//   { default: "" },
//   { required: false }
// );
const trending = defineModel("trending", { default: "" }, { required: false });
// const add_category_ = defineModel(
//   "add_category_",
//   { default: "" },
//   { required: false }
// );
const file = ref([]);
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
const msg_add_product_ = ref();
// const thumbnail = ref([]);
const edit_id = ref();
const model_type = ref("product");
const file_upload = (e, key) => {
  key === "product" ? (file.value = e.target.files[0]) : "";
};
const store = useStore();
// store.dispatch("fetchAdmin");
let product_data = computed(() => store.getters.getAdminData);
product_data.value.length ? "" : store.dispatch("fetchAdmin");

const edit_product = async (id) => {
  model_type.value = "edit";
  edit_id.value = id;
  await axios
    .get(`api/v1/admin/product/` + id)
    .then((res) => {
      msg_add_product_.value = res.data.msg;

      name.value = res.data.name;
      slug.value = res.data.slug;
      category.value = res.data.category;
      discription.value = res.data.description;
      type.value = res.data.car_type;
      trending.value = res.data.trending;
      file.value = res.data.file;
      price.value = res.data.price;
    })
    .catch((e) => console.log(e));
};
const delete_product = async (id) => {
  await axios
    .delete(`api/v1/admin/product/` + id)
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
const add_product = async () => {
  let fm = new FormData();
  fm.append("name", name.value);
  fm.append("slug", slug.value);
  fm.append("price", price.value);
  fm.append("description", discription.value);
  fm.append("category", category.value);
  fm.append("car_type", type.value);
  fm.append("trending", trending.value);
  fm.append("image", file.value);
  model_type.value === "product"
    ? await axios
        .post("api/v1/admin/product/1", fm)
        .then((res) => {
          store.dispatch("fetchAdmin");
          msg_add_product_.value = res.data.msg;
          name.value = "";
          slug.value = "";
          category.value = "";
          discription.value = "";
          type.value = "";
          trending.value = "";
          file.value = "";
          price.value = "";
          toast({
            message: res.data.msg,
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: "bottom-right",
          });
        })
        .catch((e) => console.log(e))
    : await axios
        .patch(`api/v1/admin/product/` + edit_id.value, fm)
        .then((res) => {
          store.dispatch("fetchAdmin");
          msg_add_product_.value = res.data.msg;
          name.value = "";
          slug.value = "";
          category.value = "";
          discription.value = "";
          type.value = "";
          trending.value = "";
          file.value = "";
          price.value = "";
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
<style Scoped>
.content {
  height: 18px;
  width: 140px;
  padding: 0;
  overflow: hidden;
  position: relative;
  display: flex;
  margin: 0 5px 0 5px;
  text-align: center;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
