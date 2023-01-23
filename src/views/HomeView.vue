<template>
  <div class="div bg-blue-800 p-4 text-white text-justify mx-5">
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
    inventore eligendi exercitationem labore repellat recusandae, temporibus
    iusto velit vero optio non, corporis dicta sit? Totam labore impedit
    laboriosam. Molestiae, similique.
  </div>
  <div class="div flex flex-row-reverse ml-4">
    <button class="btn p-3 mx-5 mt-4 bg-green-500 rounded-xl"><i class="fa fa-add"></i> add new forum</button>
  </div>
  <div>
    <div class="div px-5 py-4">
      <div class="grid grid-cols-3 gap-1">
        <div class="div bg-slate-300 rounded-lg">
          <div class="heading text-left py-4 pl-4 font-semibold">Forums</div>
          <!-- <pre>{{categoryState}}</pre> -->
          <div class="div px-3 pb-2 " v-for="category in categoryState.categories" v-bind:key="category.id">
            <div class="div text-left px-1 font-normal border-b-2 ">
              {{ category.name }}</div>
          </div> 
        </div>
        <div class="col-span-2 bg-green-700">07</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import "../assets/tailwind.css";
export default {
  name: "HomeView",
  computed: mapGetters({
    categoryState: "getCategoryState",
  }),
  created: function () {
    this.$store.dispatch("getAllCategories");
  },
};
</script>

