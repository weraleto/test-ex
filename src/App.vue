<template>
  <div id="app">
    <div class="container">
      <div class="tags__wrapper">
        <el-tag v-for="(item, index) in categories" :key="index"
          :name="item.name"
          :isActive="activeCats.indexOf(item.id)!=-1"
          @activate="activateCat($event, item.id)"
        ></el-tag>
      </div>
      <div class="input__wrapper">
        <input ref="inputField" type="search" name="searchBooks" placeholder="Поиск по книгам"
          v-model="searchReq"
          @input="onFilter"
          @keyup.delete="resetBooks"
        >
      </div>
      <div class="cards__wrapper">
        <template v-show="filterWords.length > 0">
          <el-card v-for="(book, index) in filterWords" :key="index"
            :data="book"
          ></el-card>
        </template>
        <div v-show="filterWords.length == 0" class="no-results">
          По вашему запросу ничего не найдено
        </div>
      </div>
      <div class="btn__wrapper">
        <button v-if="hasNext" @click="loadNextPage" class="btn">
          Загрузить еще 
        </button>
      </div>
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
      searchReq: ''
    }
  },
  mounted(){
    const query = this.$route.query
      this.getCategories()
        .then(()=>{
          
          if(Object.keys(query).length>0){
            this.activeCats = query.cats.split(',').map(it=>+it)
            
            this.currentPage = query.search ? query.page : 1;
          }else{
            this.activeCats = this.allCategories
          }
        })
        .then(()=>this.getBooks(this.activeCats, this.currentPage))
        .then(()=>{
          this.searchReq = query.search
        })
        .then(
          ()=>this.onFilter()
        )

    
    
  },
  methods: {
      async getCategories(){
          await this.$http.post('/book/categories')
              .then(res=>{
                  this.categories = res.data.data.list
              })
      },
      async getBooks(cats,page){
          if(cats.length>0){
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
                .then(()=>{
                  this.pushState(page, cats)
                })
          }else{
            this.books=[]
          }
          
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
      },
      resetBooks(){
        this.books = []
        this.currentPage = 1; 
        if(this.searchReq == ''){
          this.getBooks(this.activeCats, this.currentPage)
        }
      },
      onFilter(){
        this.pushState(1, this.activeCats)
        if (this.filterLen&&this.searchReq !=''&&this.hasNext) {
          this.currentPage++
          
        }
        
      },
      pushState(page, cats){
        this.$router.replace({query: {
          page: page,
          cats: cats.join(','),
          search: this.searchReq
        }}).catch(err => {})
      }
      
  },
  computed: {
    allCategories(){
      return this.categories.map(it=>it.id)
    },
    filterWords(){
        if(this.searchReq&&this.searchReq.length > 0)
        {
          return this.books.filter(it=>{
          
            let isEqual = Object.values(it).some(item => item.toString().toLowerCase().indexOf(this.searchReq.toLowerCase()) !== -1);
            
            if(isEqual) return it;
            return;
            
            
          })
        }else {
          return this.books
        }
    },
    filterLen(){
      return this.filterWords.length <= 9
    }
  },
  watch: {
    currentPage(){
      this.getBooks(this.activeCats, this.currentPage)
        .then(()=>{
          this.onFilter()
        })
    },
    
  },
}
</script>
