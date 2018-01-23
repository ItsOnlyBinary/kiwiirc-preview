<template>
    <div class="users">
        <div class="users-tools">
            <router-link to="/" tag="button">Close</router-link>
        </div>
        <div v-if="json.users != null" class="users-container">
            <div v-for="user in json.users" class="users-user" @click="switchUser(user)" :key="user.id">
                <div class="users-user-img" :style="userBackground(user)" />
                <div class="users-user-title">{{ user.title }}</div>
            </div>
        </div>
    </div>
</template>

<script>

import data from '@/libs/data';

export default {
    name: 'UserSwitcher',
    data () {
        return {
        };
    },
    computed: {
        json: function json () {
            return data.getJSON();
        },
        user: function user () {
            return this.currentUser ? this.currentUser : this.json.users[0];
        },
    },
    created: function () {
    },
    methods: {
        userBackground: function userBackground (user) {
            let style = {};
            style['background-image'] = `url(` + user.avatar + `)`;
            return style;
        },
        switchUser: function switchUser (user) {
            data.setUser(user);
            this.$router.push('/');
        },
    },
};
</script>
<style>
    .users-container {
        margin-top: 20px;
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        justify-content: center;
    }
    .users-user {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px;
        padding: 10px;
        border: 1px solid black;
    }
    .users-user-img {
        width: 140px;
        height: 140px;
        background-repeat: no-repeat;
        background-size: contain;
    }
    .users-user-title {
        font-weight: bold;
        margin-top: 10px;
        vertical-align: center;
    }
</style>
