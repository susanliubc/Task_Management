<template>
  <div class="tasks my-3">
    <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
      <span>You have edited a task</span>
      <v-btn flat color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <h1 class="subheading grey--text text-darken-4">Tasks</h1>
    <v-container class="my-5">
      <v-expansion-panel>
        <v-expansion-panel-content v-for="item in tasks" :key="item.id">
          <div slot="header" class="py-1">
            <span>{{ item.task.title }}</span>
            <v-flex text-xs-right shrink>
                <Edittask :id="item.id" @taskEdited="snackbar=true"/>
                <v-btn small flat icon  left color="grey" @click="deleteTask(item.id)">
                  <v-icon right>delete</v-icon>
                </v-btn>
              </v-flex>
          </div>
          <v-card>
            <v-card-text class="ml-2 my-1 grey--text">
              <div class="font-weight-bold">Due by {{ item.task.dueDate }}</div>
              <div>{{ item.task.status }}</div>
              <div>{{ item.task.content }}</div>
            </v-card-text>
          </v-card>
           
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-container>
  </div>
</template>

<script>
import Edittask from '../components/Edittask.vue';
import { mapState } from 'vuex';
import { mapActions } from 'vuex';

export default {
  components: { 
    Edittask
  },
  data() {
    return {
      snackbar: false
    }
  },
  methods: {
    ...mapActions(['getTasks']),
    deleteTask(id) {
      console.log('id: ', id);
      this.$store.dispatch('deleteTasks', id);
    }
  },
  computed: {
    ...mapState(['tasks']),
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  created() {
    this.getTasks();
  },
}
</script>
