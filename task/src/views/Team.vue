<template>
  <div class="team my-3">
    <h1 class="subheading grey--text text-darken-4">Team</h1>
    <v-container class="my-5">
      <v-layout>
        <div>
          <Addteam />
        </div>
        <v-flex row xs12 sm6 md4 lg3 v-for="person in myTeams" :key="person.name">
          <v-card flat class="text-xs-center ma-3">
            <v-card-title>
              <v-select label="teams" :items="teams" prepend-icon="group">
              </v-select>
              <v-btn flat class="success" @click="selectTeam">
                <span>Select Team</span>
              </v-btn>
              <div class="h3">{{team.teamName}}</div>
            </v-card-title>

            <v-card-text>
              <div class="subheading">{{person.name}}</div>
              <div class="grey--text">{{person.role}}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn flat color="grey">
                <v-icon small left>message</v-icon>
                <span>Message</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Addteam from '../components/Addteam.vue';

export default {
  components: { Addteam },
  data() {
    return {
      team: [
        {name: 'Tom', role: 'UI Developer', avatar: '/avatar_1.png'},
        {name: 'Cathy', role: 'Web Developer', avatar: '/avatar_2.png'},
        {name: 'Mickey', role: 'Web Developer', avatar: '/avatar_3.png'},
        {name: 'Jack', role: 'Designer', avatar: '/avatar_4.png'},
        {name: 'Becky', role: 'Team Leader', avatar: '/avatar_5.png'},
      ],
    }
  },
  methods: {
    seleactTeam() {
      //ADD CONTENT HERE
    }
  },
  computed: {
    myTeams() {
      this.$store.state.teams;
    },
    isAdmin() {
      return true;
    }
  }
}
</script>