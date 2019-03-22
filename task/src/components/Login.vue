<template>
    <v-dialog max-width="600px" v-model="dialog">
        <v-btn flat slot="activator">Login</v-btn>
        <v-card>
            <v-card-title>
                <h2 class="grey--text text-darken-3">Login</h2>
            </v-card-title>
        </v-card>
        <v-card-text>
            <v-form class="px-3" ref="form" @submit.prevent="submitLoginForm">
                <v-text-field label="Email" type="email" required :value="email" prepend-icon="email"></v-text-field>
                <v-text-field label="Password" type="password" required :value="password" prepend-icon="lock"></v-text-field>
                <v-btn class="success mx-0 mt-3" type="submit" :loading="loading">Sign Up</v-btn>
            </v-form>
        </v-card-text>
    </v-dialog>
</template>

<script>
import db from '@/fb';

export default {
    data() {
        return {
            dialog: false,
            email: '',
            password: '',
            loading: false
        }
    },
    methods: {
        submitLoginForm() {
            if(this.$refs.form.validate()) {
                this.loading = true;
                const loginForm = this.$refs.form;
                
                //login the user
                auth.signInWithEmailAndPassword(this.email, this.password)
                    .then(cred => {
                        console.log('Login succeed')
                        loginForm.reset()
                    })
                    .catch(err => console.log('Error: ', err))
            }
        }
    }
}
</script>



