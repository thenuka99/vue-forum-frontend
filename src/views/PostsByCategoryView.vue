<template>
    <div class=" bg-slate-200 h-full">
        <div class="div bg-blue-800 p-4 text-white text-justify mx-5">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
            inventore eligendi exercitationem labore repellat recusandae, temporibus
            iusto velit vero optio non, corporis dicta sit? Totam labore impedit
            laboriosam. Molestiae, similique.
        </div>
        <div class="div flex flex-row-reverse ml-4">
            <add-forum-btn-component/>
        </div>
        <div>
            <!-- content -->
            <div class="div px-5 py-4">
                <div class="grid grid-cols-4 gap-1 screen-md:block">
                    <!-- forum categories -->
                    <div class="div bg-slate-50 rounded-lg  shadow-lg screen-md:mb-4">
                        <CategoryListComponent />
                    </div>
                    <!-- forums -->
                    <div class="col-span-3 bg-slate-50 rounded-lg pb-5 shadow-lg">
                        <PostListComponent :posts="postState.posts" />

                        <!-- pagination -->
                        <PaginationComponent :getPage="getPage" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import PostListComponent from "@/components/PostListComponent.vue";
import CategoryListComponent from "@/components/CategoryListComponent.vue";
import PaginationComponent from '@/components/PaginationComponent.vue';
import AddForumBtnComponent from '@/components/AddForumBtnComponent.vue';

export default {
    name: "HomeView",
    data() {
        return {
            page: 1,
        }
    },
    computed: mapGetters({
        postState: "getPostState",
    }),
    created: function () {
        this.$watch(
            () => this.$route.params,
            () => {
                this.getAllPostsOfCategory();
            },
        ),
            this.$watch(
                () => this.$route.query,
                () => {
                    this.getAllPostsOfCategory();
                    console.log("query", this.$route.query.page)
                },
            ),
            this.getAllPostsOfCategory();
    },
    methods: {
        getAllPostsOfCategory() {
            this.$store.dispatch("getAllPostsOfCategory", { id: this.$route.params.categoryId, page: this.$route.query.page });
        },
        getPage(page) {
            this.page = page
            this.$router.push({ name: "categorypage", params: { id: this.$route.params.categoryId }, query: { page: page } })
        }
    },
    components: {
        PostListComponent,
        CategoryListComponent,
        PaginationComponent,
        AddForumBtnComponent
    }
};
</script>
