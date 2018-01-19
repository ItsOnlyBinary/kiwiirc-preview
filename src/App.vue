<template>
    <div id="app">
        <div class="header"><h1>Kiwi IRC Preview Builds</h1></div>
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'App',
};
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
}
body, html {
    text-align: center;
    height: 100%;
    margin: 0;
    padding: 0;
}
a {
    text-decoration: none;
    color: inherit;
}
body, h1 {
    margin: 0;
}
.header {
    padding-top: 20px;
    padding-bottom: 20px;
}
</style>
