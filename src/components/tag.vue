<template>
  <a href="#" class="tag" :class="{'active':isActive}" @click.prevent="activateBtn" :id="id">
      <span class="tag__name">
          {{name}}
      </span>
      <div class="tag__reset">
          <img :src="require('../assets/icons/times-solid.svg')" alt="Деактивировать тег" >
      </div>
  </a>
</template>

<script>

export default {
    props: {
        name: {
            type: String,
            default: 'Тэг'
        },
        id: {
            type: Number,
            default: 0
        }
    },
    data(){
        return {
            isActive: false
        }
    },
    methods: {
        activateBtn(){
            this.isActive = !this.isActive
            this.$emit('activate', this.isActive)
        }
    }
}
</script>

