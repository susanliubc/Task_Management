<template>
  <h3 class="team my-3">
    <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
      <span>You have editded a team</span>
      <v-btn flat color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <h1 class="subheading grey--text text-darken-4">Team</h1>
    <v-container class="my-5">
      <v-layout>
        <v-flex row xs12>
          <div class="ml-3 mb-2">
            <h3 class="grey--text text-darken-3">Add a New Team</h3>
            <v-form class="px-3 grey--text text-darken-3" ref="form">
              <v-text-field 
                label="Team Name" 
                v-model="teamName" 
                type="text" 
                :rules="inputRules" 
                required 
                prepend-icon="group">
              </v-text-field>
              <v-btn flat class="success" @click="addTeam">
                <span>Add Team</span>
                <v-icon right>add</v-icon>
              </v-btn>
            </v-form>
          </div>
          <v-card flat class="text-xs-center ma-3" v-for="item in teams" :key="item.id">
            <v-card-title >
              <h3 class="subheading grey--text text-darken-4">Current Team: 
                <span class="black--text">{{ item.team.teamName }}</span>
              </h3>
              <v-flex text-xs-right>
                <Editteam :teamId="item.id" />
                <v-btn small flat icon  left color="grey" @click="deleteTeam(item.id)">
                  <v-icon>delete</v-icon>
                </v-btn>
              </v-flex>
            </v-card-title>
            <v-card-text>
              <div class="ml-3 mb-2">
                <Addmember :teamId="item.id" />
              </div>

              <v-data-table
                :headers="headers"
                :items="teams"
                class="elevation-1 mt-3"
                hide-actions
              >
                <template v-slot:headers="props">
                  <th
                    v-for="header in props.headers"
                    :key="header.text"
                  >{{ header.text }}</th>
                </template>

                <template slot="items" slot-scope="props">
                  <td>{{ props.item.memberName }}</td>
                  <td class="text-xs-right">{{ props.item.role }}</td>
                  <td class="text-xs-right">
                    <Editmember :teamId="item.id" />
                    <v-btn small flat icon  left color="grey" @click="deleteMembers">
                      <v-icon right>delete</v-icon>
                    </v-btn>
                  </td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
           
        </v-flex>
      </v-layout>
    </v-container>
  </h3>
</template>

<script>
import Editteam from '../components/Editteam.vue';
import Addmember from '../components/Addmember.vue';
import Editmember from '../components/Editmember.vue';
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  components: {
    Editteam, 
    Addmember,
    Editmember,
  },
  data() {
    return {
      teamName: '',
      headers: [
        {
          text: 'First Name', 
          align: left,
          value: 'name'
        },
        {
          text: 'Role', 
          value: 'role'
        },
        {
          text: 'Actions', 
          value: 'name'
        }
      ],
      snackbar: false,
      inputRules: [
        v => !!v || 'This field is required',
        v => v && v.length >= 3 || 'Minimum length is 3 characters'
      ],
    }
  },
  methods: {
    ...mapActions(['deleteMembers', 'getTeams','getMembers']),
    addTeam() {
      if(this.$refs.form.validate()) {
        const teamForm = this.$refs.form;
        const team = {
          teamName: this.teamName,
        };
        
        //user add team
        this.$store.dispatch('addTeams', { team });
        teamForm.reset();
      }
    },
    
    deleteTeam(id) {
      console.log('id: ', id);
      this.$store.dispatch('deleteTeams', id);
    }
  },
  computed: {
    ...mapState(['teams']),
    ...mapGetters(['isAuthenticated']),
    isAdmin() {
      return true;
    }
  },
  created() {
    this.getTeams();
    this.getMembers();
  },
}
</script>