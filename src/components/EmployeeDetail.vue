<template>
  <div class="container-fluid" v-if="!isLoading">
    <div class="row center">
      <div class="col-xs-12">
        <img :src="data.headshot.large" class="headshot" />
      </div>
      <div class="col-xs-12">
        <h1>{{ name }}</h1>
        <p class="smallest">
          <router-link
            v-for="(skill, index) in data.skills"
            :to="'/skill/' + skill.id"
            tag="span"
            class="chip"
            :key="data.id + '-skill-' + index"
          >
            {{ skill.id }}
          </router-link>
        </p>
      </div>

      <div class="col-sm-4 col-xs-12">
        <div class="info-section">
          <h2><i class="fas fa-user-circle"></i></h2>
          <ul>
            <li>{{ data.department }}</li>
            <li>{{ data.job_title }}</li>
            <li>{{ data.date_started }}</li>
          </ul>
        </div>
      </div>
      <div class="col-sm-4 col-xs-12">
        <div class="info-section">
          <h2><i class="fas fa-map-marker-alt"></i></h2>
          <ul>
            <li>{{ data.location.street }}</li>
            <li>{{ data.location.city }}, {{ data.location.state }}</li>
            <li>{{ data.location.postcode }}</li>
          </ul>
        </div>
      </div>
      <div class="col-sm-4 col-xs-12">
        <div class="info-section">
          <h2><i class="fas fa-address-book"></i></h2>
          <ul>
            <li v-if="data.phone">
              <a :href="'tel:' + data.phone">
                {{ data.phone }}
              </a>
            </li>
            <li v-if="data.email">
              <a :href="'mailto:' + data.email">
                {{ data.email }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row" v-if="reports.length > 0">
      <h2 class="center">Direct Reports</h2>
      <div class="col-xs-12">
        <Employee
          v-for="(employee, index) in reports"
          :key="'employee-' + index"
          :data="employee"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Employee from "@/components/Employee.vue";
export default {
  name: "EmployeeDetail",
  components: {
    Employee,
  },
  props: {
    id: {
      type: String,
      default: 0,
    },
  },
  data: () => {
    return {
      isLoading: true,
      employees: [],
      data: {},
      reports: [],
    };
  },
  computed: {
    name: function () {
      return (
        this.data.name.title +
        " " +
        this.data.name.first +
        " " +
        this.data.name.last
      );
    },
  },
  watch: {
    id: function () {
      this.data = this.employees[this.id - 1];

      this.reports = this.employees.filter((val) => {
        return val.manager_id == this.id && val.id != this.id;
      });

      window.scrollTo({
        top: 0,
        left: 0,
      });
    },
  },
  mounted() {
    axios
      .get("data.json")
      .then((response) => {
        this.isLoading = false;
        this.employees = response.data.results;
        this.data = response.data.results[this.id - 1];
        if (this.data.is_manager) {
          this.reports = response.data.results.filter((val) => {
            return val.manager_id == this.id && val.id != this.id;
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
