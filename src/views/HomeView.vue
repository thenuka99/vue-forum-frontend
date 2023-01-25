<template>
  <div class="div bg-blue-800 p-4 text-white text-justify mx-5">
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
    inventore eligendi exercitationem labore repellat recusandae, temporibus
    iusto velit vero optio non, corporis dicta sit? Totam labore impedit
    laboriosam. Molestiae, similique.
  </div>
  <div class="div flex flex-row-reverse ml-4">
    <button class="btn p-3 mx-5 mt-4 bg-green-500 rounded-xl">
      <router-link to="/addforum"><i class="fa fa-add"></i> add new forum</router-link>
    </button>
  </div>
  <div>
    <!-- content -->
    <div class="div px-5 py-4">
      <div class="grid grid-cols-3 gap-1">
        <!-- forum categories -->
        <div class="div bg-slate-100 rounded-lg">
          <div class="heading text-left py-4 pl-4 font-semibold">Forums</div>
          <ul class="px-3 pb-2 divide-y divide-slate-300">
            <li v-for="category in categoryState.categories" v-bind:key="category._id"
              class="text-left px-1 font-normal  ">
              {{ category.name }}
            </li>
          </ul>
        </div>
        <!-- forums -->
        <div class="col-span-2 bg-slate-50 rounded-lg">
          <ul role="list" class="p-6 divide-y divide-slate-200">
            <li v-for="post in postState.posts" v-bind:key="post._id" class="flex py-4 first:pt-0 last:pb-0">
              <div class="ml-3 w-full overflow-hidden ">
                <p class="text-sm font-medium text-slate-900 text-left">{{ post.title }}</p>
                <p class="text-sm text-slate-500 truncate text-left"><i class="fa fa-heart text-red-600"></i> {{
                  post.votes.length
                }} | <i class="fa fa-comment"></i> {{ post.comments.length }}</p>
              </div>
              <div class="w-full  overflow-hidden text-xs">
                <p class=" text-right">{{ formatDate(post.updatedAt) }}</p>
                <img class="h-10 w-10 rounded-full float-right"
                  :src="post.addedBy.imageurl" alt="" />
              </div>
            </li>
          </ul>
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
      pageNo: '',
    }
  },
  computed: mapGetters({
    categoryState: "getCategoryState",
    postState: "getPostState",
  }),
  created: function () {
    this.$store.dispatch("getAllCategories");
    this.$store.dispatch("getAllPosts");
  },
  methods: {
     formatDate(value) {
      if (value) {
        return moment(String(value)).format('MMMM Do YYYY, h:mm:ss a')
      }
    }
  }
};
</script>
