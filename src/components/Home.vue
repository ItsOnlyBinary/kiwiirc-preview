<template>
    <div>
        <router-link to="/conf" tag="button">Edit IP Based Config</router-link>
        <table v-if="json!=null">
            <template v-for="(jsondata, user) in {'kiwiirc': json.kiwiirc}">
                <tr :key="user.id">
                    <td colspan="5" class="table-title"><a :href="'https://github.com/' + user + '/kiwiirc/'">{{ titles[user] }}</a></td>
                </tr>
                <tr :key="user.id">
                    <th>branch</th>
                    <th>github sha</th>
                    <th>hosted sha</th>
                    <th>last build</th>
                </tr>
                <tr v-for="item in jsondata" :key="item.id">
                    <td :class="getStatusClass(item) + ' align-left'"><b>{{ item.repo_ref }}</b>{{ formatTitle(item.title) }}</td>
                    <td :class="[item.github_sha != item.hosted_sha ? 'nomatch' : '']">{{ shortenSha(item.github_sha) }}</td>
                    <td :class="[item.github_sha != item.hosted_sha ? 'nomatch' : '']" >{{ shortenSha(item.hosted_sha) }}</td>
                    <td>{{ item.build_date }}</td>
                    <td class="align-left">
                        <a v-if="isPullRequest(item.repo_ref)" :href="'https://github.com/' + user + '/kiwiirc/' + item.repo_ref" target="_blank"><svg class="octicon octicon-git-pull-request" viewBox="0 0 12 16" version="1.1" aria-hidden="true"><path fill-rule="evenodd" d="M11 11.28V5c-.03-.78-.34-1.47-.94-2.06C9.46 2.35 8.78 2.03 8 2H7V0L4 3l3 3V4h1c.27.02.48.11.69.31.21.2.3.42.31.69v6.28A1.993 1.993 0 0 0 10 15a1.993 1.993 0 0 0 1-3.72zm-1 2.92c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zM4 3c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v6.56A1.993 1.993 0 0 0 2 15a1.993 1.993 0 0 0 1-3.72V4.72c.59-.34 1-.98 1-1.72zm-.8 10c0 .66-.55 1.2-1.2 1.2-.65 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z" /></svg></a>
                        <a v-else :href="'https://github.com/' + user + '/kiwiirc/tree/' + item.repo_ref" target="_blank"><svg class="octicon octicon-git-branch" viewBox="0 0 10 16" version="1.1" aria-hidden="true"><path fill-rule="evenodd" d="M10 5c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v.3c-.02.52-.23.98-.63 1.38-.4.4-.86.61-1.38.63-.83.02-1.48.16-2 .45V4.72a1.993 1.993 0 0 0-1-3.72C.88 1 0 1.89 0 3a2 2 0 0 0 1 1.72v6.56c-.59.35-1 .99-1 1.72 0 1.11.89 2 2 2 1.11 0 2-.89 2-2 0-.53-.2-1-.53-1.36.09-.06.48-.41.59-.47.25-.11.56-.17.94-.17 1.05-.05 1.95-.45 2.75-1.25S8.95 7.77 9 6.73h-.02C9.59 6.37 10 5.73 10 5zM2 1.8c.66 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2C1.35 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2zm0 12.41c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm6-8c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z" /></svg></a>
                        <router-link :to="'/log/' + item.repo_user + '/' + cleanRef(item.repo_ref)" v-if="item.build_log == 1"><svg class="octicon octicon-info" viewBox="0 0 14 16" version="1.1" aria-hidden="true"><path fill-rule="evenodd" d="M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z" /></svg></router-link>
                        <a v-if="item.build_success == 1" :href="'/' + item.repo_user + '/' + cleanRef(item.repo_ref)" target="_blank"><svg class="octicon octicon-eye" viewBox="0 0 16 16" version="1.1" aria-hidden="true"><path fill-rule="evenodd" d="M8.06 2C3 2 0 8 0 8s3 6 8.06 6C13 14 16 8 16 8s-3-6-7.94-6zM8 12c-2.2 0-4-1.78-4-4 0-2.2 1.8-4 4-4 2.22 0 4 1.8 4 4 0 2.22-1.78 4-4 4zm2-4c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z" /></svg></a>
                        <a v-if="item.build_success == 1" :href="'/zips/' + item.repo_user + '_' + cleanRef(item.repo_ref) +'.zip'"><svg class="octicon octicon-file-zip" viewBox="0 0 12 16" version="1.1" aria-hidden="true"><path fill-rule="evenodd" d="M8.5 1H1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V4.5L8.5 1zM11 14H1V2h3v1h1V2h3l3 3v9zM5 4V3h1v1H5zM4 4h1v1H4V4zm1 2V5h1v1H5zM4 6h1v1H4V6zm1 2V7h1v1H5zM4 9.28A2 2 0 0 0 3 11v1h4v-1a2 2 0 0 0-2-2V8H4v1.28zM6 10v1H4v-1h2z" /></svg></a>
                    </td>
                </tr>
            </template>
        </table>
    </div>
</template>
<script>
export default {
    name: 'Home',
    data () {
        return {
            json: null,
            titles: {
                'itsonlybinary': 'ItsOnlyBinary',
                'kiwiirc': 'Kiwi IRC',
            },
        };
    },
    created: function () {
        this.fetchData();
    },
    methods: {
        watch: {
            // call again the method if the route changes
            '$route': 'fetchData',
        },
        formatTitle: function (title) {
            let length = 30;
            if (title) {
                if (title.length <= length) {
                    return ' "' + title + '"';
                }
                title = title.substr(0, length);
                title = title.substr(0, Math.min(title.length, title.lastIndexOf(' ')));
                return ' "' + title + '"';
            }
            return null;
        },
        isPullRequest: function (ref) {
            return (/^pull\/\d+$/.test(ref));
        },
        shortenSha: function (sha) {
            return (sha != null) ? sha.substr(0, 7) : '';
        },
        cleanRef: function cleanRef (ref) {
            return ref.replace('/', '-');
        },
        getStatusClass: function (item) {
            if (item.build_running === 1 || item.build_running === '1') {
                return 'building';
            } else if (item.build_success === 1 || item.build_success === '1') {
                return 'success';
            } else {
                return 'failed';
            }
        },
        fetchData: function () {
            var self = this;
            fetch('/data.json')
                .then(r => r.json())
                .then(json => {
                    this.json = json;
                    setTimeout(function () { self.fetchData(); }, 5000);
                }).catch(json => {
                    setTimeout(function () { self.fetchData(); }, 5000);
                });
        },
    },
};
</script>
<style>
    table {
        margin: 0 auto;
        border-collapse: collapse;
    }
    td, th {
        padding: 4px 10px 4px 10px;
    }
    .table-title {
        font-size: 130%;
        text-align: center;
        font-weight: bold;
        padding-top: 20px;
    }
    .nomatch {
        background-color: #8080ff;
    }
    .building {
        background-color: #ffd280;
    }
    .success {
        background-color: #80ff80;
    }
    .failed {
        background-color: #ff8080;
    }
    .octicon {
        width: 18px;
        height: 18px;
        margin-left: 2px;
        margin-right: 2px;
    }
    .align-left {
        text-align: left;
    }

</style>
