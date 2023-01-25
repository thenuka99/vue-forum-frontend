<template>
    <!-- signin form -->
    <div
        class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6  lg:px-8 fixed inset-0 z-10 overflow-y-auto bg-blue-50">
        <div class=" w-full  max-w-md space-y-8 bg-white py-16 px-12 rounded-lg drop-shadow-2xl">
            <div>
                <h2 class=" mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 ">
                    Add Forum
                </h2>
            </div>

            <form class="mt-8 space-y-6" @submit.prevent="submit" method="POST">
                <div class="-space-y-px rounded-md shadow-sm">
                    <div>
                        <input id="title" name="title" type="title" v-model="forum.title" autocomplete="title"
                            required=""
                            class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2"
                            placeholder="e.g. Is there an R function for finding the index of an element in a vector?" />
                    </div>
                    <div>
                        <textarea id="content" name="content" type="content" v-model="forum.content"
                            autocomplete="content" required=""
                            class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2"
                            placeholder="Add your content" />
                    </div>
                    <div>
                        <select name="" id="" v-model="forum.categoryis"
                            class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2">
                            <option value="">Select category</option>
                            <option :value="category._id" v-bind:key="category._id"
                                v-for="category in categoryState.categories">{{ category.name }}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="submit"
                        class=" group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ">
                        Submit
                    </button>
                </div>
            </form>
            <pre>{{ forum }}{{ userState.user._id }}</pre>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: mapGetters({
        categoryState: "getCategoryState",
        userState: "getUserState",
    }),
    data() {
        return {
            forum: {
                title: '',
                content: '',
                categoryis: '',
            }
        }
    },
    methods: {
        submit: async function () {
            this.$store.dispatch("createPost", { title: this.forum.title, content: this.forum.content, categoryis: this.forum.categoryis, addedBy: this.userState.user._id });
        },
    }
}
</script>

<style>

</style>