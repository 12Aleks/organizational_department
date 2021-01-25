<template>
  <div class="col s12 m9 l9 xl10 h-100">
    <div class="section">
      <div class="page-subtitle">
        <h4>Zmiana danych osobowych</h4>
      </div>
      <form class="form" @submit.prevent="onUpload">
        <div class="input-field">
          <input  v-model.trim="name"
                  id="name"
                  type="text"
                  :class="{invalid: $v.name.$dirty && !$v.name.minLength}"
          >
          <label for="name">Imię</label>
          <span class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.minLength">Imię</span>
        </div>
        <div class="input-field">
          <input
              v-model.trim="department"
              id="department"
              type="text"
              :class="{invalid: $v.department.$dirty && !$v.department.minLength}"
          >
          <label for="department">Zespół</label>
          <span class="helper-text invalid" v-if="$v.department.$dirty && !$v.department.minLength">Zespół</span>
        </div>
        <div class="input-field">
          <input
              v-model.trim="email"
              id="email"
              type="text"
              :class="{invalid: $v.email.$dirty && !$v.email.email}"
          >
          <label for="email">Email</label>
          <span class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.email">Email</span>
        </div>
        <div class="input-field" >
          <div id="preview" v-if="photoSrc">
          </div>
        </div>
        <div class="input-field" >
               <span class="btn btn-file">
                 Zmień zdjęcie profilowe<input type="file" @change="onFileChanged">
               </span>
        </div>
        <button class="btn" type="submit">
          Zaktualizuj swoje dane
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {minLength, email} from 'vuelidate/lib/validators'
import {userPhoto} from "@/main"
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
    photoSrc: null,
  }),
  validations:{
    name: {minLength: minLength(2)},
    department: {minLength: minLength(2)},
    email: {email}
  },

  methods: {
    onFileChanged (event) {
      this.photoSrc = event.target.files[0]
      if (this.photoSrc) {
        let fr = new FileReader();
        fr.addEventListener("load", function () {
          document.getElementById('preview').style.backgroundImage = "url(" + fr.result + ")";
        }, false);
        fr.readAsDataURL(this.photoSrc)
      }
    },
    async onUpload() {
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }
      try{
        this.photo = null;
        const updateData = {
          name: this.name.length? this.name : this.userInfo.name,
          email: this.email.length? this.email : this.userInfo.email,
          department: this.department.length? this.department : this.userInfo.department,
          photo: this.photoSrc
        };
        this.photo = await this.$store.dispatch('onFileChange', updateData );
        userPhoto.$emit("userchange", this.photo);
        this.$message('Success')
      }catch(e){}
    }
  },
}
</script>

<style scoped lang="scss">
.section {
  padding: 20px 31px;
  h4{
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 100;
  }
  .btn-file {
    position: relative;
    overflow: hidden;
  }
  button.btn.waves-effect.waves-light {
    margin-top: 15px;
  }
  .btn{
    background-color: $blue_grey_darken-2;
    transition: all .7s;

    &:hover {
      transition: all .7s;
      background-color: $terma-color;
    }
  }
  .btn-file input[type=file] {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    font-size: 100px;
    text-align: right;
    filter: alpha(opacity=0);
    opacity: 0;
    outline: none;
    background: white;
    cursor: inherit;
    display: block;
  }
  div.profile, div#preview {
    max-width: 105px;
    max-height: 105px;
  }
}

</style>
