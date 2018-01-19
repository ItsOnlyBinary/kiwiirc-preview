<template>
    <div class="log-container">
        <div class="log-tools">
            <router-link to="/" tag="button">Close</router-link>
            <button @click="fetchLog">Reload</button>
            <button @click="openLog(repoUser, repoRef)">View Raw</button>
            <div class="log-message">{{ repoUser }} / {{ repoRef }}</div>
        </div>
        <textarea v-model="log" class="log-text" />
    </div>
</template>

<script>
export default {
    name: 'LogView',
    props: {
        repoUser: {
            type: String,
            default: '',
        },
        repoRef: {
            type: String,
            default: '',
        },
    },
    data () {
        return {
            log: '',
        };
    },
    created: function () {
        this.fetchLog();
    },
    methods: {
        fetchLog: function () {
            fetch('/logs/' + this.repoUser + '_' + this.repoRef + '.txt')
                .then(r => r.text())
                .then(text => { this.log = text; })
                .catch(text => { this.log = 'Error Loading Log'; });
        },
        openLog: function (repoUser, repoRef) {
            window.open('/logs/' + repoUser + '_' + repoRef + '.txt', '_blank');
        },
    },
};
</script>
<style>
    .log-container {
        text-align: left;
        margin: 0 auto;
        width: 80%;
        height: 80%;
    }
    .log-tools {
        margin-bottom: 10px;
        display: flex;
        width: 100%;
    }
    .log-tools button {
        margin-right: 10px;
    }
    .log-message {
        flex: 2;
        width: 100%;
    }
    .log-text {
        box-sizing: border-box;
        width:100%;
        height: 100%;
        resize: none;
    }
</style>
