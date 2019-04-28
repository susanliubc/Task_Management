# Task_Management
A task management app using Vue family(Vue, Vuex, Vuetify) 

Front end: Vue CLI, Vue Router, Vuetify(Material degign in Vue)

State management: Vuex

Database: cloud firestore

Backend athentication and hosting: firebase

##User story:

. User sign up and login
. They create teams and members based on the existing users
. They create their tasks
. Dashboard display all the tasks 

##Data structures:

Four collections: users(firstName, lastName, fullName), members(teamId, fullName, role), teams(teamName), tasks(teamName, memberName, title, content, dueDate, status)

One to one realationship: users to members (not strict) as a user may not be a member

One to many realtionship: teams to members one team has many members (could be many to many, there use a simple model, teamId was used to enforece the relationship like foreign key in relational database)

Many to many relationship: members to tasks one member can have many tasks, one task can have many members; since the data set is quite samll, memberName was added as embeded data.

All of the collections were created as root collections from the perspective of performance point of view as well as reason of a firestore bug (sometimes strings passed as undifined value from firestore)

##Remainders: 

1. Disable AdBlock when manually adding collections to firestore

2. (Optional) Disable Kaspersky browser extension when syncing data between app and firestore due to Kaspersky bug for firebase/firestore

3. A general concern is about the unconsistency of database input of firestore. The same payload was inserted to firestore as a object in one day and string in an another day. That really delayed the development process.

