<template>
    <div>
                <div class="app-page">
                    <div>
                        <div class="page-title">
                            <h3 class="flow-text">Podział zespolów</h3>
                        </div>
                      <div class="row img_attachment">
                        <div class="col s12 m12">
                          <xlsx-convercion-recrument/>
                        </div>
                      </div>
                    </div>
                </div>
    </div>
</template>

<script>
    import xlsxConvercionRecrument from "@/components/conversion/xlsxConvercionRecrument";
    export default {
        name: "Recruitment",
        metaInfo:{
            title: 'Podział zespolów'
        },
        components: {
          xlsxConvercionRecrument
        }
    }
</script>

<style scoped>

</style>
