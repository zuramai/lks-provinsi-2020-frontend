<template>
    <div class="container detail">
        <div class="book-title">
            <h3>{{book.title}}</h3>
        </div>
        <!-- <div class="book-author">
            by 
        </div> -->
        <table class='table table-bordered'>
            <tr>
                <td>Authors:</td>
                <td><template v-for="author in book.authors">{{author}}; </template></td>
            </tr>
            <tr>
                <td>ISBN:</td>
                <td>{{book.isbn}}</td>
            </tr>
            <tr>
                <td>Number of Pages:</td>
                <td>{{book.pages}}</td>
            </tr>
        </table>
        <div class="book-rating"> 
            <!-- koma, titik, titik -->
            <div>Average Rating: {{book.rating.average}} &#8901; {{book.rating.total}} ratings &#8901; {{book.review.total}} reviews</div>
            <table>
                <tr><td>&#x2605;&#x2605;&#x2605;&#x2605;&#x2605;</td><td>{{book.rating.five_star_percentage}}% ({{book.rating.five_star_count}})</td></tr>
                <tr><td>&#x2605;&#x2605;&#x2605;&#x2605;</td><td>{{book.rating.four_star_percentage}}% ({{book.rating.four_star_count}})</td></tr>
                <tr><td>&#x2605;&#x2605;&#x2605;</td><td>{{book.rating.three_star_percentage}}% ({{book.rating.three_star_count}})</td></tr>
                <tr><td>&#x2605;&#x2605;</td><td>{{book.rating.two_star_percentage}}% ({{book.rating.two_star_count}})</td></tr>
                <tr><td>&#x2605;</td><td>{{book.rating.one_star_percentage}}% ({{book.rating.one_star_count}})</td></tr>
            </table>
        </div>
    <hr style="margin: 40px 0">
        <div class="review-container">
            <h3>Reviews</h3>
            <div class='per-review' v-for="review in book.review.data" :key="review.id">
                <div class="reviewer-name">{{review.user_name}} <span class="reviewer-rating" :key="i" v-for="i in review.rating">&#x2605;</span></div>
                <span style="float:right">{{review.created_at}}</span>
                <div class="review">{{review.review}}</div>
            </div>

        </div>

        <div class="addreview">
            <h3>Add a Review</h3>
            <form @submit.prevent="addReview()">
                <div>
                    <label for="">Rating: </label>
                    <select v-model="add.rating" class='form-control'>
                        <option value="none">none</option>
                        <option value="5" selected>&#x2605;&#x2605;&#x2605;&#x2605;&#x2605;</option>
                        <option value="4">&#x2605;&#x2605;&#x2605;&#x2605;</option>
                        <option value="3">&#x2605;&#x2605;&#x2605;</option>
                        <option value="2">&#x2605;&#x2605;</option>
                        <option value="1">&#x2605;</option>
                    </select>
                </div>
           
            <div>
                <label for="">Review</label>
                <textarea placeholder="Write Review..." cols="75" rows="5" class='form-control' v-model="add.review"></textarea>
            </div>
            <div>
                <button type="submit" class="btn float-right">Submit</button>
            </div>
        </form>
    </div>
        </div>

        
</template>
<script>
export default {
    mounted() {
        this.getData();
    },
    data(){
        return {
            book: {},
            book_id: this.$route.params.id,
            token: localStorage.getItem('token'),
            add: {
                rating: 5,
                review: '',
            },
            reviews: []
        }   
    },
    methods: {
        getData() {
            this.$axios.get(`/book/${this.book_id}?token=${this.token}`)
                .then(res=> {
                    this.book = res.data.data;
                    console.log(res.data.data);
                }).catch(err => {
                    if(err.response.status == 401) {
                        this.$router.push('/login')
                    }
                });
        },

        addReview() {
            this.$axios.post(`/book/${this.book_id}/rating?token=${this.token}`, {rating:this.add.rating})
                .then(res => {
                    console.log('rating success')
                });

            this.$axios.post(`/book/${this.book_id}/review?token=${this.token}`, {review:this.add.review})
                .then(res => {
                    console.log('review successs');
                    this.getData();
                    this.add.review = "";
                })
        }
    }
}
</script>