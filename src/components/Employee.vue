<template>
  <div class="container-fluid employee-data">
    <div class="row">
      <div class="col-sm-3 col-xs-12 employee-thumbnail">
        <img :src="data.headshot.large" class="headshot" />
      </div>
      <div class="col-sm-9 col-xs-12 employee-information">
        <router-link :to="'/employee/' + data.id" class="h3">
          {{ fullName }}
        </router-link>
        <p><span class="bold">Title: </span> {{ data.job_title }}</p>
        <p><span class="bold"> Department: </span> {{ data.department }}</p>
        <p v-if="data.phone">
          <a :href="'tel:' + data.phone">
            <i class="fas fa-phone"></i>
          </a>
          {{ data.phone }}
        </p>
        <p v-if="data.email">
          <a :href="'mailto:' + data.email">
            <i class="fas fa-envelope"></i>
          </a>
          {{ data.email }}
        </p>
        <p>
          <span class="bold">
            <i class="fas fa-map-marker-alt"></i>
          </span>
          {{ data.location.state }} -
          <span v-if="!isAvailable" class="time-warning">
            Currently outside of business hours
          </span>
          <span v-else class="time-available"> Available </span>
        </p>
        <router-link :to="'/employee/' + data.id" tag="button" class="btn">
          Learn More!
        </router-link>
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
    </div>
  </div>
</template>

<script>
export default {
  name: "Employee",
  props: {
    data: {},
  },
  computed: {
    fullName: function () {
      return (
        this.data.name.title +
        " " +
        this.data.name.first +
        " " +
        this.data.name.last
      );
    },
    isAvailable: function () {
      var currentDate = new Date();
      var currentTime = currentDate.getTime();

      // year, month index, day
      var dstBegin = new Date(currentDate.getFullYear(), 10, 7).getTime();
      var dstEnd = new Date(currentDate.getFullYear() + 1, 3, 14).getTime();

      // js Date timezoneOffset is in minutes
      var theirOffset = parseInt(this.data.location.timezone.offset) * 60;
      var theirTime = "";

      // adjust their offset for daylight savings time if needed
      if (currentTime >= dstBegin && currentTime <= dstEnd) {
        theirOffset -= 60;
      }

      theirTime = new Date(
        currentTime + (currentDate.getTimezoneOffset() + theirOffset) * 60000
      ).getHours();
      console.log(theirTime);

      return theirTime >= 8 && theirTime < 17;
    },
  },
};
</script>
