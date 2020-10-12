<template>
    <div>
        <div class="app-page">
            <div class="row">
                   <div class="col s6">
                       <div class="page-title">
                           <h3>Twoje konto</h3>
                       </div>
                       <div>
                           <img src="" alt="" class="circle responsive-img">
                       </div>




                   </div>
                   <div class="col s6">
                       <div class="page-title">
                           <h3>Zmiana danych osobowych</h3>
                       </div>
                       <div class="section">
                       <div  class="page-subtitle">
                           <h4 >Zmień  imię lub nazwę zespołu</h4>
                       </div>
                       <form class="form">
                           <div class="input-field">
                               <input
                                       id="name"
                                       type="text"
                               >
                               <label for="name">Imię</label>
                               <span
                                       class="helper-text invalid">Imię</span>
                           </div>
                           <div class="input-field">
                               <input
                                       id="departments"
                                       type="text"
                               >
                               <label for="departments">Zespół</label>
                               <span
                                       class="helper-text invalid">Zespół</span>
                           </div>

                           <button class="btn waves-effect waves-light" type="submit">
                               Zaktualizuj
                               <i class="material-icons right">send</i>
                           </button>
                       </form>
                       </div>
                       <div class="section">
                       <div class="page-subtitle">
                           <h4>Zmień swoje zdjęcie profilowe</h4>
                       </div>
                          <div>
                             <img :src="photo" alt="" v-if="photo" width="30px" height="30px">
                          </div>
                           <input type="file" @change="onFileChanged">
                           <button class="btn waves-effect waves-light" @click="onUpload">Zaktualizuj zdjęcie <i class="material-icons right">cloud_upload</i></button>



                   </div>
                   </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {required} from 'vuelidate/lib/validators'


    export default {
        name: "Profile",
        data: () => ({
            name: '',
            department: '',
            photo: null,
            photoSrc:  null,
        }),
        validations: {
           name: {required},
           department: {required}
        },
        methods: {
            onFileChanged (event) {
                this.photoSrc = event.target.files[0]
            },
           async onUpload() {
                try{
                    this.photo = null;
                    const photoUpdate = {
                        photo: this.photoSrc
                    };
                 this.photo =  await this.$store.dispatch('onFileChange', photoUpdate )
                    this.$message('Success')
                }catch(e){}
            }
        },

    }
</script>

<style scoped>

</style>
