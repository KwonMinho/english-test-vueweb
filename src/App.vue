<template>
<div id="app">
    <Header />
    <b-row align-h="around">
        <b-col cols="4">
            <AddBox />
        </b-col>
        <b-col cols="7">
            <br/>
            <TestBox />
        </b-col>
    </b-row>
</div>
</template>

<script>
import AddBox from './components/AddBox.vue'
import TestBox from './components/testBox/TestBox.vue'
import Header from './components/Header.vue'

export default {
    name: 'App',
    components: {
        AddBox,
        TestBox,
        Header
    },
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
