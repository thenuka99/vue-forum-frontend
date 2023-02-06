<template>
  <div>
    <!-- add forum btn -->
    <div class="div flex flex-row-reverse ml-4">
      <button
        class=" p-3 mx-5 mt-4 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 text-center">
        <router-link to="/addforum"><i class="fa fa-add"></i> add new forum</router-link>
      </button>
    </div>

    <!-- content -->
    <div class="div px-5 py-4">
      <div class="grid grid-cols-4 gap-3 screen-md:block">
        <!-- forum categories -->
        <div class="div bg-slate-50 rounded-lg  shadow-lg screen-md:mb-4">
          <CategoryListComponent />
        </div>

        <!-- forum -->
        <div class="col-span-3">
          <div class=" bg-slate-50 rounded-lg pb-5 shadow-lg">
            <div class="w-full overflow-hidden text-xs flex">
              <img class="h-12 w-12 rounded-full ml-4 my-4" :src="postState.post.addedBy.imageurl" alt="" />
              <div class=" flex-col ml-2  my-4 w-full">
                <p class=" text-left font-bold text-lg">{{ postState.post.addedBy.name }}</p>
                <p class=" text-left">{{ formatDate(postState.post.updatedAt) }}</p>
              </div>
            </div>
            <div class=" mx-4 my-3">
              <h1 class=" font-extrabold text-2xl text-left">{{ postState.post.title }}</h1>
              <p class=" text-justify mt-3">{{ postState.post.content }}</p>
            </div>
            <div class="flex mx-4">
              <button class=" px-3 rounded-md bg-slate-300 mr-2 hover:bg-slate-400 hover:text-white"><i :class= "[postState.post.votes.includes(userState.user._id)?'fa fa-thumbs-up text-green-600':'fa fa-thumbs-up text-gray-600']"></i> {{ postState.post.votes.length }}</button>
              <button v-if="postState.post.addedBy._id==userState.user._id" class=" px-3 rounded-md bg-slate-300 mr-2 hover:bg-slate-400 hover:text-white">Edit</button>
              <button v-if="postState.post.addedBy._id==userState.user._id" class=" px-3 rounded-md bg-slate-300 mr-2 hover:bg-slate-400 hover:text-white">Delete</button>
            </div>
          </div>
          <h1 class=" mt-5 text-left font-bold">Answers :</h1>
          <!-- comments -->
          <div class=" bg-slate-50 rounded-lg pb-5 shadow-lg" v-if="postState.post.comments.length>0">
            <div class="w-full overflow-hidden text-xs flex divide-y divide-black" v-for="comment in postState.post.comments" v-bind:key="comment._id">
              <img class="h-8 w-8 rounded-full ml-4 my-4" :src="comment.addedBy.imageurl" alt="" />
              <div class=" flex-col ml-2  my-4 w-full">
                <p class=" text-left font-bold text-md">{{ comment.addedBy.name }}</p>
                <p class=" text-left">{{ formatDate(comment.updatedAt) }}</p>
              </div>
            </div>
            <div class=" mx-4 my-3">
              <p class=" text-justify mt-3">{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import CategoryListComponent from '@/components/CategoryListComponent.vue';
import { mapGetters } from 'vuex';

export default {
  created() {
    this.$store.dispatch("getPost", this.$route.params.postId)
  },
  computed: mapGetters({
    postState: "getPostState",
    userState: "getUserState",
  }),
  components: {
    CategoryListComponent
  },
  methods: {
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MMMM Do YYYY, h:mm:ss a')
      }
    },
  },
}
</script>

<style>

</style>