<script setup>
import { storeToRefs } from 'pinia';

//import { useAuthStore, useUsersStore } from '@/stores'; // from original code
import { useAuthStore, useFunnySongsStore } from '@/stores';

const authStore = useAuthStore();
const { loginToken: authToken, loginName :loginName } = storeToRefs(authStore);

const funnySongsStore = useFunnySongsStore();
const { theSongs } = storeToRefs(funnySongsStore);
funnySongsStore.getAll();

</script>

<template>
    <div>
        <h1>Funny Songs</h1>
        <p>[{{ loginName }}] is logged in with Vue 3 + Pinia & JWT!!</p>        
        <div v-if="theSongs">Some funny songs we've retrieved from the api end point that requires a valid JWT token. [ {{ theSongs.length }}] records retrieved:
            <hr/>
        <div v-if="theSongs.length">
            <!-- .replace("+++", "&") is a kludge to deal with anderpsands in the JSON data the API feeds -->
            <div v-for="thisSong in theSongs" :key="thisSong.id" >
                <RouterLink :to="'/edit/' + thisSong.Id">View/Edit<!--[{{ thisSong.Id }}]--></RouterLink>
                &nbsp;<b>{{thisSong.Title.replace("+++", "&")}}</b>
                <i> by <a v-bind:title="thisSong.ImportedOn">{{ thisSong.Composer.replace("+++", "&") }}</a></i>
                <hr/>
            </div>
        </div>
        <div v-if="theSongs.loading" class="spinner-border spinner-border-sm"></div> 
        <div v-if="theSongs.error" class="text-danger">Error loading data: {{theSongs.error}}</div>
       </div>
       <div v-if="!theSongs">
        <!-- if the API it returning 401 appropriately - the fetch-wrapper will catch it and you'll never see this message -->
        Ooops! something failed. <a href="/logout">You should probably refresh your data.</a>
       </div>
       <div><a href="/">- See 5 more random funny songs -</a></div>
    </div>    
</template>
