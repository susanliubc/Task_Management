<template>
  <div class="tasks my-3">
    <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
      <span>You have edited a task</span>
      <v-btn flat color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <h1 class="subheading grey--text text-darken-4">Tasks</h1>
    <v-container class="my-2">
      <v-layout column align-center>
        <v-flex class="mt-2">
            <p class="teal--text text-xs-center subheading mt-1">{{ currentUser.firstName }}</p>
            <p class="subheading">{{ currentUser.fullName }}</p>
        </v-flex>
        <v-flex class="mt-1 mb-3">
            <Addtask @taskAdded="snackbar=true" />
        </v-flex>
      </v-layout>
      <v-expansion-panel>
        <v-expansion-panel-content v-for="item in tasks" :key="item.id">
          <v-layout row slot="header" class="py-1" align-center>
            <span>{{ item.title }}</span>

            <v-flex text-xs-right>
                <Edittask v-bind:id="item.id" @taskEdited="snackbar=true"/>
                <v-btn flat icon  left color="grey" @click="deleteTask(item.id)">
                  <v-icon>delete</v-icon>
                </v-btn>
              </v-flex>
          </v-layout>
          <v-card>
            <v-card-text class="ml-2 my-1 grey--text">
              <div class="font-weight-black">Team {{ item.teamName }}</div>
              <div class="font-weight-bold">Due by {{ item.dueDate }}</div>
              <div>{{ item.status }}</div>
              <div>{{ item.content }}</div>
            </v-card-text>
          </v-card>  
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-container>
  </div>
</template>

<script>
import Addtask from '../components/Addtask.vue';
import Edittask from '../components/Edittask.vue';
import { mapState } from 'vuex';
import { mapActions } from 'vuex';

export default {
  components: { 
    Addtask,
    Edittask
  },
  data() {
    return {
      snackbar: false
    }
  },
  methods: {
    ...mapActions(['getCurrUserTasks', 'getCurrentUser']),
    deleteTask(id) {
      console.log('id: ', id);
      this.$store.dispatch('deleteTasks', id);
    }
  },
  computed: {
    ...mapState(['tasks', 'currentUser']),
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  created() {
    this.getCurrentUser();
    this.getCurrUserTasks();
  },
  mounted() {
    this.getCurrentUser();
    this.getCurrUserTasks();
  },
}
</script>
