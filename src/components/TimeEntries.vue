<template>
  <div>
    <router-link to="/time-entries/log-time" 
      v-if="$route.path !== '/time-entries/log-time'"
      class="btn btn-primary">
      Log Time
    </router-link>
  
    <div v-if="$route.path === '/time-entries/log-time'">
      <h3>Log Time</h3>     
    </div>

    <hr>

    <router-view></router-view>

    <div class="time-entries">
      <p v-if="!timeEntries.length"><strong>No time entries yet</strong></p>

      <div class="list-group">

        <a class="list-group-item" v-for="timeEntry in timeEntries">
          <div class="row">

            <div class="col-sm-2 user-details">
              <img :src="timeEntry.user.image" class="avatar img-circle img-responsive" />
              <p class="text-center">
                <strong>
                  {{ timeEntry.user.firstName }} 
                  {{ timeEntry.user.lastName }}
                </strong>
              </p>
            </div>

            <div class="col-sm-2 text-center time-block">
              <h3 class="list-group-item-text total-time">
                <i class="glyphicon glyphicon-time"></i> 
                {{ timeEntry.totalTime }}
              </h3>
              <p class="label label-primary text-center">
                <i class="glyphicon glyphicon-calendar"></i> 
                {{ timeEntry.date }}
              </p>
            </div>

            <div class="col-sm-7 comment-section">
              <p>{{ timeEntry.comment }}</p>
            </div>

            <div class="col-sm-1">
              <button 
                class="btn btn-xs btn-danger delete-button"
                @click="deleteTimeEntry(timeEntry)">
                X
              </button>
            </div>

          </div>        
        </a>

      </div>
    </div>    
  </div>
</template>

<style>
  .avatar {
    height: 75px;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .user-details {
    background-color: #f5f5f5;
    border-right: 1px solid #ddd;
    margin: -10px 0;
  }
  .time-block {
    padding: 10px;
  }
  .comment-section {
    padding: 20px;
  }
</style>

<script>
  export default {
    data () {
      return {
        // Start out with the existing entry
        // by placing it in the array
        timeEntries: []
      }
    },
    created: function () {
      if (this.sharedState.timeEntries) {
        this.timeEntries = this.sharedState.timeEntries
      }
      this.sharedState.$on('entries.timeUpdate', this.timeUpdate)
      this.sharedState.$on('entries.deleteTime', this.deleteTime)
    },
    beforeDestroy: function () {
      this.sharedState.timeEntries = this.timeEntries
      this.sharedState.$off('entries.timeUpdate', this.timeUpdate)
      this.sharedState.$off('entries.deleteTime', this.deleteTime)
    },
    methods: {
      deleteTimeEntry (timeEntry) {
        // Get the index of the clicked time entry and splice it out
        let index = this.timeEntries.indexOf(timeEntry)
        if (window.confirm('Are you sure you want to delete this time entry?')) {
          this.sharedState.$emit('sidebar.deleteTime', timeEntry)
          this.timeEntries.splice(index, 1)
        }
      },
      timeUpdate (timeEntry) {
        this.timeEntries.push(timeEntry)
        return true
      }
    }
  }
</script>