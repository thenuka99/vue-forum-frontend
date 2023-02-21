<template>
    <div class=" mx-4 mt-3">
        <search-bar-component />
    </div>

    <div class="div flex flex-row-reverse ml-4">
        <add-forum-btn-component />
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
</template>

<script>
import { mapGetters } from "vuex";
import PostListComponent from "@/components/PostListComponent.vue";
import CategoryListComponent from "@/components/CategoryListComponent.vue";
import PaginationComponent from '@/components/PaginationComponent.vue';
import AddForumBtnComponent from '@/components/AddForumBtnComponent.vue';
import SearchBarComponent from '@/components/SearchBarComponent.vue';

export default {
    name: "HomeView",
    computed: mapGetters({
        postState: "getPostState",
    }),
    created: function () {
        this.$watch(
            () => this.$route.query,
            () => {
                this.$store.dispatch("getAllPosts", this.$route.query.page);
            },
        )
    },
    methods: {
        getPage(page) {
            this.page = page
            this.$router.push({ name: "home", query: { page: page } })
        }
    },
    components: {
        PostListComponent,
        CategoryListComponent,
        PaginationComponent,
        AddForumBtnComponent,
        SearchBarComponent,
    }
};
</script>
