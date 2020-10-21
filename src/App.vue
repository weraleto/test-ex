<template>
  <div id="app">
    <div class="container">
      <div class="tags__wrapper">
        <el-tag v-for="(item, index) in categories" :key="index"
          :name="item.name"
          @activate="activateCat($event, item.id)"
        ></el-tag>
      </div>
      <div class="input__wrapper">
        <input type="search" name="searchBooks" placeholder="Поиск по книгам"
          v-model="searchReq"
        >
      </div>
      <div class="cards__wrapper">
        <el-card v-for="(book, index) in filterWords" :key="index"
          :data="book"
        ></el-card>
      </div>
      <button v-show="hasNext" @click="loadNextPage" class="btn btn-more">
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
      currentPage: 1,
      hasNext: true,
      filtratedBooks: [],
      searchReq: ''
    }
  },
  mounted(){
    this.getCategories()
      .then(()=>this.activeCats = this.allCategories)
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
                  res.data.data.list.forEach(it=>{
                    this.books.push(it)
                  })
                  this.hasNext = res.data.data.next
              })
      },
      async activateCat(payload, id){
          this.books = []

        if (payload) {

          await this.activeCats.push(id) 
        } else {

          await this.activeCats.splice(this.activeCats.indexOf(id),1)
        }
           this.getBooks(this.activeCats, this.currentPage)
        
      },
      loadNextPage(){
        this.currentPage++;
      }
      
  },
  computed: {
    allCategories(){
      return this.categories.map(it=>it.id)
    },
    filterWords(){
        if(this.searchReq != '')
        {
          return this.books.filter(it=>{
          
            let isEqual = Object.values(it).some(item => item.toString().toLowerCase().indexOf(this.searchReq.toLowerCase()) !== -1);
            
            if(isEqual) return it;
            return;
            
            
          })
        }else {
          return this.books
        }
      }
  },
  watch: {
    currentPage(){
      this.getBooks(this.activeCats, this.currentPage)
    }
  }
}
</script>
