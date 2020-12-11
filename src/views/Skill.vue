<template>
  <div>
    <Header />
    <div class="content-container">
      <h1>{{ $route.params.id }}</h1>
      <Search :skill="$route.params.id" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Search from '@/components/Search.vue'

export default {
  name: 'Skill',
  components: {
    Header,
    Search
  }
}
</script>
