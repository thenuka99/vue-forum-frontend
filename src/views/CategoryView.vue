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
        <table class=" w-full overflow-scroll">
            <thead>
                <th>Name</th>
                <th class=" screen-md:hidden">Added By</th>
                <th class=" screen-md:hidden">Added On</th>
                <th class=" screen-md:hidden">Updated By</th>
                <th class=" screen-md:hidden">Updated On</th>
                <th>Edit</th>
                <th>Delete</th>
            </thead>
            <tbody>
                <tr class="odd:bg-white even:bg-slate-50" v-for="category in categoryState.categories"
                    v-bind:key="category._id">
                    <td>{{ category.name }}</td>
                    <td class=" screen-md:hidden">{{ category.addedBy.name }}</td>
                    <td class=" screen-md:hidden">{{ formatDate(category.createdAt) }}</td>
                    <td class=" screen-md:hidden">{{ category.updatedBy.name }}</td>
                    <td class=" screen-md:hidden">{{ formatDate(category.updatedAt) }}</td>
                    <td><i class="fa fa-pen hover:text-green-500"></i></td>
                    <td><i class="fa fa-trash-can hover:text-red-500"></i></td>

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