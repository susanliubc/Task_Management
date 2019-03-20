<template>
  <div class="tasks my-3">
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
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-container>
  </div>
</template>

<script>
import db from '@/fb';

export default {
  data() {
    return {
      tasks: []
    }
  },
  computed: {
    myTasks() {
      return this.tasks.filter(task => task.member === 'Tom');
    }
  },
  created() {
    db.collection('tasks').onSnapshot(res => {
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
