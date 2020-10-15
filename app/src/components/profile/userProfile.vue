<template>
    <div class="col s6">
        <div class="page-title">
            <h3>Twoje konto</h3>
        </div>
        <div class="userInfoWrapper">
            <div class="promo promo-example">
                <div class="profile" :style='{ backgroundImage: `url("${userInfo.photo}")` }'></div>
                <div class="description">
                    <p><span>Imię i nazwisko:</span> {{userInfo.name}}</p>
                </div>
                <div class="description">
                    <p><span>Zespol:</span> {{userInfo.department}}</p>
                </div>
                <div class="description">
                    <p><span>Twoj e-mail:</span> {{userInfo.email}}</p>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    export default {
        name: "userProfile",
        data: () => ({
            defaultUserPhoto: `../assets/images/profile.jpg`
        }),
        computed: {
            userInfo() {
                return this.$store.getters.info
            }
        }
    }
</script>

<style scoped lang="scss">
    div.userInfoWrapper{
        max-width: 470px;
        display: block;
        margin: 0 auto;
        div.profile{
            max-width: 150px;
            max-height: 150px;
            margin-right: 10px;
            position: relative;
            display: inline-flex;
            display: -webkit-inline-flex;
            align-items: center;
            justify-content: center;
            width: 50vh;
            height: 50vh;
            overflow: hidden;
            background: center center no-repeat;
            background-size: cover;
        }
        div.description{
            span{
             font-weight: 500;
            }
        }
    }

</style>
