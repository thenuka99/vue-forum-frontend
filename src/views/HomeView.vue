<template>
  <div class="home">
    <p class=" text-red-800 bg-red-900">buyadbhafuy1hqiw</p>
    <pre>{{ categoryState.categories }}</pre>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import "../assets/tailwind.css"
export default {
  name: 'HomeView',
  computed: mapGetters({
    categoryState: "getCategoryState",
  }),
  created:function(){
    this.$store.dispatch('getAllCategories')
  },
}
</script>

