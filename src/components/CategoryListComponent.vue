<template>
    <div class="heading text-left py-4 pl-4 font-semibold">Forums</div>
           <ul class="px-3 pb-2 divide-y divide-slate-300" >
             <li v-for="category in categoryState.categories" v-bind:key="category._id "
               class="text-left px-1 font-normal " @click="resetPage() ">
               <router-link :to="{name:'categorypage',params:{categoryId:category._id}, query: { page: 1},}">
               <button>{{ category.name }}</button>
             </router-link>
             </li>
           </ul>
 </template>
 
 <script>
 import { mapGetters } from 'vuex';

 export default {
     computed: mapGetters({
     categoryState: "getCategoryState",
   }),
   created:function(){
     this.$store.dispatch("getAllCategories");
   },
   methods:{
     resetPage() {
       this.$store.dispatch("resetPage")
     },
   }
 }
 </script>
 
 <style>
 
 </style>