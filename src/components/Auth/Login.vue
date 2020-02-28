<template>
    <div class="container auth">
        <div class="form">
            <h3>Login</h3>
            <div class="alert alert-danger" v-if="loginData.error !== false">
                {{loginData.error.message}}
            </div>
            <form action="" class='mt-20' @submit.prevent="login()">
                <input type="text" class='form-control' placeholder="Username" v-model="loginData.username">
                <input type="password" class='form-control' placeholder="Password" v-model="loginData.password">
                <input type="submit" value="Login" class='btn float-right'>
            </form>
        </div>
        <div class="form">
            <h3>Register</h3>
            <div class="alert alert-danger" v-if="registerData.error.status == false">
                <ul>
                    <li v-for="(key) in registerData.error.errors" :key="key">
                        {{key[0]}}
                    </li>
                </ul>
            </div>
            <form action="" @submit.prevent="register()">
                <input class='form-control' type="text" placeholder="First Name" v-model="registerData.first_name">
                <input class='form-control' type="text" placeholder="Last Name" v-model="registerData.last_name">
                <input class='form-control' type="text" placeholder="Username" v-model="registerData.username">
                <input class='form-control' type="password" placeholder="Password" v-model="registerData.password">
                <input class='form-control' type="password" placeholder="Confirm Password" v-model="registerData.confirm_password">
                <input class='btn float-right' type="submit" value="Register">
            </form>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        let token = localStorage.getItem('token');
        this.$axios.get(`/book?token=${token}`)
            .then(res => {
                this.$router.push('/book')
                console.log(res);
            }).catch(err => {
                if(err.response.status == 401) {
                this.$router.push('/login')
                }
            })
    },
    data() {
        return {
            loginData: {
                username: '',
                password: '',
                success: false,
                error: false,
            },
            registerData: {
                error: '',
                username: '',
                password: '',
                confirm_password: '',
                first_name: '',
                last_name: '',
            }
        }
    },
    methods: {
        login() {
            this.$axios.post('/auth/login', {username: this.loginData.username, password: this.loginData.password})
                .then(res => {
                    localStorage.setItem('token', res.data.token)
                    this.$router.push('/book');
                }).catch(err => {
                    console.log(err.response.data)
                    this.loginData.error = err.response.data
                });
        },
        register() {
            this.$axios.post("/auth/register", {username: this.registerData.username, password: this.registerData.password, first_name: this.registerData.first_name, last_name: this.registerData.last_name})
                .then(res => {
                    let token = res.data.token;
                    localStorage.setItem('token',token);
                    this.$router.push('/book');
                    console.log(res);
                }).catch(err => {
                    this.registerData.error = err.response.data
                    console.log(err.response);
                })
        }
    }
}
</script>