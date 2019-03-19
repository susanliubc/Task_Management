<template>
  <v-dialog max-width="600px">
    <v-btn flat slot="activator" class="success">Add Task</v-btn>
    <v-card>
      <v-card-title>
        <h2 class="grey--text text-darken-3">Add a New Task</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field label="Title" v-model="title" :rules="inputRules" prepend-icon="folder">
          </v-text-field>
          <v-text-field label="Content" v-model="content" :rules="inputRules" prepend-icon="edit">
          </v-text-field>
          <v-menu v-model="menu" :close-on-content-pick="false">
            <v-text-field label="Due Date" :value="formattedDate" :rules="inputRules" slot="activator" prepend-icon="date_range">
          </v-text-field>
          <v-date-picker v-model="due"></v-date-picker>
          </v-menu>
          <v-spacer></v-spacer>
          <v-btn flat class="success mx-0 mt-3" @click="submit">Add Task</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import format from 'date-fns/format';

export default {
  data() {
    return {
      title: '',
      content: '',
      due: null,
      menu: false,
      inputRules: [
        v =>  v.length >= 3 || 'Minimum length is 3 characters'
      ]
    }
  },
  methods: {
    submit() {
      if(this.$refs.form.validate()) {
        console.log(this.title, this.content)
      }
    }
  },
  computed: {
    formattedDate() {
      return this.due ? format(this.due, 'Do MMM YYYY'): ''
    }
  }
}
</script>

