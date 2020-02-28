<template>
        <div class="container">
            <div class="form">
                <div class="alert-success" v-if="this.add.success !== false">{{ this.add.success }}</div>
                <div class="alert alert-danger" v-if="this.add.error.status == false">
                    <ul>
                        <li v-for="(key) in this.add.error.errors" :key="key">
                            {{key[0]}}
                        </li>
                    </ul>
                </div>
                <h3>Add book</h3>
                <div class="card-body">
                    <form action="" @submit.prevent="addBook()">
                        <input type="text" placeholder="book title" class='form-control' v-model="add.title">
                        <input type="text" placeholder="ISBN" class='form-control' v-model="add.isbn">
                        <input type="number" min=1 placeholder="number of pages" class='form-control' v-model="add.number_of_pages">
                        <input type="text" placeholder="author" class='form-control' v-model="add.authors[index]" :key="index" v-for="(author,index) in add.authors">
                        <input type="submit" value="Add Book" class='btn float-right'>
                        <button class='btn-sky float-right' type="button" @click="add.authors.push('')">add another author</button>
                    </form>
                </div>
            </div>
        </div>
</template>
<script>
export default {
    mounted() {

    },
    data() {
        return {
            token: localStorage.getItem('token'),
            add: {
                title: '',
                isbn: '',
                number_of_pages: '',
                authors: [""],
                success: false,
                error: false
            },
            errors: []
        }
    },
    methods: {
        addBook() {
            this.$axios.post(`/book?token=${this.token}`, {title:this.add.title, pages: this.add.number_of_pages, authors: this.add.authors, isbn: this.add.isbn})
                .then(res=>{
                    this.add.success = res.data.message;
                    this.add.title = "";
                    this.add.authors = [""];
                    this.add.isbn = '';
                    this.add.number_of_pages = ''
                }).catch(err => {
                    if(err.response.status == 401) {
                        this.$router.push('/login')
                    }else{
                        this.add.error = err.response.data
                    }
                });
        }
    }
}
</script>