<template>
    <div class="informationWrapper">
        <div  @click="info"
              class="btn waves-effect waves-light btn-small information"
        ><i data-v-fae5bece="" class="material-icons">info_outline</i></div>
    </div>
</template>

<script>
    export default {
        name: "Information",
        props: ['infoForUser'],
        methods: {
            info(){
                this.$message(this.infoForUser);
            }
        }
    }
</script>

<style scoped lang="scss">
    .informationWrapper{
        position: absolute;
        right: 0;
        top: 0;
        .btn-small.information{
            width: 38px;
            height: 38px;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            -webkit-justify-content: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-align-items: center;
            -ms-flex-align: center;
            align-items: center;
            i {
                font-size: 2rem;
            }
        }
    }

</style>