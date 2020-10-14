<template>
      <div>
          <div class="grey darken-1 empty-layout">
              <form class="card auth-card" @submit.prevent="submitHandler">
                  <div class="card-content">
                      <span class="card-title">Terma</span>
                      <div class="input-field">
                          <input
                                  id="email"
                                  type="text"
                                  v-model="email"
                                  :class="{invalid: ($v.email.$dirty && !$v.email.email || $v.email.$dirty && !$v.email.required)}"
                          >
                          <label for="email">Email</label>
                          <small v-if="$v.email.$dirty && !$v.email.email" class="helper-text invalid">Niepoprawny email</small>
                          <small v-else-if="$v.email.$dirty && !$v.email.required" class="helper-text invalid">To pole należy wypełnić</small>
                      </div>
                      <div class="input-field">
                          <input
                                  id="password"
                                  type="password"
                                  class="validate"
                                  v-model="password"
                                  :class="{invalid: ($v.password.$dirty && !$v.password.required || $v.password.$dirty && !$v.password.minLength)}"
                          >
                          <label for="password">Hasło</label>
                          <small v-if="$v.password.$dirty && !$v.password.required" class="helper-text invalid">To pole należy wypełnić</small>
                          <small v-else-if="$v.password.$dirty && !$v.password.minLength" class="helper-text invalid">Hasło jest za krótkie, minimalna długość - {{$v.password.$params.minLength.min}} znaków</small>
                      </div>
                      <div class="input-field">
                          <input
                                  id="name"
                                  type="text"
                                  class="validate"
                                  v-model.trim="name"
                                  :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
                          >
                          <label for="name">Imię</label>
                          <small v-if='$v.name.$dirty && !$v.name.required' class="helper-text invalid">To pole należy wypełnić</small>
                      </div>
                      <div class="input-field">
                          <input
                                  id="department"
                                  type="text"
                                  class="validate"
                                  v-model.trim="department"
                                  :class="{invalid: ($v.department.$dirty && !$v.department.required)}"
                          >
                          <label for="department">Zespół</label>
                          <small v-if='$v.department.$dirty && !$v.department.required' class="helper-text invalid">To pole należy wypełnić</small>
                      </div>
                      <p>
                          <label>
                              <input type="checkbox" />
                              <span>Zgadzam się z regulaminem</span>
                          </label>
                      </p>
                  </div>
                  <div class="card-action">
                      <div>
                          <button
                                  class="btn waves-effect waves-light auth-submit"
                                  type="submit"
                          >
                              Zarejestrować Się
                              <i class="material-icons right">send</i>
                          </button>
                      </div>
                      <p class="center">
                          Masz już konto?
                          <router-link to="/login">Zaloguj!</router-link>
                      </p>
                  </div>
              </form>

          </div>
      </div>
</template>

<script>
    import {required, minLength, email} from 'vuelidate/lib/validators'
    export default {
        name: "Registration",
        data: () => ({
            name: '',
            email: '',
            password: '',
            department: ''
        }),
        validations: {
            email: {
                required,
                email
            },
            password: {
                minLength: minLength(6),
                required
            },
            name: {
                required
            },
            department: {
                required
            }
        },
        methods: {
            async submitHandler(){
               if(this.$v.$invalid){
                   this.$v.$touch();
                   return
               }
               const formRegData = {
                   name: this.name,
                   email: this.email,
                   password: this.password,
                   department: this.department,
               };
               try{
                   await this.$store.dispatch('registrations', formRegData);
                   this.$router.push('/')
               }catch(e){}
            }
        }
    }
</script>

<style scoped>

</style>
