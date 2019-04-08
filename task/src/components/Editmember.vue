<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat slot="activator" class="success">Edit</v-btn>
    <v-card>
      <v-card-title>
        <h2>Edit a Task</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3 grey--text text-darken-3" ref="form">
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
          <v-btn flat class="success" @click="editMember">
            <span>Edit Member</span>
            <v-icon>Edit</v-icon>
          </v-btn>
          
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

export default {
  data() {
    return {
      memberName: '',
      role: '',
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
    ...mapActions(['editMembers']),
    editMember() {
      if(this.$refs.form.validate()) {
        this.loading = true;
        
        const member = {
          memberName: this.memberName,
          role: this.role
        };
        
        //user add member
        this.$store.dispatch('editMembers', { member });
        this.memberName = '',
        this.loading = false;
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
        
        //user edit edit
        this.$store.dispatch('editMembers', { member });
        teamForm.reset();
          
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

