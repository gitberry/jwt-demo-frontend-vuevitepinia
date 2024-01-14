<script setup>
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router'

import { useAuthStore, useFunnySongsStore } from '@/stores';

const authStore = useAuthStore();
const { loginToken: authToken, loginName :loginName } = storeToRefs(authStore);

const funnySongsStore = useFunnySongsStore();
const { theSongs } = storeToRefs(funnySongsStore);
const route = useRoute()
const id = route.params.Id;
console.log("the ID is",id);
funnySongsStore.getOne(id);
// making it return an array is a kludge - obviously more work
//  needs to happen to this page to make it truly "edit"

</script>

<template>
    <div >
        <h1>EDIT</h1>        
        <div v-if="theSongs.length">
            <div v-for="thisSong in theSongs" :key="thisSong.id">
                <p>{{ thisSong.Title }} ({{ thisSong.Id }})</p>
                <h4>Title</h4>
                <input v-model="thisSong.Title" type="input" class="input1">
                <h4>Composer</h4>
                <input v-model="thisSong.Composer" type="input" class="input1">
                <h4><a v-bind:title="thisSong.ImportedOn">Publisher:</a></h4>
                <input v-model="thisSong.Publisher" type="input" class="input1">
            <button class="SaveButton" title="This is a demo - save functionality stubbed out." onclick="alert('This is a demo - save functionality stubbed out.');">Save</button>
            </div>            
        </div>
        <div v-if="theSongs.loading" class="spinner-border spinner-border-sm"></div> 
        <div v-if="theSongs.error" class="text-danger">Error loading data: {{theSongs.error}}</div>
       <div v-if="!theSongs">
        <!-- if the API it returning 401 appropriately - the fetch-wrapper will catch it and you'll never see this message -->
        Ooops! something failed. <a href="/logout">You should probably refresh your data.</a>
       </div>
       <div><hr/><RouterLink to="/" class="nav-item nav-link">« Back to List</RouterLink></div>       
    </div>    
</template>
