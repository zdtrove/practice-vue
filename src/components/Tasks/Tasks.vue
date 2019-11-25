<template>
    <v-card class="mx-auto" max-width="500">
        <v-card-title>Tasks List</v-card-title>
        <v-card-text>Double click to update color task</v-card-text>
        <v-list shaped>
            <v-list-item-group multiple>
                <v-list-item
                    @dblclick="onDblClick(task)" 
                    :key="task.id" 
                    v-for="task in allTasks" 
                    class="task"
                    v-bind:class="{'is-complete':task.completed}"
                >
                    {{ task.title }}
                    <v-icon @click="deleteTask(task.id)">delete</v-icon>
                </v-list-item> 
            </v-list-item-group>
        </v-list>
    </v-card>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    export default {
        name: 'Tasks',
        methods: {
            ...mapActions(['fetchTasks', 'deleteTask', 'updateTask']),
            onDblClick(task) {
                const updTask = {
                    id: task.id,
                    title: task.title,
                    completed: !task.completed
                }
                this.updateTask(updTask);
            }
        },
        computed: mapGetters(['allTasks']),
        created() {
            this.fetchTasks();
        }
    };
</script>

<style scoped>
    .is-complete {
        font-weight: bold;
    }
</style>