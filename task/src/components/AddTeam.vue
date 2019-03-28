<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat slot="activator" class="success">Add Team</v-btn>
    <v-card>
      <v-card-title>
        <h2>Add a New Team</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3 grey--text text-darken-3" ref="form">
          <v-text-field label="Team Name" v-model="teamName" type="text" :rules="inputRules" required prepend-icon="group">
          </v-text-field>
          <v-text-field label="Search Member" v-model="search" :rules="inputRules" required prepend-icon="face">
          </v-text-field>
          <v-btn flat class="success" @click="addMember">
            <span>Add Member</span>
            <v-icon>add</v-icon>
          </v-btn>
          <v-textarea label="Members" v-for="member in filteredMembers" :key="member.firstName" prepend-icon="person">
          </v-textarea>
          <v-select label="Roles" :items="roles" prepend-icon="how_to_reg">
          </v-select>
          
          <v-spacer></v-spacer>

          <v-btn flat class="success mx-0 mt-3" @click="submit" :loading="loading">Add Task</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import format from 'date-fns/format';
import firebase from '@/fb';

export default {
  data() {
    return {
      team: '',
      members: '',
      search: '',
      roles: [Designer, Web_Developer, QA, Leader],
      inputRules: [
        v => !!v || 'This field is required',
        v => v && v.length >= 3 || 'Minimum length is 3 characters'
      ],
      loading: false,
      dialog: false
    }
  },
  methods: {
    submit() {
      if(this.$refs.form.validate()) {
        this.loading = true;
        const taskForm = this.$refs.form;
        const task = {
          teamName: this.teamName, 
          member: this.member,
          role: this.role
        };
        
        //user add task
        this.$store.dispatch('addTeams', { team });
        taskForm.reset();
          
        this.loading = false;
        this.dialog = false;
        this.$emit('teamAdded');
      }
    }
  },
  computed: {
    filteredMembers() {
      return this.members.filter(member => (member.firsName + member.lastName).match(this.search) )
    }
  }
}
</script>

