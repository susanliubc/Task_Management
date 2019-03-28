<template>
    <v-dialog max-width="600px" v-model="dialog">
        <v-btn flat slot="activator" class="success">
            <span>Sign Up</span>
            <v-icon right>add_circle_outline</v-icon>
        </v-btn>
        <v-card>
            <v-card-title>
                <h2>Sign Up</h2>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3 grey--text text-darken-3" ref="form" @submit.prevent="submitSignupForm">
                    <v-text-field label="First Name" type="text" :rules="inputRules" required v-model="firstName" prepend-icon="person"></v-text-field>
                    <v-text-field label="Last Name" type="text" :rules="inputRules" required v-model="lastName" prepend-icon="person"></v-text-field>
                    <v-text-field label="Email" type="email" :rules="emailRules" required v-model="email" prepend-icon="email"></v-text-field>
                    <v-text-field label="Password" type="password" :rules="passwordRules" required v-model="password" prepend-icon="lock"></v-text-field>
                    <v-btn class="success mx-0 mt-3" type="submit" :loading="loading">Sign Up</v-btn>
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
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            loading: false,
            inputRules: [
                v => !!v || 'This field is required',
                v => v && v.length >= 3 || 'Minimum length is 3 characters'
            ],
            emailRules: [
                v => !!v || 'Email is required',
                v => /\S+@\S+\.\S+/.test(v) || 'Email must be valid'
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v => v && v.length >= 6  || 'Password must have at least 6 characters'
            ]
        }
    },
    methods: {
        submitSignupForm() {
            if(this.$refs.form.validate()) {
                this.loading = true;
                const signupForm = this.$refs.form;
                
                //sign up the user
                this.$store.dispatch('userSignup', {
                    email: this.email, 
                    password: this.password,
                    firstName: this.firstName,
                    lastName: this.lastName
                });
                signupForm.reset();  
                this.loading = false; 
                this.dialog = false;    
            }
        }
    },
}
</script>



