<template>
    <div>
        <div class="app-page">
            <div>
                <div class="page-title">
                    <h3>Zespoły</h3>
                </div>
                <div class="row img_attachment">
                    <div class="col">
                        <div class="tabordion">
                            <section v-for="(value, name, index) in process" :key="value.index" :id="name">
                                <input type="radio" name="sections" :id="`${name}-${index}`" checked >
                                <label :for="`${name}-${index}`" class="grey lighten-2">{{name}}</label>
                                <article>
                                    <h5>{{name}}</h5>
                                    <div  v-for="department in $options.filters.departmentsFilter(value)" :key="department">
                                        <Sections  :value="department"/>
                                    </div>
                                </article>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import M from "materialize-css";
    import Sections from "@/views/Sections";

    export default {
        name: "Departments",
        data: () => ({
            loader: false,
        }),
        async mounted() {
            this.instance =  M.Tabs.init(this.$refs.tabs);
            if (!Object.keys(this.$store.getters.receiveData).length) {
                await this.$store.dispatch('receiveData');
            }
        },
        components: {
          Sections
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
        position: relative;
    }
    .tabordion {
        color: #333;
        display: block;
        font-family: arial, sans-serif;
        margin: auto;
        position: relative;
        /*width: 80%;*/
    }

    .tabordion input[name="sections"] {
        left: -9999px;
        position: absolute;
        top: -9999px;
    }

    .tabordion section {
        display: block;
    }

    .tabordion section label {
        border:1px solid #fff;
        background-color: #d3d3d363;
        cursor: pointer;
        display: block;
        font-size: 0.9em;
        padding: 8px 16px;
        position: relative;
        width: 180px;
        z-index:100;
    }

    .tabordion section article {
        display: none;
        left: 200px;
        /*min-width: 300px;*/
        /*width: 100%;*/
        white-space: nowrap;
        padding: 0 0 0 21px;
        position: absolute;
        top: 0;
        @media(max-width: 767.98px){
            min-width: 300px;
            white-space: inherit;
        }
    }


    .tabordion input[name="sections"]:checked + label {
        background: #eee;
        color: #bbb;
    }

    .tabordion input[name="sections"]:checked ~ article {
        display: block;
    }


    @media (max-width: 533px) {

        h1 {
            width: 100%;
        }

        .tabordion {
            width: 100%;
        }

        .tabordion section label {
            font-size: 1em;
            width: 160px;
        }

        .tabordion section article {
            left: 200px;
            min-width: 270px;
        }

        .tabordion section article:after {
            background-color: #ccc;
            bottom: 0;
            content: "";
            display: block;
            left:-199px;
            position: absolute;
            top: 0;
            /*width: 200px;*/

        }

    }


    @media (max-width: 768px) {
        h1 {
            width: 96%;
        }

        .tabordion {
            width: 96%;
        }
    }


    @media (min-width: 1366px) {
        h1 {
            width: 70%;
        }

        .tabordion {
            width: 70%;
        }
    }


</style>
