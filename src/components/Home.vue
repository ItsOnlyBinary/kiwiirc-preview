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
                    <img v-if="item.build_running === 1 || item.build_running === '1'" src="../assets/sync.svg" v-tooltip.bottom="'Status: Build Running...'">
                    <img v-else-if="item.build_success === 1 || item.build_success === '1'" src="../assets/check.svg" v-tooltip.bottom="'Status: Build Successful'">
                    <img v-else src="../assets/x.svg" v-tooltip.bottom="'Status: Build Failed'">
                </td>

                <!-- Branch / Pull-Request -->
                <td class="align-left">
                    <a class="repo_ref" :href="getGithubUrl(item)">{{ formatRef(item.repo_ref) }}</a>
                    <span v-if="!item.title || item.title.length <= maxTitleLength">{{ item.title }}</span>
                    <span v-else v-tooltip.bottom="item.title">{{ formatTitle(item.title) }}</span>
                </td>

                <!-- Github SHA -->
                <td>{{ shortenSha(item.github_sha) }}</td>

                <!-- SHA Match -->
                <td class="nopadding">
                    <img v-if="item.github_sha == item.hosted_sha" src="../assets/code.svg" v-tooltip.bottom="'SHA Match'">
                    <img v-else src="../assets/alert.svg" v-tooltip.bottom="'SHA Differ'">
                </td>

                <!-- Hosted SHA -->
                <td>{{ shortenSha(item.hosted_sha) }}</td>

                <!-- Last Build -->
                <td>{{ item.build_date }}</td>

                <!-- Preview Links -->
                <td class="align-left">
                    <!-- Link to github -->
                    <a v-if="isPullRequest(item.repo_ref)" :href="getGithubUrl(item)" target="_blank" v-tooltip.bottom="'View Pull-Request'"><img src="../assets/git-pull-request.svg"></a>
                    <a v-else :href="getGithubUrl(item)" target="_blank" v-tooltip.bottom="'View Branch'"><img src="../assets/git-branch.svg"></a>

                    <!-- Link to log -->
                    <router-link v-if="item.build_log == 1" :to="'/log/' + item.repo_user + '/' + cleanRef(item.repo_ref)" v-tooltip.bottom="'View Log'">
                        <img src="../assets/info.svg">
                    </router-link>

                    <!-- Link to preview -->
                    <a v-if="item.build_success == 1" :href="'/' + item.repo_user + '/' + cleanRef(item.repo_ref)" target="_blank" v-tooltip.bottom="'View Preview'">
                        <img src="../assets/eye.svg">
                    </a>

                    <!-- Link to zip -->
                    <a v-if="item.build_success == 1" :href="'/zips/' + item.repo_user + '_' + cleanRef(item.repo_ref) +'.zip'" v-tooltip.bottom="'Download Zip'">
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
    data () {
        return {
            maxTitleLength: 30,
        };
    },
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
            if (title) {
                let shortTitle = title.substr(0, this.maxTitleLength);
                return shortTitle.substr(0, Math.min(shortTitle.length, shortTitle.lastIndexOf(' '))) + '...';
            }
            return null;
        },
        formatRef: function formatRef (ref) {
            if (this.isPullRequest(ref)) {
                return '#' + (/^pull\/(\d+)$/.exec(ref))[1];
            }
            return ref;
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
        getTooltip: function getTooltip () {
            return 'test tip';
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
.repo_table caption {
    font-size: 130%;
    text-align: center;
    font-weight: bold;
    margin-bottom: 10px;
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
.repo_table .repo_ref {
    font-weight: bold;
}
.repo_table .align-left {
    text-align: left;
}
.tooltip {
    display: block !important;
    z-index: 10000;
}
.tooltip .tooltip-inner {
    background: #e6e6e6;
    color: black;
    border: 1px grey solid;

    /* border-radius: 16px; */
    padding: 5px 10px 4px;
}
.tooltip .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 8px;
    border-color: grey;
    z-index: 1;
}
.tooltip[x-placement^="top"] {
    margin-bottom: 5px;
}
.tooltip[x-placement^="top"] .tooltip-arrow {
    border-width: 5px 5px 0 5px;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    bottom: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
}
.tooltip[x-placement^="bottom"] {
    margin-top: 10px;
}
.tooltip[x-placement^="bottom"] .tooltip-arrow {
    border-width: 0 5px 5px 5px;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-top-color: transparent !important;
    top: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
}
.tooltip[x-placement^="right"] {
    margin-left: 5px;
}
.tooltip[x-placement^="right"] .tooltip-arrow {
    border-width: 5px 5px 5px 0;
    border-left-color: transparent !important;
    border-top-color: transparent !important;
    border-bottom-color: transparent !important;
    left: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
}
.tooltip[x-placement^="left"] {
    margin-right: 5px;
}
.tooltip[x-placement^="left"] .tooltip-arrow {
    border-width: 5px 0 5px 5px;
    border-top-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    right: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
}
.tooltip.popover .popover-inner {
    background: #f9f9f9;
    color: black;
    padding: 24px;
    border-radius: 5px;
    box-shadow: 0 5px 30px rgba(black, 0.1);
}
.tooltip.popover .popover-arrow {
    border-color: #f9f9f9;
}
.tooltip[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.15s, visibility 0.15s;
}
.tooltip[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.15s;
}
</style>
