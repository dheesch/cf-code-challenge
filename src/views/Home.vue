<template>
  <div class="home">
    <Header />
    <div class='content-container'>
      <Search />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Search from '@/components/Search.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Search
  }
}
</script>
