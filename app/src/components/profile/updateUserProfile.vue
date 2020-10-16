<template>
    <div class="col s12 updateProfile">
        <div class="section img_attachment">
            <div class="subpage-title">
                <h4>Zmiana danych osobowych</h4>
            </div>
            <form class="form">
                <div class="input-field">
                    <input  v-model="name"
                            id="name"
                            type="text"
                            :class="{invalid: $v.name.$dirty && !$v.name.minLength}"
                    >
                    <label for="name">Imię</label>
                    <span class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.minLength">Imię</span>
                </div>
                <div class="input-field">
                    <input
                            v-model="department"
                            id="department"
                            type="text"
                            :class="{invalid: $v.department.$dirty && !$v.department.minLength}"
                    >
                    <label for="department">Zespół</label>
                    <span class="helper-text invalid" v-if="$v.department.$dirty && !$v.department.minLength">Zespół</span>
                </div>
                <div class="input-field">
                    <input
                            v-model="email"
                            id="email"
                            type="text"
                            :class="{invalid: $v.email.$dirty && !$v.email.minLength}"
                    >
                    <label for="email">Email</label>
                    <span class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.minLength">Email</span>
                </div>
                <div class="input-field">
                    <div>
                        <img :src="photo" alt="" v-if="photo" width="30px" height="30px">
                    </div>
                    <input type="file" @change="onFileChanged">
                </div>
                <button class="btn waves-effect waves-light" type="submit" @click="onUpload">
                    Zaktualizuj
                    <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
    import {minLength, email} from 'vuelidate/lib/validators'

    export default {
        name: "updateUserProfile",
        props: {
            userInfo: {
                type: Object,
                required: true
            }
        },
        data: () => ({
            name: '',
            department: '',
            email: '',
            photo: null,
            photoSrc:  null,
        }),
        validations:{
            name: {minLength: minLength(2)},
            department: {minLength: minLength(2)},
            email: {email}
        },

        methods: {
            onFileChanged (event) {
                this.photoSrc = event.target.files[0]
            },
            async onUpload() {
                if(this.$v.$invalid){
                    this.$v.$touch()
                    return
                }
                try{
                    this.photo = null;
                    const photoUpdate = {
                        photo: this.photoSrc
                    };
                    this.photo =  await this.$store.dispatch('onFileChange', photoUpdate );
                    this.$message('Success')
                }catch(e){}
            }
        },
    }
</script>

<style scoped>
</style>
