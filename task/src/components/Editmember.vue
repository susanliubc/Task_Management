<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn small flat icon color="grey" slot="activator">
        <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <h2>Edit a Member</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3 grey--text text-darken-3" ref="form">
          <v-text-field 
            label="Search Member's First Name"  
            v-model="search"
            type="text" 
            :rules="inputRules" 
            required  
            prepend-icon="search">
          </v-text-field>
          <v-btn flat class="success mx-0 mt-3" @click="searchMember">
            <span>search</span>
          </v-btn>

          <v-data-table
            :items="candidates"
            v-model="selected"
            class="elevation-1 mt-3"
            hide-actions
            hide-headers
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.firstName }}</td>
              <td>{{ props.item.lastName }}</td>
              <td>{{ props.item.fullName }}</td>
              <td class="text-xs-right">
                <v-checkbox 
                  v-model="props.selected"
                  :disabled ="!props.selected && selected.length != 0"
                  :indeterminate = "!props.selected && selected.length != 0"
                  primary
                ></v-checkbox>
              </td>
            </template>
          </v-data-table>

          <v-select 
            label="Role" 
            :items="roles" 
            v-model="role" 
            prepend-icon="how_to_reg">
          </v-select>
          
          <v-spacer></v-spacer>

          <v-btn flat class="success mx-0 mt-3" @click="submit" :loading="loading">Edit Member</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';
import { mapState } from 'vuex';
import firebase from './fb.js';

export default {
  props: ['teamId', 'id'],
  data() {
    return {
      candidates: [],
      role: '',
      search: '',
      selected: [],
      roles: ['Designer', 'Web Developer', 'QA', 'Leader'],
      inputRules: [
        v => !!v || 'This field is required',
        v => v && v.length >= 3 || 'Minimum length is 3 characters'
      ],
      loading: false,
      dialog: false
    }
  },
  methods: {
    ...mapActions(['getUsers']),
    searchMember() {
        const search = this.search;
        const db = firebase.firestore();

        db.collection('users').orderBy('firstName').startAt(search).endAt(search+ "\uf8ff").get()
          .then(querySnapshot => {
            return querySnapshot.forEach(doc => {
              const newCandidate = { ...doc.data(), id: doc.id };
              this.candidates.push(newCandidate);
            });
          })
          .catch(error => console.log('Searchmember error: ', error.message))
    },
    submit() {
      if(this.$refs.form.validate()) {
        this.loading = true;
        const memberForm = this.$refs.form;
        const id = this.id.toString();
        const member = {
          teamId: this.teamId,
          memberName: this.selectRow,
          role: this.role
        };
        
        //user add member
        console.log('member: ', member);
        console.log('id: ', id);
        this.$store.dispatch('editMembers', { member, id });
        memberForm.reset();
        this.candidates = {};
          
        this.loading = false;
        this.dialog = false;
      }
    }
  },
  computed: {
    ...mapState(['user']),
    selectRow() {
      const selectedRow = this.selected[0];
      return selectedRow ? `${selectedRow.fullName}` : 'No data selected';
    }
  },
  created() {
    this.getUsers()
  }
}
</script>
<style scoped>
  .v-input--selection-controls { 
    padding-top: 23px; 
    margin-left: 50px;
  }
</style>

