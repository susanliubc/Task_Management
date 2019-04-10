<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn small flat icon left color="grey" slot="activator">
        <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <h2>Edit a Team</h2>
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
          
          <v-spacer></v-spacer>

          <v-btn flat class="success mx-0 mt-3" @click="editTeam" :loading="loading">Edit Team</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      teamName: '',
      teamId: this.teamId,
      inputRules: [
        v => !!v || 'This field is required',
        v => v && v.length >= 3 || 'Minimum length is 3 characters'
      ],
      loading: false,
      dialog: false
    }
  },
  props: ['teamId'],
  methods: {
    editTeam(id) {
      if(this.$refs.form.validate()) {
        const teamForm = this.$refs.form;
        const team = {
          id: this.teamId,
          team: {
            teamName: this.teamName,
          }
        };
        
        //user edit team
        this.$store.dispatch('editTeams', { team });
        teamForm.reset();
      }
    },
  },
}
</script>

