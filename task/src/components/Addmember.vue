<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat slot="activator" class="success">Add Team</v-btn>
    <v-card>
      <v-card-title>
        <h2>Add a New Member</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3 grey--text text-darken-3" ref="form" @submit.prevent="addMember">
          <v-textfield 
            label="Search Member"  
            v-model="search"
            type="text" 
            :rules="inputRules" 
            required  
            prepend-icon="mdi-database-search">
          </v-textfield>
          <v-btn flat class="success" @click="searchMember">
            <span>add</span>
          </v-btn>

          <v-textfield 
            label="Member" 
            v-model="memberName" 
            type="text" 
            :rules="inputRules" 
            required 
            prepend-icon="person">
          </v-textfield>
          <v-select 
            label="Role" 
            :items="roles" 
            v-model="role" 
            prepend-icon="how_to_reg">
          </v-select>
          
          <v-spacer></v-spacer>

          <v-btn flat class="success mx-0 mt-3" @click="submit" :loading="loading">Add Member</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';
import { mapState } from 'vuex';
import firebase from '@/fb.js';

export default {
  data() {
    return {
      teamName: '',
      description: '',
      memberName: '',
      role: '',
      model: null,
      search: '',
      roles: ['Designer', 'Web Developer', 'QA', 'Leader'],
      inputRules: [
        v => !!v || 'This field is required',
        v => v && v.length >= 3 || 'Minimum length is 3 characters'
      ],
      loading: false,
      dialog: false
    }
  },
  methods: {
    ...mapActions(['addMembers']),
    searchMember() {
      if(this.$refs.form.validate()) {
        search = this.search;
        const db = firebase.firestore();

        db.collections('users').where('firstName','==', search).get()
          .then(doc => {
            console.log(doc.data().firstName, doc.data().initials)
          })
          .catch(error => console.log('Addmember error: ', error.message))
      }
    },
    submit() {
      if(this.$refs.form.validate()) {
        this.loading = true;
        const teamForm = this.$refs.form;

        const member = {
          memberName: this.memberName,
          role: this.role
        };
        
        //user add team
        this.$store.dispatch('addMembers', { member });
        teamForm.reset();
          
        this.loading = false;
        this.dialog = false;
      }
    }
  },
  computed: {
    ...mapState(['user']),
    // filteredMembers() {
    //   return teams.members.filter(member => (member.firsName + member.lastName).match(this.search) )
    // }
  }
}
</script>

