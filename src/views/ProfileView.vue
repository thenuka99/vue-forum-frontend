<template>

  <!-- profile -->
  <div class="p-16 bg-slate-200">
    <div class="p-8 bg-white shadow-xl mt-24 rounded-lg">
      <!-- user img -->
      <div
        class="relative w-40 h-40 mx-auto rounded-full shadow-2xl  top-0 -mt-24 flex items-center justify-center bg-white">
        <img :src="userState.user.imageurl" alt="" class=" rounded-full ">
      </div>

      <div class="mt-20 text-center border-b pb-12">
        <h1 class="text-4xl font-medium text-gray-700">{{ userState.user.name }} </h1>
        <p class="text-gray-600 text-center font-light lg:px-16 mt-5">{{ userState.user.bio }}</p>
      </div>
      <div class="mt-12 flex flex-col justify-center">
        <!-- post list -->
        <PostListComponent :posts="postState.posts" />
        <!-- pagination -->
        <PaginationComponent :getPage="getPage" />
      </div>
    </div>
  </div>

  <!-- Edit btn -->
  <router-link to="/editprofile">
    <button class=" bg-slate-600 rounded-full text-white fixed right-4 bottom-4 w-12 h-12">
      <i class="fa fa-pen"></i>
    </button>
  </router-link>


</template>

<script>
import { mapGetters } from 'vuex'
import PostListComponent from "@/components/PostListComponent.vue";
import PaginationComponent from '@/components/PaginationComponent.vue';

export default {
  data() {
    return {
      page: 1,
    }
  },
  computed: mapGetters({
    userState: "getUserState",
    postState: "getPostState"
  }),
  created: function () {
    this.$watch(
      () => this.$route.query,
      () => {
        this.getAllPostsOfUser();
      },
    ),
      this.getAllPostsOfUser();
  },
  methods: {
    getAllPostsOfUser() {
      this.$store.dispatch("getAllPostsOfUser", { id: this.userState.user._id, page: this.$route.query.page });
    },
    getPage(page) {
      this.page = page
      this.$router.push({ name: "profile", query: { page: page } })
    }
  },
  components: {
    PostListComponent,
    PaginationComponent
  }
}
</script>

<style>

</style>