<script setup>
import { useAuthStore } from '@/stores';
const authStore = useAuthStore();
authStore.logout();

</script>

<template>
    <div>
        <h1>Successfully logged Out.</h1>
        <p>Click Login above to log back in!</p>        
        <img src="/favicon.ico">
        <div>
            <a href="/login" class="nav-item nav-link">Log back in.</a> 
        </div>
        <div>
            <a href="/about" class="nav-item nav-link">Or find out more about this site.</a>                                    
        </div>
        </div>
        <div>
            
    </div>
</template>
