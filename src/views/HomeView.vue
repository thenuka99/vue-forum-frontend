<template>
  <div class="div bg-blue-800 p-4 text-white text-justify mx-5">
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
    inventore eligendi exercitationem labore repellat recusandae, temporibus
    iusto velit vero optio non, corporis dicta sit? Totam labore impedit
    laboriosam. Molestiae, similique.
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
        <div class="div bg-slate-50 rounded-lg screen-md:mb-4 shadow-lg">
          <div class="heading text-left py-4 pl-4 font-semibold">Forums</div>
          <ul class="px-3 pb-2 divide-y divide-slate-300">
            <li v-for="category in categoryState.categories" v-bind:key="category._id"
              class="text-left px-1 font-normal " @click="getPostsbyCategory(category._id)">
              <button>{{ category.name }}</button>
            </li>
          </ul>
        </div>
        <!-- forums -->
        <div class="col-span-3 bg-slate-50 rounded-lg pb-5 shadow-lg">
          <ul role="list" class="p-6 divide-y divide-black">
            <li v-for="post in postState.posts" v-bind:key="post._id" class="flex py-4 first:pt-0 last:pb-0">
              <div class="ml-3 w-full overflow-hidden ">
                <p class="text-sm font-medium text-slate-900 text-left">{{ post.title }}</p>
                <p class="text-sm text-slate-500 truncate text-left"><i class="fa fa-heart text-red-600"></i> {{
                  post.votes.length
                }} | <i class="fa fa-comment"></i> {{ post.comments.length }}</p>
              </div>
              <div class="w-full  overflow-hidden text-xs">
                <p class=" text-right">{{ formatDate(post.updatedAt) }}</p>
                <img class="h-10 w-10 rounded-full float-right" :src="post.addedBy.imageurl" alt="" />
              </div>
            </li>
          </ul>

          <!-- pagination -->
          <div class="flex flex-col items-center">
            <!-- Help text -->
            <span class="text-sm text-gray-700 dark:text-gray-400">
              <span class="font-semibold text-gray-900 ">{{ postState.page }}</span> of <span
                class="font-semibold text-gray-900 ">{{ postState.totalPages }}</span> Pages
            </span>
            <div class="inline-flex mt-2 xs:mt-0">
              <!-- Buttons -->
              <button @click="decrementPage"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <svg aria-hidden="true" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                    clip-rule="evenodd"></path>
                </svg>
                Prev
              </button>

              <button
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ">
                {{ postState.page }}
              </button>

              <button @click="incrementPage"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Next
                <svg aria-hidden="true" class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from 'moment'
export default {
  name: "HomeView",
  data() {
    return {
      categoryId: '',
    }
  },
  computed: mapGetters({
    categoryState: "getCategoryState",
    postState: "getPostState",
  }),
  created: function () {
    this.$store.dispatch("getAllCategories");
    this.$store.dispatch("getAllPosts", this.postState.page);
  },
  methods: {
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MMMM Do YYYY, h:mm:ss a')
      }
    },
    getPostsbyCategory(id) {
      this.$store.dispatch("getAllPostsOfCategory", { id: id, page: this.postState.page });
    },
    incrementPage() {
      if (this.postState.page < this.postState.totalPages) {
        this.$store.dispatch("incrementPage")
        if (this.categoryId == null) {
        this.$store.dispatch("getAllPostsOfCategory", { id: this.categoryId, page: this.postState.page });
      } else {
        this.$store.dispatch("getAllPosts", this.postState.page);
      }
      }
    },
    decrementPage() {
      if (this.postState.page > 1) {
        this.$store.dispatch("decrementPage")
        if (this.categoryId) {
        this.$store.dispatch("getAllPostsOfCategory", { id: this.categoryId, page: this.postState.page });
      } else {
        this.$store.dispatch("getAllPosts", this.postState.page);
      }
      } 
    }
  }
};
</script>
