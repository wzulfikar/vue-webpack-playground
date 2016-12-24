<template>
  <form v-on:submit.prevent="submit">
  <div class="form-horizontal">
    <div class="form-group">
      <div class="col-sm-6">
        <label>Date</label>
        <input 
          type="date"
          class="form-control"
          v-model="timeEntry.date"
          placeholder="Date"
          v-validate.initial="timeEntry.date"
          data-vv-rules="required"
          name="date"
        />
        <p class="text-danger" v-if="displayError && errors.has('date')">{{ errors.first('date') }}</p>
      </div>
      <div class="col-sm-6">
        <label>Hours</label>
        <input 
          type="number" 
          class="form-control"
          v-model="timeEntry.totalTime"
          placeholder="Hours"
          v-validate.initial="timeEntry.totalTime"
          data-vv-rules="required|decimal:1"
          name="hours"
          autofocus 
        />
        <p class="text-danger" v-if="displayError && errors.has('hours')">{{ errors.first('hours') }}</p>
      </div>      
    </div>    
    <div class="form-group">
      <div class="col-sm-12">
        <label>Comment</label>
        <input 
          type="text" 
          class="form-control"
          v-model="timeEntry.comment"
          placeholder="Comment"
          v-validate.initial="timeEntry.comment"
          data-vv-rules="required"
          name="comment"
        />
        <p class="text-danger" v-if="displayError && errors.has('comment')">{{ errors.first('comment') }}</p>
      </div>
    </div>
    <button class="btn btn-primary" type="submit">Save</button>
    <button class="btn btn-warning" type="reset" @click="clearErrors">Reset</button>
    <router-link to="/time-entries" class="btn btn-danger">Cancel</router-link>
    <hr>
  </div>
  </form>

</template>

<script>
  export default {
    data () {
      return {
        displayError: true,
        // We default the user object on
        // the timeEntry to have some user details
        timeEntry: {
          user: {
            firstName: 'Ryan',
            lastName: 'Chenkie',
            email: 'ryanchenkie@gmail.com',
            image: 'https://1.gravatar.com/avatar/7f4ec37467f2f7db6fffc7b4d2cc8dc2?s=250&d=retro&r=g'
          }
        }
      }
    },
    methods: {
      clearErrors () {
        this.errors.clear()
        this.displayError = false
      },
      submit () {
        this.$validator.validateAll()
        if (this.errors.any()) {
          this.displayError = true
          return
        }
        this.save()
        this.clearErrors()
      },
      save () {
        let timeEntry = this.timeEntry
        // We dispatch the timeEntry so it can be pushed
        // onto the timeEntries array in the parent component
        this.sharedState.$emit('entries.timeUpdate', timeEntry)
        this.sharedState.$emit('sidebar.timeUpdate', timeEntry)

        // reset time entry
        this.timeEntry = {user: timeEntry.user}
      }
    }
  }
</script>