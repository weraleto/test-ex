<template>
  <div id="app">
    <div class="container">
      <div class="tags__wrapper">
        <el-tag v-for="(item, index) in categories" :key="index"
          :name="item.name"
          :id="item.id"
        ></el-tag>
      </div>
      <div class="cards__wrapper">
        <el-card v-for="(book, index) in books.list" :key="index"
          :data="book"
        ></el-card>
      </div>
      <button class="btn btn-more">
        Загрузить еще 
      </button>
    </div>
  </div>
</template>

<script>
import elTag from './components/tag'
import elCard from './components/card'

export default {
  name: 'app',
  components: {
    elTag, elCard
  },
  data () {
    return {
      categories: [],
      books: [],
      activeCats: [],
      currentPage: 1
    }
  },
  mounted(){
    this.getCategories()
      .then(()=>this.getBooks(this.allCategories, this.currentPage))
    
  },
  methods: {
      async getCategories(){
          await this.$http.post('/book/categories')
              .then(res=>{
                  this.categories = res.data.data.list
              })
      },
      async getBooks(cats,page){
          await this.$http.post('/book/list',{
            categories: cats,
            page: page
          })
              .then(res=>{
                  this.books = res.data.data
              })
      }
  },
  computed: {
    allCategories(){
      return this.categories.map(it=>it.id)
    }
  }
}
</script>
