<template>
  <div class="dashboard my-3">
    <h1 class="subheading grey--text text-darken-4">Dashboard</h1>
    <v-container class="my-5">
      <v-layout row class="mb-3">
        <v-tooltip top>
          <v-btn small flat class="grey lighten-2" @click="sortBy('title')" slot="activator">
            <v-icon left small>folder</v-icon>
            <span class="caption text-lowercase">By task name</span>
          </v-btn>
          <span>Sort task by name</span>
        </v-tooltip>
        <v-tooltip bottom>
          <v-btn small flat class="grey lighten-2" @click="sortBy('member')" slot="activator">
            <v-icon left small>person</v-icon>
            <span class="caption text-lowercase">By member</span>
          </v-btn>
          <span>Sort task by member</span>
        </v-tooltip>
      </v-layout>

      <v-card flat class="pa-3" v-for="task in tasks" :key="task.title">
        <v-layout row wrap :class="`pa-3 task ${task.status}`">
          <v-flex xs12 md6>
            <div class="caption blue--text">Task Title</div>
            <div>{{task.title}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption blue--text">Member</div>
            <div>{{task.member}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption blue--text">Due Date</div>
            <div>{{task.dueDate}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="right">
              <v-chip small :class="`${task.status} white--text caption my-2`">{{task.status}}</v-chip>
            </div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
    
  </div>
</template>

<script>

  export default {
    data() {
      return {
        tasks: [
          {title: 'Design a new mockup for homepage ', member: 'Tom', dueDate: 'Jan 13th, 2019', status: 'Done'},
          {title: 'Code up the homepage ', member: 'Mike', dueDate: 'Jan 21th, 2019', status: 'Progress'},
          {title: 'Design a logo', member: 'Jack', dueDate: 'Jan 23th, 2019', status: 'Progress'},
          {title: 'Add a survey form', member: 'Mickey', dueDate: 'Jan 30th, 2019', status: 'Todo'}
        ]
      }
    },
    methods: {
      sortBy(prop) {
        this.tasks.sort((a,b) => a[prop] < b[prop] ? -1 : 1);
      }
    }
  }
</script>

<style>
.task.Done {
  border-left: 4px solid #3cd1c2;
}
.task.Progress {
  border-left: 4px solid #FEE835;
}
.task.Todo {
  border-left: 4px solid orangered;
}
.v-chip.Done {
  background: #3cd1c2
}
.v-chip.Progress {
  background: #FEE835
}
.v-chip.Todo {
  background: orangered
}
</style>