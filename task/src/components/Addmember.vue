<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat slot="activator" class="success">Add Member</v-btn>
    <v-card>
      <v-card-title>
        <h2>Add a New Member</h2>
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

          <v-data-table
            :items="candidates"
            class="elevation-1"
            hide-actions
            hide-headers
          >
            <template v-slot:items="props">
              <td>{{ props.item.firstName }}</td>
              <td class="text-xs-right">{{ props.item.lastName }}</td>
              <td class="text-xs-right">{{ props.item.fullName }}</td>
              <td class="text-xs-right"><v-btn small flat icon left color="grey" @click="addMember"><v-icon>add_circle</v-icon></v-btn></td>
            </template>
          </v-data-table>

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
    searchMember() {

        let search = this.search;
        const db = firebase.firestore();
        console.log('search: ', search);

        db.collection('users').where('firstName','==', search).get()
          .then(querySnapshot => {
            return querySnapshot.forEach(doc => {
              let candidates = doc.data();
            });
          })
          .catch(error => console.log('Searchmember error: ', error.message))

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
        
        //user add member
        this.$store.dispatch('addMembers', { member });
        memberForm.reset();
          
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

