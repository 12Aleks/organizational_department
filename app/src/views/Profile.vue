<template>
    <div>
        <div class="app-page">
            <div class="row">
                <user-profile />
                <updateUserProfile />
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
        }
    }
</script>

<style scoped>

</style>
