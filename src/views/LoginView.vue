<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

import { useAuthStore } from '@/stores';

const schema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
});

function onSubmit(values, { setErrors }) {
    const authStore = useAuthStore();
    const { username, password } = values;

    return authStore.login(username, password)
        .catch(error => setErrors({ apiError: error }));
}
</script>

<template>
    <div>
        <h1>Funny Songs</h1>
        <p>A demo app using JWT tokens and a list of funny songs. <br/>
        Login with Username: Billy  Password: bob ; your token is good for 2 minutes - so test that out and see what it does after 2 minutes.</p>        
        <!-- <img src="/favicon.ico"> -->
        <h2>Login</h2>
        <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
            <div class="form-group">
                <label>Username</label>
                <Field name="username" type="text" class="form-control" :class="{ 'is-invalid': errors.username }" />                
            </div>            
            <div class="form-group">
                <label>Password</label>
                <Field name="password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }" />
                <div class="invalid-feedback">{{errors.password}}</div>
            </div>            
            <div class="form-group">
                <button class="btn btn-primary" :disabled="isSubmitting">
                    <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                    Login
                </button>
            </div>
            <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">{{errors.apiError}}</div>
            <div v-if="errors.apiError=='417 - Expectation Failed'" class="alert alert-danger mt-3 mb-0">Are you trying to log in WHILE YOU'RE LOGGED IN????!!!</div>
            <!-- this is an edge case - and it persists the error values for some reason -->
        </Form>
        <div>
            <a href="/about" class="nav-item nav-link">Info</a>                
        </div>
    </div>
</template>
