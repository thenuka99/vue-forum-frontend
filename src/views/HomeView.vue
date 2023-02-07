<template>
  <div class="grid bg-blue-800 p-4 text-white text-justify grid-cols-5">
    <img src="../assets/vector.png" alt="" class=" w-72 m-auto col-span-2">

    <p class=" col-span-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
      inventore eligendi exercitationem labore repellat recusandae, temporibus
      iusto velit vero optio non, corporis dicta sit? Totam labore impedit
      laboriosam. Molestiae, similique.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta odit quae fugit
      quos, porro enim repellat
      asperiores voluptate distinctio. Fuga esse error magnam nobis quas fugiat vitae unde expedita repudiandae. Lorem
      ipsum dolor sit amet, consectetur adipisicing elit. Porro possimus sed debitis quis, non quas nemo eum? Tempore
      minima accusamus quas id nemo provident aut quod quia, nesciunt eligendi atque.
    </p>
  </div>
  <div class="div flex flex-row-reverse ml-4">
    <button
      class=" p-3 mx-5 mt-4 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 text-center">
      <router-link to="/addforum"><i class="fa fa-add"></i> add new forum</router-link>
    </button>
  </div>
  <div>
    <!-- content -->
    <div class="div px-5 py-4">
      <div class="grid grid-cols-4 gap-1 screen-md:block">
        <!-- forum categories -->
        <div class="div bg-slate-50 rounded-lg  shadow-lg screen-md:mb-4">
          <CategoryListComponent />
        </div>
        <!-- forums -->
        <div class="col-span-3 bg-slate-50 rounded-lg pb-5 shadow-lg">
          <PostListComponent :posts="postState.posts" />

          <!-- pagination -->
          <PaginationComponent :getPage="getPage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PostListComponent from "@/components/PostListComponent.vue";
import CategoryListComponent from "@/components/CategoryListComponent.vue";
import PaginationComponent from '@/components/PaginationComponent.vue';

export default {
  name: "HomeView",
  computed: mapGetters({
    postState: "getPostState",
  }),
  created: function () {
    this.$watch(
      () => this.$route.query,
      () => {
        this.$store.dispatch("getAllPosts", this.$route.query.page);
        console.log("query", this.$route.query.page)
      },
    ),
      this.$store.dispatch("getAllPosts", this.$route.query.page);
  },
  methods: {
    getPage(page) {
      this.page = page
      this.$router.push({ name: "home", query: { page: page } })
    }
  },
  components: {
    PostListComponent,
    CategoryListComponent,
    PaginationComponent,
  }
};
</script>
