<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat icon  left color="grey" slot="activator">
      <v-icon right>edit</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <h2>Edit a Task</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3 grey--text text-darken-3" ref="form">
          <v-select 
            label="Team" 
            :items="teams"
            item-text="teamName"
            v-model="teamName"
            prepend-icon="group">
          </v-select>
          <v-text-field label="Title" v-model="title" :rules="inputRules" prepend-icon="folder">
          </v-text-field>
          <v-textarea label="Content" v-model="content" :rules="inputRules" prepend-icon="edit">
          </v-textarea>
          <v-select label="Status" :items="items" v-model="status" prepend-icon="check">
          </v-select>

          <v-menu v-model="menu" :close-on-content-pick="false">
            <v-text-field label="Due Date" :value="formattedDate" :rules="inputRules" slot="activator" prepend-icon="date_range">
            </v-text-field>
            <v-date-picker v-model="dueDate"></v-date-picker>
          </v-menu>

          <v-spacer></v-spacer>

          <v-btn flat class="success mx-0 mt-3" @click="submit" :loading="loading">Edit Task</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import format from 'date-fns/format';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      title: '',
      content: '',
      dueDate: null,
      status: '',
      items: ['Todo', 'Ongoing', 'Done'],
      teamName: [],
      menu: false,
      inputRules: [
        v => !!v || 'This field is required',
        v => v && v.length >= 3 || 'Minimum length is 3 characters'
      ],
      loading: false,
      dialog: false
    }
  },
  props: ['id'],
  methods: {
    submit() {
      if(this.$refs.form.validate()) {
        this.loading = true;
        const taskForm = this.$refs.form;
        const id = this.id.toString();
        const task = {
            teamName: this.teamName,
            memberName: this.currentUser.fullName,
            title: this.title, 
            content: this.content,
            dueDate: this.dueDate,
            status: this.status,
        };

        //user edit task
        this.$store.dispatch('editTasks', { task, id });
        taskForm.reset();

        this.loading = false;
        this.dialog = false;
        this.$emit('taskEdited');
         
      }
    }
  },
  computed: {
    ...mapState(['teams']),
    formattedDate() {
      return this.dueDate ? format(this.dueDate, 'Do MMM YYYY'): ''
    }
  }
}
</script>

