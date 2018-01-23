<template>
    <div class="config-container">
        <div class="config-tools">
            <router-link to="/" tag="button">Close</router-link>
            <button @click="sendConfig">Save</button>
            <button @click="fetchConfig">Reload</button>
            <button @click="resetConfig">Restore Default</button>
            <input class="config-message" :value="message != '' ? message : '&nbsp;'" readonly>
        </div>
        <textarea v-model="config" class="config-text" />
    </div>
</template>

<script>
export default {
    name: 'Home',
    data () {
        return {
            message: '',
            config: '',
        };
    },
    created: function () {
        this.fetchConfig();
    },
    methods: {
        sendConfig: function () {
            var error = false;
            try {
                JSON.parse(this.config);
            } catch (e) {
                error = true;
                this.message = 'Failed ' + (e.message ? e.message : 'JSON.parse');
            }

            if (!error) {
                fetch('/cgi-bin/config-save.pl', {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain' },
                    body: this.config,
                })
                    .then(r => r.json())
                    .then(r => {
                        this.message = (r.success === 1) ? 'Config saved' : 'Failed to save config';
                    })
                    .catch(r => { this.message = 'Failed to save config'; });
            }
        },
        fetchConfig: function (url) {
            fetch('/cgi-bin/config-get.pl?get=raw')
                .then(r => r.text())
                .then(text => {
                    this.config = text;
                    this.message = 'Config loaded';
                });
        },
        resetConfig: function () {
            fetch('/configs/default.json')
                .then(r => r.text())
                .then(text => {
                    this.config = text;
                    this.message = 'Config restored to default';
                });
        },
    },
};
</script>
<style>
    .config-container {
        text-align: left;
        margin: 0 auto;
        width: 80%;
        height: 80%;
    }
    .config-tools {
        margin-bottom: 10px;
        display: flex;
        width: 100%;
    }
    .config-tools button {
        margin-right: 10px;
    }
    .config-message {
        flex: 2;
        width: 100%;
    }
    .config-text {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        resize: none;
    }
</style>
