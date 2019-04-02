<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat slot="activator" class="success">Add Team</v-btn>
    <v-card>
      <v-card-title>
        <h2>Add a New Team</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3 grey--text text-darken-3" ref="form">
          <v-text-field 
            label="Team Name" 
            v-model="teamName" 
            type="text" 
            :rules="inputRules" 
            required 
            prepend-icon="group">
          </v-text-field>
          <v-textarea 
            label="Description" 
            v-model="description" 
            type="text" 
            :rules="inputRules" 
            required 
            prepend-icon="description">
          </v-textarea>
          <v-autocomplete 
            placeholder="Search Member" 
            :items="user" 
            :search-input.sync="search" 
            prepend-icon="mdi-database-search">
          </v-autocomplete>

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
          <v-btn flat class="success" @click="addMember">
            <span>Add Member</span>
            <v-icon>add</v-icon>
          </v-btn>
          
          <v-spacer></v-spacer>

          <v-btn flat class="success mx-0 mt-3" @click="submit" :loading="loading">Add Team</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      teamName: '',
      description: '',
      memberName: '',
      role: '',
      model: null,
      search: null,
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
    ...mapActions(['addTeams', 'addMembers']),
    addMember() {
      if(this.$refs.form.validate()) {
        this.loading = true;
        
        const member = {
          memberName: this.memberName,
          role: this.role
        };
        
        //user add member
        this.$store.dispatch('addMembers', { member });
        this.memberName = '',
        this.loading = false;
      }
    },
    submit() {
      if(this.$refs.form.validate()) {
        this.loading = true;
        const teamForm = this.$refs.form;
        const team = {
          teamName: this.teamName, 
          description: this.description,
        };
        const member = {
          memberName: this.memberName,
          role: this.role
        };
        
        //user add team
        this.$store.dispatch('addTeams', { team });
        this.$store.dispatch('addMembers', { member });
        teamForm.reset();
          
        this.loading = false;
        this.dialog = false;
      }
    }
  },
  computed: {
    ...mapState(['teams','user']),
    // filteredMembers() {
    //   return teams.members.filter(member => (member.firsName + member.lastName).match(this.search) )
    // }
  }
}
</script>

