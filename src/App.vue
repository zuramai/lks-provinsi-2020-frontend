<template>
  <div id="app">
    <div class="header">
        <router-link to="/book">
        <span class="buku">Buku</span><span class="bagus">Bagus</span>
        </router-link>
        <div class="right">
            <a href="" @click="logout">Logout</a>
        </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  mounted() {
    this.$router.push("/login")
  },
  name: 'app',
  components: {
    HelloWorld
  },
  
  methods: {
    logout() {
      let token = localStorage.getItem('token');

      this.$axios.get('/auth/logout?token='+token)
        .then(res => {
          localStorage.removeItem('token');
          this.$router.push('/login');    
        }).catch(err => {
            if(err.response.status == 401) {
                this.$router.push('/login')
            }
        })
      

    }
  }
}
</script>

<style>

</style>
