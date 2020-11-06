<template>
    <div>
        <div class="app-page">
            <div>
                <div class="row img_attachment">
                    <Loader v-if="loader"/>
                    <div v-else class="col s12 m12 l12">
                        <div>
                            <h3 class="flow-text center">PROCESS : {{processName.toUpperCase()}}</h3>
                        </div>
                    </div>
                    <div class="col s12 m8">
                        <p>{{process}}</p>
                    </div>
                    <div class="col s12 m4">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Process",
        data: () => ({
            loader: true,
            processName: null
        }),
        async mounted() {
            this.processName = this.$route.params.id;
            if (!Object.keys(this.$store.getters.receiveData).length) {
                await this.$store.dispatch('receiveData')
            }
            this.loader = false
        },
        computed: {
            workersInfo() {
                return this.$store.getters.receiveData;
            },
            process() {
                const process = this.workersInfo.reduce((acc, n) => ((acc[n.process] = acc[n.process] || []).push(n), acc), {});
                const dep = Object.entries(process).filter(el => el[0].toLowerCase() === this.processName? el : null)
                return dep
            }
        }
    }
</script>

<style scoped>

</style>
