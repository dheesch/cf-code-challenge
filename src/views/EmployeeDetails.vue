<template>
  <div>
    <Header />
    <div class="content-container">
      <EmployeeDetail :id="$route.params.id" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import EmployeeDetail from "@/components/EmployeeDetail.vue";
import axios from "axios";

export default {
  name: "EmployeeDetails",
  components: {
    Header,
    EmployeeDetail,
  },
};
</script>
