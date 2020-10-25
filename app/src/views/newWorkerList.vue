<template>
    <div>
        <div class="app-page">
            <div>
                <div class="page-title">
                    <h3>Nowi pracownicy</h3>
                </div>

                <div class="row">
                    <div class="col s12 m12">
                        <!--                                {{workersInfo}}-->
                        <ul>
                            <li v-for="(value, name, index) in workersInfo" :key="index" >
                                {{ value | newWorkersFilter  }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "newWorkerList",
        async mounted() {
            await this.$store.dispatch('receiveData')
        },
        computed: {
            workersInfo() {
                return this.$store.getters.receiveData
            }
        }
    }
</script>

<style scoped>

</style>