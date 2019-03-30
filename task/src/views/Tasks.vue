<template>
  <div class="tasks my-3">
    <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
      <span>You have editd a new task</span>
      <v-btn flat color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <h1 class="subheading grey--text text-darken-4">Tasks</h1>
    <v-container class="my-5">
      
      <v-expansion-panel>
        <v-expansion-panel-content v-for="(task,index) in Tasks" :key="index">
          <div slot="header" class="py-1">{{task.title}}</div>
          <v-card>
            <v-card-text class="px-4 grey--text">
              <div class="font-weight-bold">Due by {{task.dueDate}}</div>
              <div>{{task.content}}</div>
            </v-card-text>
          </v-card>
          <div class="ml-3 mb-2">
            <Edittask @taskEdited="snackbar=true"/>
            <v-btn class="red lighten-2 white--text" @click="deleteTask">
              <span>Delete</span>
              <v-icon>delete_forever</v-icon>
            </v-btn>
          </div> 
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-container>
  </div>
</template>

<script>
import firebase from '@/fb';
import Edittask from '../components/Edittask.vue';

export default {
  components: { 
    Edittask
  },
  data() {
    return {
      tasks: [],
      snackbar: false
    }
  },
  //Fix here
  methods: {
    deleteTask(id) {
      return this.$store.state.tasks.filter(task => task.id !== id)
    },
    getTasks() {
      this.$store.dispatch('getTasks');
    }
  },
  computed: {
    Tasks() {
      return this.$store.state.tasks;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  created() {
    this.getTasks();
  },
}
</script>
