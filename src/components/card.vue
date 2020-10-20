<template>
  <div class="book-card">
      <div class="book-card__img" >
          <img :src="data.image" :alt="data.name" >
      </div>
      <div class="book-card__inner">
        <p class="book-card__element">
            <span class="book-card__label">
                Название книги:
            </span>
            {{data.name}}
        </p>
        <p class="book-card__element">
            <span class="book-card__label">
                Описание книги:
            </span>
            {{data.description}}
        </p>
        <p class="book-card__element">
            <span class="book-card__label">
                Имя автора:
            </span>
            {{data.author}}
        </p>
        <p class="book-card__element">
            <span class="book-card__label">
                Год выпуска книги:
            </span>
            {{data.year}}
        </p>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: {}
        }
    }
}
</script>

<style>

</style>