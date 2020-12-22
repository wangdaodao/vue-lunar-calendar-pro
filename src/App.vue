<template>
  <div id="app">
    <calendar :first-day-of-week="1" ref="calendar" :select-date="date">
    </calendar>
  </div>
</template>

<script>
import Calendar from './components/main.js';

export default {
  name: 'App',
  components: {
    Calendar,
  },
  data() {
    return {
      date: ['2019-09-07'],
    };
  },
};
</script>
