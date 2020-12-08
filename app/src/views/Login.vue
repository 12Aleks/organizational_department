<template>
    <div>
        <div class="grey darken-1 empty-layout">
            <form class="card auth-card" @submit.prevent="submitHandler">
                <div class="card-content">
                    <span class="card-title center">Terma</span>
                    <div class="input-field">
                        <input
                                id="email"
                                type="text"
                                class="validate"
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
                </div>
                <div class="card-action">
                    <div>
                        <button
                                class="btn waves-effect waves-light auth-submit"
                                type="submit"
                        >
                            Zaloguj
                            <i class="material-icons right">send</i>
                        </button>
                    </div>

                    <p class="center">
                        Nie masz konta?
                        <router-link to="/registration">Załóż je teraz.</router-link>
                    </p>
                </div>
            </form>

        </div>
    </div>
</template>

<script>
    import {email, minLength, required} from 'vuelidate/lib/validators'
    import information from "../message/information";

    export default {
        name: "Login",
        data: () => ({
            email: '',
            password: ''
        }),
      metaInfo() {
        return {
          title: this.$titleApp('Logowanie')
        }
      },
        validations: {
            email: {
                required,
                email
            },
            password: {
                minLength: minLength(6),
                required
            }
        },
        mounted(){
            if(information[this.$route.query.message]){
                this.$message(information[this.$route.query.message])
            }
        },
        methods:{
          async submitHandler() {
                if(this.$v.$invalid){
                    this.$v.$touch()
                    return
                }
                const formData = {
                    email: this.email,
                    password: this.password
                };
                try{
                    await this.$store.dispatch('login', formData)
                    this.$router.push('/')
                }catch(e){}

            }
        }
    }
</script>

<style scoped >
</style>
