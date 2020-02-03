Vue.component('create', {
    props: ['init'],
    data() {
        return {
            name: this.init,
        }
    },
    methods: {
        create() {
            this.$emit('create', this.name);
            this.name = this.init;
        },
    },

    template: `<div><input type="text" v-model="name" @keyup.enter="create"></div>`,
});

Vue.component('todo', {
    props: ['todo'],
    template: `<p> <label :class="{active:todo.active}">
                <input type="checkbox" value="" v-model="todo.active">{{todo.name}}</label>
                <button @click="$emit('remove',todo)">-</button></p>`,
});

Vue.component('note', {
    props: ['note'],
    data() {
        return {
            edit: false,
            name: this.note.name
        }
    },
    methods: {
        createTodo(name) {
            this.$emit('create-todo', {
                name: name,
                active: false,
            }, this.note);

        },
        removeTodo(todo) {
            this.$emit('remove-todo', todo, this.note);
        },
        editNote() {
            this.$emit('edit-note', this.note, this.name);
            this.edit = false;
        }

    },

    template: `<div>
    <template v-if="!edit">
    <b @click="edit=!edit">{{note.name}}</b>
    <button @click="$emit('remove',note)">-</button>
    </template>
    <template v-else>
    <input type="text"  v-model="name" @keyup.enter="editNote">
    </template> 
      
    <todo v-for="todo in note.todos" :todo="todo" :key="todo.id" @remove="removeTodo"></todo>
    <create class="create" @create="createTodo" init="Новое дело"></create>
    </div>`,
});

let vm = new Vue({
    el: '#app',
    data: {
        notes: [],
    },
    methods: {
        createNote(name) {
            this.notes.push({
                name: name,
                color: 'green',
                todos: [],
            });
        },

        removeNote(note) {
            this.notes.splice(this.notes.indexOf(note), 1);
        },

        editNote(note, name) {
            //Vue.set(this.notes, this.notes.indexOf(note),)
            note.name = name;
        },

        removeTodo(todo, note) {
            note.todos.splice(note.todos.indexOf(todo), 1);
        },

        createTodo(todo, note) {
            note.todos.push(todo);
        },

    },
});