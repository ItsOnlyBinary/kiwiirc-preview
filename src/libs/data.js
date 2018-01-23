
import _ from 'lodash';
import Vue from 'vue';

const dataObj = {
    json: {},
    user: null,
    router: null,
};

const data = new Vue({
    data: dataObj,
    created: function () {
        this.updateData();
    },
    methods: {
        updateData: function updateData () {
            var self = this;
            fetch('/data.json')
                .then(r => r.json())
                .then(json => {
                    this.json = json;
                    if (!this.user) {
                        this.setUserByName(this.params.user);
                    }
                    setTimeout(function () { self.updateData(); }, 5000);
                }).catch(json => {
                    setTimeout(function () { self.updateData(); }, 5000);
                });
        },
        getJSON: function getJSON () {
            return this.json;
        },
        getUser: function getUser () {
            return this.user ? this.user : this.json.users[0];
        },
        setUser: function setUser (user) {
            if (user) {
                this.user = user;
            }
        },
        setUserByName: function setUser (name) {
            this.setUser(_.find(this.json.users, {'name': name}));
        },
        getParams: function setParams () {
            return this.params;
        },
        setParams: function setParams (params) {
            if (params) {
                this.params = params;
            }
        },
    },
});

export default data;
