<template>
  <div id="app">
    <calendar :first-day-of-week="1" ref="calendar" :select-date="date"/>
  </div>
</template>

<script type="text/babel">

  import Calendar from '../src/calendar/main'

  export default {
    name: 'App',
    components: {Calendar},
    data() {
      return {
        date: ["2019-09-07"]
      }
    },
    methods: {
      
    }
  }
</script>
