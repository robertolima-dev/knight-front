<template>
    <div id="app">
        <Head></Head>
        <Nav></Nav>
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>

<script>
import Nav from './components/_commons/Nav';
import Footer from './components/_commons/Footer';

export default {
    name: 'app',
    components: {
        Nav,
        Footer
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 70px;
}
template{
    overflow-x: hidden;
}

</style>