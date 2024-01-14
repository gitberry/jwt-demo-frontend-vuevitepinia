<script setup>
import { RouterLink, RouterView } from 'vue-router';

import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
</script>

<template>
    <div class="app-container bg-light">
        <nav v-show="authStore.loginToken" class="navbar navbar-expand navbar-dark bg-dark">
            <div class="navbar-nav">
                <RouterLink to="/" class="nav-item nav-link">Home</RouterLink>
                <RouterLink to="/about" class="nav-item nav-link">About</RouterLink>
                <a @click="authStore.logout()" class="nav-item nav-link">Logout</a>
            </div>
        </nav>
        <nav v-show="!authStore.loginToken" class="navbar navbar-expand navbar-dark bg-dark">
            <div class="navbar-nav">
                <RouterLink to="/" class="nav-item nav-link">Home</RouterLink>
                <RouterLink to="/about" class="nav-item nav-link">About</RouterLink>
                <RouterLink to="/login" class="nav-item nav-link">Login</RouterLink>
            </div>
        </nav>
        <div class="container pt-4 pb-4">
            <RouterView />
        </div>
    </div>
    <div class="container pt-4 pb-4">
        <!-- something you wouldn't USUALLY expose to users 
            (although they could find it with enough digging
            but handy for debugging -->
        <a v-bind:title="'loginName:'+authStore.loginName">&nbsp;</a>
        <a v-bind:title="'loginToken:'+authStore.loginToken">&nbsp;</a>
        <!-- [{{ authStore.loginName }}]<br />
        [{{ authStore.loginToken }}] -->

    </div>
</template>

<style>
@import '@/assets/base.css';
</style>