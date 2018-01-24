<template>
    <div>
        <div class="home-tools">
            <router-link to="/users" tag="button">Select Github User</router-link>
            <router-link to="/conf" tag="button">Edit IP Based Config</router-link>
        </div>
        <table v-if="json.repos != null && json.users != null" class="repo_table">
            <caption :key="user.id"><a :href="'https://github.com/' + user.name + '/kiwiirc/'">{{ user.title }}</a>
            </caption>
            <thead :key="user.id">
                <th class="nopadding" />
                <th>Branch / Pull-Request</th>
                <th>Github SHA</th>
                <th class="nopadding" />
                <th>Hosted SHA</th>
                <th style="min-width: 150px;">Last Build</th>
                <th />
            </thead>
            <tr v-for="item in json.repos[user.name]" :key="item.id">

                <!-- Status -->
                <td style="padding-right: 0;">
                    <img v-if="item.build_running === 1 || item.build_running === '1'" class="octicon" src="../assets/sync.svg">
                    <img v-else-if="item.build_success === 1 || item.build_success === '1'" class="octicon" src="../assets/check.svg">
                    <img v-else class="octicon" src="../assets/x.svg">
                </td>

                <!-- Branch / Pull-Request -->
                <td class="align-left"><b>{{ item.repo_ref }}</b>{{ formatTitle(item.title) }}</td>

                <!-- Github SHA -->
                <td>{{ shortenSha(item.github_sha) }}</td>

                <!-- SHA Match -->
                <td class="nopadding">
                    <img v-if="item.github_sha == item.hosted_sha" src="../assets/code.svg">
                    <img v-else src="../assets/alert.svg">
                </td>

                <!-- Hosted SHA -->
                <td>{{ shortenSha(item.hosted_sha) }}</td>

                <!-- Last Build -->
                <td>{{ item.build_date }}</td>

                <!-- Preview Links -->
                <td class="align-left" style="">
                    <!-- Link to github -->
                    <a v-if="isPullRequest(item.repo_ref)" :href="getGithubUrl(item)" target="_blank"><img src="../assets/git-pull-request.svg"></a>
                    <a v-else :href="getGithubUrl(item)" target="_blank"><img src="../assets/git-branch.svg"></a>

                    <!-- Link to log -->
                    <router-link v-if="item.build_log == 1" :to="'/log/' + item.repo_user + '/' + cleanRef(item.repo_ref)">
                        <img src="../assets/info.svg">
                    </router-link>

                    <!-- Link to preview -->
                    <a v-if="item.build_success == 1" :href="'/' + item.repo_user + '/' + cleanRef(item.repo_ref)" target="_blank">
                        <img src="../assets/eye.svg">
                    </a>

                    <!-- Link to zip -->
                    <a v-if="item.build_success == 1" :href="'/zips/' + item.repo_user + '_' + cleanRef(item.repo_ref) +'.zip'">
                        <img src="../assets/file-zip.svg">
                    </a>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>

import data from '@/libs/data';

export default {
    name: 'Home',
    computed: {
        json: function json () {
            return data.getJSON();
        },
        user: function user () {
            return data.getUser();
        },
    },
    methods: {
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
        isPullRequest: function isPullRequest (ref) {
            return (/^pull\/\d+$/.test(ref));
        },
        shortenSha: function shortenSha (sha) {
            return (sha != null) ? sha.substr(0, 7) : '';
        },
        cleanRef: function cleanRef (ref) {
            return ref.replace('/', '-');
        },
        getGithubUrl: function getGithubUrl (item) {
            return 'https://github.com/' +
            item.repo_user + '/' + item.repo_name +
            (this.isPullRequest(item.repo_ref) ? '/' : '/tree/') + item.repo_ref;
        },
    },
};
</script>
<style>
    .home-tools {
        margin-bottom: 20px;
    }
    .repo_table {
        margin: 0 auto;
        border-collapse: collapse;
    }
    .repo_table td, th {
        padding: 4px 10px 4px 10px;
    }
    .repo_table tr:hover {
        background-color: #e6e6e6;
    }
    .repo_table a {
        display: inline-block;
    }
    .repo_table img {
        width: 20px;
        height: 20px;
        margin: 0 2px 0 2px;
        vertical-align: middle;
    }
    .repo_table .nopadding {
        padding: 4px 0 4px 0;
    }
    .repo_table caption {
        font-size: 130%;
        text-align: center;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .repo_table .align-left {
        text-align: left;
    }
</style>
