<template>
    <div class="col s12">
        <div class="page-title">
            <h3>Twoje konto</h3>
        </div>
        <div class="userInfoWrapper img_attachment">
            <div class="photoWrapper">
                <div class="profile" :style='{ backgroundImage: `url("${userInfo.photo}")` }'></div>
            </div>
            <div class="descriptionWrapper">
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
        props: {
            userInfo: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped lang="scss">
    div.userInfoWrapper{
        padding: 20px 15px;
        margin-bottom: 15px;
        -webkit-box-align: center;
        box-align: center;
        align-items: center;
        display: flex;
        .photoWrapper, .descriptionWrapper{
            /*display: inline-block;*/
            /*margin: 0 auto;*/
        }
        .photoWrapper{
            flex-grow: 0;
            flex-shrink: 0;
            margin-left: 16px;
            overflow: hidden;
            position: relative;
            width: 180px;
        }
        .descriptionWrapper{
            box-flex: 1;
            flex-grow: 1;
            flex-shrink: 1;
            flex-basis: 0;
            width: 400px;
        }
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
