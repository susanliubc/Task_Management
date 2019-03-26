<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat slot="activator" class="success">Add Task</v-btn>
    <v-card>
      <v-card-title>
        <h2 class="grey--text text-darken-3">Add a New Task</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field label="Title" v-model="title" :rules="inputRules" prepend-icon="folder">
          </v-text-field>
          <v-textarea label="Content" v-model="content" :rules="inputRules" prepend-icon="edit">
          </v-textarea>

          <v-menu v-model="menu" :close-on-content-pick="false">
            <v-text-field label="Due Date" :value="formattedDate" :rules="inputRules" slot="activator" prepend-icon="date_range">
            </v-text-field>
            <v-date-picker v-model="dueDate"></v-date-picker>
          </v-menu>

          <v-spacer></v-spacer>

          <v-btn flat class="success mx-0 mt-3" @click="submit" :loading="loading">Add Task</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import format from 'date-fns/format';
import firebase from '@/fb';

export default {
  data() {
    return {
      title: '',
      content: '',
      dueDate: null,
      menu: false,
      inputRules: [
        v => !!v || 'This field is required',
        v =>  v.length >= 3 || 'Minimum length is 3 characters'
      ],
      loading: false,
      dialog: false
    }
  },
  methods: {
    submit() {
      if(this.$refs.form.validate()) {
        this.loading = true;
        const task = {
          title: this.title, 
          content: this.content,
          dueDate: this.dueDate,
          member: 'Tom',
          status: 'Progress'
        };
        firebase.firestore().collection('tasks').add(task).then(() => {
          this.loading = false;
          this.dialog = false;
          this.$emit('taskAdded');
        });
      }
    }
  },
  computed: {
    formattedDate() {
      return this.dueDate ? format(this.dueDate, 'Do MMM YYYY'): ''
    }
  }
}
</script>

