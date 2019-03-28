<template>
    <v-dialog max-width="600px" v-model="dialog">
        <v-btn flat slot="activator" class="success">
            <span>Login</span>
            <v-icon right>get_app</v-icon>
        </v-btn>
        <v-card>
            <v-card-title>
                <h2>Login</h2>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3 grey--text text-darken-3" ref="form" @submit.prevent="submitLoginForm">
                    <v-text-field label="Email" type="email" :rules="emailRule" required v-model="email" prepend-icon="email"></v-text-field>
                    <v-text-field label="Password" type="password" :rules="passwordRule" required v-model="password" prepend-icon="lock"></v-text-field>
                    <v-btn class="success mx-0 mt-3" type="submit" :loading="loading">Login</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>


export default {
    data() {
        return {
            dialog: false,
            email: '',
            password: '',
            loading: false,
            emailRule: [
                v => !!v || 'Email is required',
                v => /.+@.+/.test(v) || 'Email must be valid'
            ],
            passwordRule: [
                v => !!v || 'Password is required',
                v => v && v.length >=6  || 'Password must have at least 6 characters'
            ]
        }
    },
    methods: {
        submitLoginForm() {
            if(this.$refs.form.validate()) {
                this.loading = true;
                const loginForm = this.$refs.form;
                
                //login the user
                this.$store.dispatch('userLogin', {
                    email: this.email, 
                    password: this.password
                });
                loginForm.reset();
                this.loading = false;
                this.dialog = false;
            }
        }
    }
}
</script>



