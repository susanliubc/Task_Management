<template>
  <h3 class="team my-3">
    <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
      <span>You have editded a team</span>
      <v-btn flat color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <h1 class="subheading grey--text text-darken-4">Team</h1>
    <v-container class="my-5">
      <v-layout>
        <v-flex row xs12 sm6 md4 lg3>
          <v-card flat class="text-xs-center ma-3" v-for="(item,index) in teams" :key="index">
            <v-card-title >
              <h3 class="subheading grey--text text-darken-4">Current Team</h3>
              <h4>{{ item.teamName }}</h4>
              <h4>{{ item.description }}</h4> 
            </v-card-title>
            
            <div class="ml-3 mb-2">
              <Addteam />
              <Editeam @teamEdited="snackbar=true" />
              <v-btn class="red lighten-2 white--text" @click="deleteTeams">
                <span>Delete</span>
                <v-icon right>delete_forever</v-icon>
              </v-btn>
          </div>

            <v-card-text>
              <div class="subheading">{{ item.member.memberName }}</div>
              <div class="blue--text">{{ item.member.role }}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn flat color="grey">
                <v-icon small left>message</v-icon>
                <span>Message</span>
              </v-btn>
            </v-card-actions>
          </v-card>
          <div class="ml-3 mb-2">
            <v-btn class="red lighten-2 white--text" @click="deleteMembers">
              <span>Delete</span>
              <v-icon right>delete_forever</v-icon>
            </v-btn>
          </div> 
        </v-flex>
      </v-layout>
    </v-container>
  </h3>
</template>

<script>
import Addteam from '../components/Addteam.vue';
//import Editteam from '../components/Editteam.vue';
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  components: { 
    Addteam,
    //Editteam,
  },
  data() {
    return {
      snackbar: false
    }
  },
  methods: {
    ...mapActions(['deleteTeams', 'deleteMembers', 'getTeams','getMembers'])
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