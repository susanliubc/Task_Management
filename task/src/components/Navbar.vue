<template>
    <nav>
        <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
            <span>You have added a new task</span>
            <v-btn flat color="white" @click="snackbar = false">Close</v-btn>
        </v-snackbar>
        <v-toolbar flat app>
            <v-toolbar-side-icon class="blue-text" @click="drawer = !drawer">
            </v-toolbar-side-icon>
            <v-toolbar-title class="text-uppercase blue--text">
                <span>Task</span>
                <span class="font-weight-light">Management</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu offset-y>
                <v-btn flat slot="activator" color="grey">
                    <v-icon left>expand_more</v-icon>
                    <span>Menu</span>
                </v-btn>
                <v-list>
                    <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
                        <v-list-tile-title>{{link.text}}</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
            <v-btn flat color="blue">
                <span>Sign Out</span>
                <v-icon right>exit_to_app</v-icon>
            </v-btn>
        </v-toolbar>
        <v-navigation-drawer app v-model="drawer" class="primary">
            <v-layout column align-center>
                <v-flex class="mt-5">
                    <v-avatar size="100">
                        <img class="text-lg-center" src="/avatar_1.png">
                    </v-avatar>
                    <p class="white--text text-xs-center subheading mt-1">Tom</p>
                </v-flex>
                <v-flex class="mt-2 mb-2">
                    <Popup @taskAdded="snackbar=true" />
                </v-flex>
            </v-layout>
            <v-list>
                <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
                    <v-list-tile-action>
                        <v-icon class="white--text">{{link.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title class="white--text">
                            {{link.text}}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
import Popup from './Popup.vue';

export default {
    components: { Popup },
    data () {
        return {
            drawer: false, 
            links: [
                {icon:'dashboard', text:'Dashboard', route:'/'},
                {icon:'folder', text:'Tasks', route:'/tasks'},
                {icon:'person', text:'Team', route:'/team'}
            ],
            snackbar: false
        }
    }
}
</script>