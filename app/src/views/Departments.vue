<template>
    <div>
        <div class="app-page">
            <div>
                  <div class="page-title">
                            <h3>Zespoły</h3>
                        </div>
                        <div class="row img_attachment">
                            <div class="col s3 m3" v-for="(value, name, index) in process" :key="index">
                                     <h6>Process: {{name}}</h6>
                                     <div v-for="v in $options.filters.departmentFilter(value)" :key="index">
                                         Zespol: {{v}}
                                     </div>

                            </div>
                        </div>
                    </div>
                </div>
    </div>
</template>

<script>
    import M from "materialize-css";

    export default {
        name: "Departments",
        data: () => ({
            loader: false
        }),
        async mounted() {
            this.instance = M.Tabs.init(this.$refs.tabs);
            if (!Object.keys(this.$store.getters.receiveData).length) {
                await this.$store.dispatch('receiveData');
            }
        },
        computed: {
            workersInfo() {
                this.loader = true;
                return this.$store.getters.receiveData;
            },
            process(){
                const process = this.workersInfo.reduce((acc, n) => ((acc[n.process] = acc[n.process] || []).push(n), acc), {});
                this.loader = false;
                return process;
            }
        },
        beforeDestroy() {
            if (this.instance && this.instance.distroy) {
                this.instance.distroy
            }
        }
    }
</script>

<style scoped lang="scss">
    .img_attachment {
        background-image: url("../assets/images/terma_0.png");
        height: -webkit-calc(100vh - 253px);
        height: calc(100vh - 253px);
    }
    .tabs-vertical {
        .tabs {
            height: auto;
            -ms-flex-direction: column;
            -webkit-flex-direction: column;
            flex-direction: column;
            display: -webkit-flex;
            display: flex;

        }

        .tab {
            width: 100%;

            .active {
                -moz-transition: border-color .5s ease;
                -o-transition: border-color .5s ease;
                -webkit-transition: border-color .5s ease;
                transition: border-color .5s ease;
                border-right: 3px solid #424242;
            }

            :hover {
                border-right: 3px solid #eeeeee;
            }
        }

        .indicator {
            display: none;
        }

        .tab-content {
            display : none
        }

        > .tab-content .active{
            display : block
        }
    }
</style>
