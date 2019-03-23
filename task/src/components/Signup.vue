<template>
    <v-dialog max-width="600px" v-model="dialog">
        <v-btn flat slot="activator" class="success">
            <span>Sign Up</span>
            <v-icon right>add_circle_outline</v-icon>
        </v-btn>
        <v-card>
            <v-card-title>
                <h2 class="grey--text text-darken-3">Sign Up</h2>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="form" @submit.prevent="submitSignupForm">
                    <v-text-field label="Email" type="email" required :value="email" prepend-icon="email"></v-text-field>
                    <v-text-field label="Password" type="password" required :value="password" prepend-icon="lock"></v-text-field>
                    <v-btn class="success mx-0 mt-3" type="submit" :loading="loading">Sign Up</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import firebase from '@/fb';

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
        submitSignupForm() {
            if(this.$refs.form.validate()) {
                this.loading = true;
                const signupForm = this.$refs.form;
                
                //sign up the user
                firebase.auth.createUserWithEmailAndPassword(this.email, this.password)
                    .then(cred => {
                        console.log('Sign up succeed')
                        signupForm.reset()
                    })
                    .catch(err => console.log('Error: ', err.message))
            }
        }
    }
}
</script>



