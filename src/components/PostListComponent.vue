<template>
    <ul role="list" class="p-6 divide-y divide-black">
        <li v-for="post in posts" v-bind:key="post._id" class="flex py-4 first:pt-0 last:pb-0">
            <div class="ml-3 w-full overflow-hidden ">
                <router-link :to="`post/${post._id}`">
                    <p class="text-sm font-medium text-slate-900 text-left">{{ post.title }}</p>
                </router-link>
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
</template>

<script>
import moment from 'moment';

export default {
    props: ['posts'],
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