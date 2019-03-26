<template>
  <div class="tasks my-3">
    <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
      <span>You have editd a new task</span>
      <v-btn flat color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <h1 class="subheading grey--text text-darken-4">Tasks</h1>
    <v-container class="my-5">
      
      <v-expansion-panel>
        <v-expansion-panel-content v-for="task in myTasks" :key="task.title">
          <div slot="header" class="py-1">{{task.title}}</div>
          <v-card>
            <v-card-text class="px-4 grey--text">
              <div class="font-weight-bold">Due by {{task.dueDate}}</div>
              <div>{{task.content}}</div>
            </v-card-text>
          </v-card>
          <div class="ml-3 mb-2">
            <Edittask @taskEdited="snackbar=true"/>
            <v-btn class="yellow accent-1 red--text" @click="deleteTask">Delete Task</v-btn>
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
  computed: {
    myTasks() {
      return this.tasks.filter(task => task.member === 'Tom');
    }
  },
  created() {
    firebase.firestore().collection('tasks').onSnapshot(res => {
      const changes = res.docChanges();
      changes.forEach(change => {
        if(change.type === 'added') {
          this.tasks.push({
            ...change.doc.data(),
            id: change.doc.id
          })
        }
      })
    })
  }
}
</script>
