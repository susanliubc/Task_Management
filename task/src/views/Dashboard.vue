<template>
  <div class="dashboard my-3">
    <h1 class="subheading grey--text text-darken-4">Dashboard</h1>
    <v-container class="my-5">
      <v-layout row class="mb-3">
        <v-tooltip top>
          <v-btn small flat class="grey lighten-2" @click="sortBy('teamName')" slot="activator">
            <v-icon left small>folder</v-icon>
            <span class="caption text-lowercase">By team name</span>
          </v-btn>
          <span>Sort task by name</span>
        </v-tooltip>
        <v-tooltip bottom>
          <v-btn small flat class="grey lighten-2" @click="sortBy('memberName')" slot="activator">
            <v-icon left small>person</v-icon>
            <span class="caption text-lowercase">By member</span>
          </v-btn>
          <span>Sort task by member</span>
        </v-tooltip>
      </v-layout>

      <v-card flat class="pa-3" v-for="task in tasks" :key="task.id">
        <v-layout row wrap :class="`pa-3 task ${task.task.status}`">
          <v-flex xs12 md4>
            <div class="caption blue--text">Task Title</div>
            <div>{{task.task.title}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption blue--text">Team</div>
            <div>{{task.task.teamName}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption blue--text">Member</div>
            <div>{{task.task.memberName}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption blue--text">Due Date</div>
            <div>{{task.task.dueDate}}</div>
          </v-flex>
          <v-flex xs6 sm2 md2>
            <div class="right">
              <v-chip small :class="`${task.task.status} white--text caption my-2`">{{task.task.status}}</v-chip>
            </div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>  
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mapState } from 'vuex';

export default {
  methods: {
    ...mapActions(['getTasks']),
    sortBy(prop) {
      this.tasks.task.sort((a,b) => a[prop] < b[prop] ? -1 : 1);
    }
  },
  computed: {
    ...mapState(['tasks'])
  },
  created() {
    this.getTasks();
  },
  mounted() {
    this.getTasks();
  },
}
</script>

<style>
.task.Done {
  border-left: 4px solid #3cd1c2;
}
.task.Ongoing {
  border-left: 4px solid #FEE835;
}
.task.Todo {
  border-left: 4px solid orangered;
}
.v-chip.Done {
  background: #3cd1c2
}
.v-chip.Ongoing {
  background: #FEE835
}
.v-chip.Todo {
  background: orangered
}
</style>