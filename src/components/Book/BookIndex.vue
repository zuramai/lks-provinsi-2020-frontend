<template>
    <div class="container">
        <div class="card books">
            <div class="card-header">
                <h4>Books</h4>
            </div>
            <div class="card-body">
                <router-link to="/book/add" class='btn float-right'>Add Book</router-link>
                <div class="table table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Avg Rating</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="book in books" :key="book.id">
                                <td>{{book.title}}</td>
                                <td><template v-for="author in book.authors">{{author}}; </template></td>
                                <td>{{ book.average_rating }}</td>
                                <td><router-link :to="`/book/${book.id}`" class='btn'>Open</router-link></td>
                            </tr>
                           
                        </tbody>
                    </table>
                </div>
            </div>
          
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        this.getData();
    },
    data() {
        return {
            token: localStorage.getItem('token'),
            books: []
        }
    },
    methods: {
        getData() {
            this.$axios.get(`/book?token=${this.token}`)
                .then(res => {
                    console.log(res);
                    this.books = res.data.data
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