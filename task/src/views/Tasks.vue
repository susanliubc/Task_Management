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
export default {
  data() {
    return {
      tasks: [
        {title: 'Design a new mockup for homepage ', member: 'Tom', dueDate: 'Jan 13th, 2019', status: 'Done', content: 'Include wireframes for the design to show the features of the new product'},
        {title: 'Code up the homepage ', member: 'Mike', dueDate: 'Jan 21th, 2019', status: 'Progress', content: 'Use React.js and Materialize as front end frameworks for coding'},
        {title: 'Design a logo', member: 'Jack', dueDate: 'Jan 23th, 2019', status: 'Progress', content: 'Apply logomakr as the tool to design a professional logo for the new product'},
        {title: 'Add a survey form', member: 'Mickey', dueDate: 'Jan 30th, 2019', status: 'Todo', content: 'Add survey form to link to the backend database and server'}
      ]
    }
  },
  computed: {
    myTasks() {
      return this.tasks.filter(task => task.member === 'Tom');
    }
  }
}
</script>
