<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn small flat slot="activator" class="success">Edit Member</v-btn>
    <v-card>
      <v-card-title>
        <h2>Edit a Member</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3 grey--text text-darken-3" ref="form">
          <v-text-field 
            label="Search Member's First Name"  
            v-model="search"
            type="text" 
            :rules="inputRules" 
            required  
            prepend-icon="search">
          </v-text-field>
          <v-btn flat class="success mx-0 mt-3" @click="searchMember">
            <span>search</span>
          </v-btn>

          <v-text-field 
            label="Member" 
            v-model="memberName" 
            type="text" 
            :rules="inputRules" 
            required 
            prepend-icon="person">
          </v-text-field>
          <v-select 
            label="Role" 
            :items="roles" 
            v-model="role" 
            prepend-icon="how_to_reg">
          </v-select>
          
          <v-spacer></v-spacer>

          <v-btn flat class="success mx-0 mt-3" @click="submit" :loading="loading">Edit Task</v-btn>
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
  props: ['teamId'],
  data() {
    return {
      memberName: '',
      role: '',
      search: '',
      roles: ['Designer', 'Web Developer', 'QA', 'Leader'],
      teamId: this.teamId,
      inputRules: [
        v => !!v || 'This field is required',
        v => v && v.length >= 3 || 'Minimum length is 3 characters'
      ],
      loading: false,
      dialog: false
    }
  },
  methods: {
    ...mapActions(['editMembers']),
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
        const memberForm = this.$refs.form;

        const member = {
          teamId: this.teamId,
          member: {
            memberName: this.memberName,
            role: this.role
          }
        };
        
        //user edit member
        this.$store.dispatch('editMembers', { member });
        memberForm.reset();
          
        this.loading = false;
        this.dialog = false;
      }
    }
  },
  computed: {
    ...mapState(['members']),
    // filteredMembers() {
    //   return teams.members.filter(member => (member.firsName + member.lastName).match(this.search) )
    // }
  }
}
</script>

