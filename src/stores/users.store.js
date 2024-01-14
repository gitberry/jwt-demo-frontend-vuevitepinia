// this was original code from the example that I cloned and then modified
// to include an actual backend
// that original code was here:
// https://github.com/cornflourblue/vue-3-pinia-jwt-authentication-example
// -----------------------------------------------------------------------

// import { defineStore } from 'pinia';

// import { fetchWrapper } from '@/helpers';

// //const baseUrl = `${import.meta.env.VITE_API_URL}/users`;
// const baseUrl = `${import.meta.env.VITE_API_URL}/API/users`;

// export const useUsersStore = defineStore({
//     id: 'users',
//     state: () => ({
//         users: {}
//     }),
//     actions: {
//         async getAll() {
//             this.users = { loading: true };
//             fetchWrapper.get(baseUrl)
//                 .then(users => this.users = users)
//                 .catch(error => this.users = { error })
//         }
//     }
// });
