// import axios from "axios";
import { createStore } from "vuex";
import jsonData from "../jsondb/jdb";
// const HomePageLoader = {
//   state: () => ({
//     latestProductList: [],
//     caroselImages: [],
//     categoryList: [],
//     allProducts: [],
//     trendingList: [],
//     typeList: [],
//   }),
//   mutations: {
//     setlatestProductList: (state, data) => (state.latestProductList = data),
//     setCategoryList: (state, data) => (state.categoryList = data),
//     setTrendingList: (state, data) => (state.trendingList = data),
//     setAllproducts: (state, data) => (state.allProducts = data),
//     setTypeList: (state, data) => (state.typeList = data),
//     SetcaroselImages: (state, data) => (state.caroselImages = data),
//   },
//   actions: {
//     async fetchlatestProductList({ commit }) {
//       const responce = await axios.get("api/v1/latest-products/");

//       commit("setlatestProductList", responce.data);
//     },
//     async fetchcategory({ commit }) {
//       const responce = await axios.get("api/v1/latest-category/");
//       commit("setCategoryList", responce.data);
//     },
//     async fetchTrending({ commit }) {
//       const responce = await axios.get("api/v1/trending-list/");
//       commit("setTrendingList", responce.data);
//     },
//     async fetchType({ commit }) {
//       let responce = await axios.get("/api/v1/type-list/");
//       commit("setTypeList", responce.data);
//     },
//     async fetchAllProduct({ commit }) {
//       const responce = await axios.get("api/v1/all-products");
//       commit("setAllproducts", responce.data);
//     },
//     async fetchCarouselImage({ commit }) {
//       const responce = await axios.get("api/v1/carosel-images/");

//       commit("SetcaroselImages", responce.data);
//     },
//   },
//   getters: {
//     getlatestProductList: (state) => state.latestProductList,
//     getcategoryList: (state) => state.categoryList,
//     getAllProducts: (state) => state.allProducts,
//     getTrendingList: (state) => state.trendingList,
//     getTypeList: (state) => state.typeList,
//     getcaroselImages: (state) => state.caroselImages,
//   },
// };
// const AdminDashBoard = {
//   state: () => ({ Load_data: [] }),
//   mutations: {
//     setAdminData: (state, data) => (state.Load_data = data),
//   },
//   actions: {
//     async fetchAdmin({ commit }) {
//       let responce = await axios.get("api/v1/admin");
//       commit("setAdminData", responce.data);
//     },
//   },
//   getters: {
//     getAdminData: (state) => state.Load_data,
//   },
// };
export default createStore({
  state: {
    cart: {
      items: [],
    },
    isAuthenticated: false,
    isJson: true,
    token: "",
    isLoading: false,
    data: jsonData,
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem("cart")) {
        state.cart = JSON.parse(localStorage.getItem("cart"));
      } else {
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
      if (localStorage.getItem("token")) {
        state.token = localStorage.getItem("token");
        state.isAuthenticated = true;
      } else {
        state.token = "";
        state.isAuthenticated = false;
      }
    },
    addToCart(state, item) {
      const exists = state.cart.items.filter(
        (i) => i.product.id === item.product.id
      );
      if (exists.length) {
        exists[0].quantity =
          parseInt(exists[0].quantity) + parseInt(item.quantity);
      } else {
        state.cart.items.push(item);
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    setIsLoading(state, status) {
      state.isLoading = status;
    },
    setToken(state, token) {
      state.token = token;
      state.isAuthenticated = true;
    },
    removeToken(state) {
      state.token = "";
      state.isAuthenticated = false;
    },
    clearCart(state) {
      state.cart = { items: [] };
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
  actions: {},
  // modules: { moduleA: HomePageLoader, moduleB: AdminDashBoard },
});
