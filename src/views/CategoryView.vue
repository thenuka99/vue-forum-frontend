<template>
    <!--form -->
    <div class=" p-7">
        <form class=" grid grid-cols-7 gap-2" @submit.prevent="submit" method="POST">
            <div class=" col-start-3 col-span-2">
                <input id="name" name="name" type="name" v-model="category.name" autocomplete="name" required=""
                    class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2"
                    placeholder="add category" />
            </div>
            <div>
                <button type="submit"
                    class=" group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ">
                    Submit
                </button>
            </div>
        </form>
    </div>

    <!-- category list -->
    <div class=" bg-slate-200 mx-7 rounded-lg shadow-sm">
        <table>
            <thead>
                <th>Name</th>
                <th>Added By</th>
                <th>Added On</th>
                <th>Updated By</th>
                <th>Updated On</th>
            </thead>
            <tbody>
                <tr class="odd:bg-white even:bg-slate-50" v-for="category in categoryState.categories"
                    v-bind:key="category._id">
                    <td>{{ category.name }}</td>
                    <td>{{ category.addedBy.name }}</td>
                    <td>{{ formatDate(category.createdAt) }}</td>
                    <td>{{ category.updatedBy.name }}</td>
                    <td>{{ formatDate(category.updatedAt) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
    computed: mapGetters({
        categoryState: "getCategoryState",
        userState: "getUserState",
    }),
    data() {
        return {
            category: {
                name: '',
            }
        }
    },
    methods: {
        submit: async function () {
            this.$store.dispatch("createCategory", { name: this.category.name, addedBy: this.userState.user._id, updatedBy: this.userState.user._id });
        },
        formatDate(value) {
            if (value) {
                return moment(String(value)).format('MMMM Do YYYY, h:mm:ss a')
            }
        },
    }
}
</script>

<style>

</style>