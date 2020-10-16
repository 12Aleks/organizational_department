<template>
    <div>
        <div class="app-page">
            <div class="row">
                <user-profile  :userInfo="userInfo"/>
                <updateUserProfile :userInfo="userInfo" />
            </div>
        </div>
    </div>
</template>

<script>

    import userProfile from "../components/profile/userProfile";
    import updateUserProfile from "../components/profile/updateUserProfile";

    export default {
        name: "Profile",
        data: () => ({
           name: ''
        }),
        components: {
            userProfile,
            updateUserProfile
        },
        computed: {
            userInfo() {
                return this.$store.getters.info
            }
        }
    }
</script>

<style scoped lang='scss'>


</style>
