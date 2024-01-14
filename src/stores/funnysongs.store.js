import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers';

const baseUrl = `${import.meta.env.VITE_API_URL}/JSON/API`; 

export const useFunnySongsStore = defineStore({
    id: 'funnysongs',
    state: () => ({
        theSongs: {}
    }),
    actions: {
        async getOne( songId ) {
            this.theSongs = { loading: true};
            var thisURL = `${baseUrl}/funnysong/${songId}`;
            fetchWrapper.get(thisURL)
            .then( theSongs => this.theSongs = theSongs)
        },
        async getAll() {
            this.theSongs = { loading: true };
            var thisURL = `${baseUrl}/funnysongs?recordrequest=5`;
            fetchWrapper.get(thisURL) 
                .then(theSongs => this.theSongs = theSongs)
                .catch(theSongs => this.theSongs = null )
        }        
    }
});

