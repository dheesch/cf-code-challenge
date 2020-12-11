<template>
  <div>
    <ul class="search-bar">
      <li class="search-input">
        <i class="fas fa-search"></i>
        <input
          class="search-input"
          v-model.lazy="searchTerm"
          v-debounce="250"
        />
      </li>
      <li class="dropdown-item">
        <i class="fas fa-chevron-down"></i>
        Location
        <transition name="fade">
          <div class="dropdown p">
            <ul>
              <li
                v-for="(location, index) in locations"
                :key="'location-' + index"
              >
                <router-link :to="'/state/' + location">
                  {{ location }}
                </router-link>
              </li>
            </ul>
          </div>
        </transition>
      </li>
      <li class="dropdown-item">
        <i class="fas fa-chevron-down"></i>
        Department
        <transition name="fade">
          <div class="dropdown">
            <li
              v-for="(department, index) in departments"
              :key="'department-' + index"
            >
              <router-link :to="'/department/' + department">
                {{ department }}
              </router-link>
            </li>
          </div>
        </transition>
      </li>
    </ul>
    <Employee
      v-for="(employee, index) in filteredStaff"
      :key="'employee-' + index"
      :data="employee"
    />
  </div>
</template>

<script>
import axios from "axios";
import debounce from "v-debounce";
import Employee from "@/components/Employee.vue";

export default {
  name: "Search",
  directives: {
    debounce,
  },
  components: {
    Employee,
  },
  props: {
    department: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    skill: {
      type: String,
      default: "",
    },
  },
  data: () => {
    return {
      employees: [],
      departments: [],
      locations: [],
      searchTerm: "",
      filteredEmployees: [],
    };
  },
  computed: {
    filteredStaff: function () {
      var returnVal = this.employees.filter((val) => {
        return this.isRelevantToPage(val);
      });

      if (this.searchTerm === "") {
        return returnVal;
      }

      returnVal = returnVal.filter((val) => {
        return this.isMatch(val);
      });
      return returnVal;
    },
  },
  methods: {
    matchSkill: function (skill, skills) {
      var re = new RegExp(skill, "i");
      if (!skill) {
        return true;
      }
      for (var i = 0; i < skills.length; i++) {
        if (skills[i].id.search(re) > -1) {
          return true;
        }
      }

      return false;
    },
    isMatch: function (employee) {
      var name =
        employee.name.title +
        " " +
        employee.name.first +
        " " +
        employee.name.last;
      var re = new RegExp(this.searchTerm, "i");
      return (
        name.search(re) > -1 ||
        employee.location.state.search(re) > -1 ||
        employee.department.search(re) > -1 ||
        employee.job_title.search(re) > -1 ||
        this.matchSkill(this.searchTerm, employee.skills)
      );
    },
    isRelevantToPage: function (employee) {
      if (this.skill != "") {
        return this.matchSkill(this.skill, employee.skills);
      } else if (this.state != "") {
        return employee.location.state == this.state;
      } else if (this.department != "") {
        return employee.department == this.department;
      } else {
        return true;
      }
    },
  },
  mounted() {
    const distinct = (val, index, self) => {
      return self.indexOf(val) === index;
    };

    axios
      .get("data.json")
      .then((response) => {
        // console.log(response.data.results);
        this.employees = response.data.results;
        //   console.log(this.department);
        //   console.log(this.location);
        //   console.log(this.skill);
        // });
        console.log(this.employees);
        console.log("##############################################");
        this.departments = response.data.results
          .map((x) => x.department)
          .filter(distinct);
        this.locations = response.data.results
          .map((x) => x.location.state)
          .filter(distinct);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
