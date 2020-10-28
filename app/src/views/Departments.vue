<template>
    <div>
        <div class="app-page">
            <div>
                <div class="page-title">
                    <h3>Zespoły</h3>
                </div>
                <div class="row img_attachment">
                    <div class="tabs-vertical ">
                        <div class="col s4 m3 l2">
                            <ul class="tabs" ref="tabs">
                                <li class="tab">
                                    <a class="waves-effect waves-cyan" href="#appsDir"><i class="zmdi zmdi-apps"></i>Apps</a>
                                </li>
                                <li class="tab">
                                    <a class="waves-effect waves-cyan" href="#emailDir"><i class="zmdi zmdi-email"></i>Email</a>
                                </li>
                                <li class="tab">
                                    <a class="waves-effect waves-cyan" href="#codeDir"><i class="zmdi zmdi-code"></i>Code</a>
                                </li>
                            </ul>
                        </div>
                        <div class="col s8 m9 l6">
                            <div id="appsDir" class="tab-content"> One</div>
                            <div id="emailDir" class="tab-content"> Two</div>
                            <div id="codeDir" class="tab-content">Three</div>
                        </div>
                    </div>
                    <!--                            <div class="col s3 m3" v-for="(value, name, index) in process" :key="index">-->
                    <!--                                     <h6>Process: {{name}}</h6>-->
                    <!--                                     <div v-for="v in $options.filters.departmentFilter(value)" :key="index">-->
                    <!--                                         Zespol: {{v}}-->
                    <!--                                     </div>-->

                    <!--                            </div>-->
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
    $tabs-underline-color: red;
    $tabs-text-color: green;

    .img_attachment {
        background-image: url("../assets/images/terma_0.png");
        height: -webkit-calc(100vh - 205px);
        height: calc(100vh - 205px);
    }
    .tabs-vertical {
        .tabs {
            height: auto;
            -ms-flex-direction: column;
            -webkit-flex-direction: column;
            flex-direction: column;
        }
        .tab {
            width: 100%;
            -webkit-box-flex: 1;
            -webkit-flex-grow: 1;
            flex-grow: 1;
            display: block;
            float: left;
            text-align: left;
            line-height: 48px;
            height: 48px;
            padding: 0;
            margin: 0;
            text-transform: uppercase;
            text-overflow: ellipsis;
            .active {
                -moz-transition: border-color .5s ease;
                -o-transition: border-color .5s ease;
                -webkit-transition: border-color .5s ease;
                transition: border-color .5s ease;
                border-right: 3px solid $tabs-underline-color;
                color: $tabs-text-color;
            }
            :hover {}
            a {
                color: $tabs-text-color;
                display: block;
                width: 100%;
                height: 100%;
                text-overflow: ellipsis;
                overflow: hidden;
                &:hover {
                    color: lighten($tabs-text-color, 20%);
                }
            }
            &.disabled a {
                color: lighten($tabs-text-color, 20%);
                cursor: default;
            }
        }
        .indicator {
            display: none;
        }
    }
</style>
