<template>

  <!-- post page -->
  <!-- add forum btn -->
  <div class="div flex flex-row-reverse ml-4">
    <add-forum-btn-component/>
  </div>

  <!-- content -->
  <div class="div px-5 py-4">
    <div class="grid grid-cols-4 gap-3 screen-md:block">
      <!-- forum categories -->
      <div class="div bg-white rounded-lg  shadow-lg screen-md:mb-4">
        <CategoryListComponent />
      </div>

      <!-- forum -->
      <div class="col-span-3">
        <div class=" bg-white rounded-lg pb-5 shadow-lg">
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
            <button class=" px-3 rounded-md bg-slate-300 mr-2 hover:bg-slate-400 hover:text-white" @click="postState.post.votes.includes(userState.user._id) ? removeLike() : addLike()"><i
                :class="[postState.post.votes.includes(userState.user._id) ? 'fa fa-thumbs-up text-green-600' : 'fa fa-thumbs-up text-gray-600']"></i>
              {{ postState.post.votes.length }}</button>
            <button v-if="postState.post.addedBy._id == userState.user._id"
              class=" px-3 rounded-md bg-slate-300 mr-2 hover:bg-slate-400 hover:text-white"><router-link
                :to="`/editforum/${postState.post._id}`">Edit</router-link></button>
            <button v-if="postState.post.addedBy._id == userState.user._id"
              class=" px-3 rounded-md bg-slate-300 mr-2 hover:bg-slate-400 hover:text-white"
              @click="deletePost(postState.post._id)">Delete</button>
          </div>
        </div>
        
        <h1 class=" mt-5 text-left font-bold">Answers :</h1>
        <!-- answers -->
        <div class=" bg-white rounded-lg pb-5 shadow-lg divide-slate-300 divide-y-2"
          v-if="postState.post.comments.length > 0">
          <div v-for="comment in postState.post.comments" v-bind:key="comment._id" class=" mx-2">
            <div class="w-full overflow-hidden text-xs flex ">
              <img class="h-8 w-8 rounded-full ml-4 my-4" :src="comment.addedBy.imageurl" alt="" />
              <div class=" flex-col ml-2  my-4 w-full">
                <p class=" text-left font-bold text-md">{{ comment.addedBy.name }}</p>
                <p class=" text-left">{{ formatDate(comment.updatedAt) }}</p>
              </div>
            </div>
            <div class=" mx-4 my-3">
              <p class=" text-justify mt-3">{{ comment.content }}</p>
            </div>
            <!-- btn sec -->
            <div class="flex mb-2 ml-3">
              <button v-if="comment.addedBy._id == userState.user._id"
                class=" px-3 rounded-md bg-slate-300 mr-2 hover:bg-slate-400 hover:text-white"
                @click="setEditComment(comment.content, comment._id)">Edit</button>
              <button v-if="comment.addedBy._id == userState.user._id"
                class=" px-3 rounded-md bg-slate-300 mr-2 hover:bg-slate-400 hover:text-white"
                @click="deleteComment(comment._id)">Delete</button>
            </div>
          </div>
        </div>
        
        <!-- add comment -->
        <div class=" bg-white rounded-lg shadow-lg px-5 mt-2">
          <form class=" grid pt-10 pb-5" @submit.prevent="addComment" method="POST">
            <div class="">
              <textarea id="content" name="content" type="text" v-model="content" autocomplete="content" required=""
                class="relative block w-full h-20 appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2"
                placeholder="Add Your Answer" />
            </div>
            <div>
              <button type="submit"
                class=" group relative flex w-fit float-right rounded-md border border-transparent bg-indigo-600 py-2 px-4 mx-auto text-sm font-medium text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- edit comment sec -->
  <div id="popup-modal" v-if="popup"
    class="fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full justify-center"
    style="background-color:rgba(0, 0, 0, 0.400)">
    <div class="relative bg-white rounded-lg shadow self-center px-20  max-w-md m-auto">
      <button type="button" @click="closePopup()"
        class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-red-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
        data-modal-hide="popup-modal">
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"></path>
        </svg>
        <span class="sr-only">Close modal</span>
      </button>
      <form class=" grid py-20" @submit.prevent="EditComment" method="POST">
        <div class="">
          <input id="content" name="content" type="text" v-model="editedContent" autocomplete="content" required=""
            class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2"
            placeholder="Edit Answer" />
        </div>
        <div>
          <button type="submit"
            class=" group relative flex w-fit justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 mx-auto text-sm font-medium text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import CategoryListComponent from '@/components/CategoryListComponent.vue';
import { mapGetters } from 'vuex';
import AddForumBtnComponent from '@/components/AddForumBtnComponent.vue';

export default {
  created() {
    this.$store.dispatch("getPost", this.$route.params.postId)
  },
  data() {
    return {
      popup: false,
      content: '',
      editedContent: '',
      commentId: ''
    }
  },
  computed: mapGetters({
    postState: "getPostState",
    userState: "getUserState",
  }),
  components: {
    CategoryListComponent,
    AddForumBtnComponent
  },
  methods: {
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MMMM Do YYYY, h:mm a')
      }
    },
    deletePost(id) {
      this.$store.dispatch("deletePost", id)
      this.$router.go(-1)
    },
    deleteComment(cid) {
      this.$store.dispatch("deleteComment", { postId: this.$route.params.postId, commentId: cid })
    },
    addComment() {
      this.$store.dispatch("addComment", {
        postId: this.$route.params.postId,
        content: this.content,
        addedBy: this.userState.user._id
      })
      this.closePopup()
    },
    setEditComment(content, commentId) {
      this.commentId = commentId
      this.editedContent = content
      this.popup = true
    },
    closePopup() {
      this.popup = false
    },
    EditComment() {
      this.$store.dispatch("editComment", {
        postId: this.$route.params.postId,
        commentId: this.commentId,
        content: this.editedContent,
      })
      this.popup = false
    },
    addLike(){
      this.$store.dispatch("like", {
        postId: this.$route.params.postId,
        addedBy: this.userState.user._id
      })
    },
    removeLike(){
      this.$store.dispatch("unlike", {
        postId: this.$route.params.postId,
        addedBy: this.userState.user._id
      })
    },
  }
}
</script>

<style>

</style>