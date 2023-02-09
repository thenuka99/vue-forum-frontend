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
    <div class=" bg-slate-200 mx-7 rounded-lg shadow-sm mb-10">
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
                    <td @click="openPopup(category._id, category.name)"><i class="fa fa-pen hover:text-green-500"></i>
                    </td>
                    <td @click="deleteCategory(category._id)"><i class="fa fa-trash-can hover:text-red-500"></i></td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- category edit sec -->
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
            <form class=" grid py-20" @submit.prevent="update" method="POST">
                <div class="">
                    <input id="name" name="name" type="name" v-model="updateCategory.name" autocomplete="name"
                        required=""
                        class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2"
                        placeholder="add category" />
                </div>
                <div>
                    <button type="submit"
                        class=" group relative flex w-fit justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 mx-auto text-sm font-medium text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ">
                        update
                    </button>
                </div>
            </form>
        </div>
    </div>
    <admin-speed-menu />
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import AdminSpeedMenu from '@/components/AdminSpeedMenu.vue'
export default {
    components: { AdminSpeedMenu },
    computed: mapGetters({
        categoryState: "getCategoryState",
        userState: "getUserState",
    }),
    data() {
        return {
            category: {
                name: '',
            },
            updateCategory: {
                _id: '',
                name: '',
            },
            popup: false,
        }
    },
    methods: {
        submit: async function () {
            this.$store.dispatch("createCategory", { name: this.category.name, addedBy: this.userState.user._id, updatedBy: this.userState.user._id });
        },
        update: async function () {
            this.$store.dispatch("updateCategory", { _id: this.updateCategory._id, name: this.updateCategory.name, updatedBy: this.userState.user._id });
            this.closePopup();
        },
        formatDate(value) {
            if (value) {
                return moment(String(value)).format('MMMM Do YYYY, h:mm a')
            }
        },
        deleteCategory(id) {
            this.$store.dispatch("deleteCategory", id);
        },
        openPopup(id, name) {
            this.updateCategory.name = name;
            this.updateCategory._id = id;
            this.popup = !this.popup;
        },
        closePopup() {
            this.popup = false;
        }
    }
}
</script>

<style>

</style>