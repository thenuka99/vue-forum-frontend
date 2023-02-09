<template>
  <h1>user admin page</h1>
  <div class=" bg-slate-200 mx-7 rounded-lg shadow-sm mb-10">
        <table class=" w-full overflow-scroll">
            <thead>
                <th>Name</th>
                <th class=" screen-md:hidden">Email</th>
                <th class=" screen-md:hidden">Created At</th>
                <th class=" screen-md:hidden">Updated At</th>
                <th>Role</th>
                <th>Change Role</th>
            </thead>
            <tbody>
                <tr class="odd:bg-white even:bg-slate-50" v-for="user in userState.users"
                    v-bind:key="user._id">
                    <td>{{ user.name }}</td>
                    <td class=" screen-md:hidden">{{ user.email }}</td>
                    <td class=" screen-md:hidden">{{ formatDate(user.createdAt) }}</td>
                    <td class=" screen-md:hidden">{{ formatDate(user.updatedAt) }}</td>
                    <td v-if="user.isAdmin">Admin</td><td v-else>user</td>
                    <td v-if="user.isAdmin"> <button  @click="changeUserRole(user._id,user.isAdmin)">Remove Admin</button></td>
                    <td v-else><button  @click="changeUserRole(user._id,user.isAdmin)">Make Admin</button></td>
                </tr>
            </tbody>
        </table>
    </div>
    <AdminSpeedMenu/>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import AdminSpeedMenu from '@/components/AdminSpeedMenu.vue'
export default {
    components: { AdminSpeedMenu },
    computed: mapGetters({
        userState: "getUserState",
    }),
    data() {
        return {
        }
    },
    methods: {
        formatDate(value) {
            if (value) {
                return moment(String(value)).format('MMMM Do YYYY, h:mm a')
            }
        },
        changeUserRole(userId,isAdmin){
            this.$store.dispatch('updateUserRole', {_id:userId,isAdmin:!isAdmin})
        },
    },
    created(){
        this.$store.dispatch('getUsers')
    }
}
</script>

<style>

</style>