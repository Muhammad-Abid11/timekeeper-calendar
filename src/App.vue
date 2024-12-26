<template>
  <div class="min-h-screen bg-slate-50 p-4">
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <CalendarHeader 
        :current-date="currentDate" 
        @prev-month="handlePrevMonth" 
        @next-month="handleNextMonth" 
      />
      <div class="grid grid-cols-7 gap-px bg-slate-200">
        <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" 
             :key="day" 
             class="bg-slate-100 p-2 text-center text-sm font-medium">
          {{ day }}
        </div>
        <div v-for="date in daysInMonth" 
             :key="date.toISOString()" 
             class="bg-white aspect-square">
          <DayCell 
            :date="date"
            :is-today="isSameDay(date, new Date())"
            :has-time-entry="hasTimeEntry(date)"
            :time-in="getTimeEntry(date) ? getTimeEntry(date).timeIn : null"
            :time-out="getTimeEntry(date) ? getTimeEntry(date).timeOut : null"
            @click="handleDayClick(date)"
          />
        </div>
      </div>
    </div>

    <TimeEntryForm 
      v-if="selectedDate && !showDetails"
      :date="selectedDate"
      :show="!!selectedDate && !showDetails"
      :existing-entry="getTimeEntry(selectedDate)"
      @close="selectedDate = null"
      @save="handleSaveTimeEntry"
    />

    <TimeEntryDetails
      v-if="selectedDate"
      :is-open="showDetails"
      :date="selectedDate"
      :time-in="getTimeEntry(selectedDate) ? getTimeEntry(selectedDate).timeIn : null"
      :time-out="getTimeEntry(selectedDate) ? getTimeEntry(selectedDate).timeOut : null"
      @close="showDetails = false"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import { startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, isSameDay, format } from 'date-fns';
import CalendarHeader from './components/CalendarHeader.vue';
import DayCell from './components/DayCell.vue';
import TimeEntryForm from './components/TimeEntryForm.vue';
import TimeEntryDetails from './components/TimeEntryDetails.vue';

export default Vue.extend({
  name: 'App',
  components: {
    CalendarHeader,
    DayCell,
    TimeEntryForm,
    TimeEntryDetails
  },
  data() {
    return {
      currentDate: new Date(),
      selectedDate: null,
      timeEntries: [],
      showDetails: false
    };
  },
  computed: {
    daysInMonth() {
      return eachDayOfInterval({
        start: startOfMonth(this.currentDate),
        end: endOfMonth(this.currentDate),
      });
    }
  },
  methods: {
    handlePrevMonth() {
      this.currentDate = subMonths(this.currentDate, 1);
    },
    handleNextMonth() {
      this.currentDate = addMonths(this.currentDate, 1);
    },
    handleDayClick(date) {
      const entry = this.timeEntries.find(entry => 
        entry.date === format(date, 'yyyy-MM-dd')
      );
      
      this.selectedDate = date;
      this.showDetails = !!entry;
    },
    handleSaveTimeEntry(timeIn, timeOut) {
      if (this.selectedDate) {
        const newEntry = {
          date: format(this.selectedDate, 'yyyy-MM-dd'),
          timeIn,
          timeOut,
        };
        this.timeEntries.push(newEntry);
        this.selectedDate = null;
        this.$toast.success(`Time entry for ${format(this.selectedDate, 'MMMM d, yyyy')} has been saved.`);
      }
    },
    getTimeEntry(date) {
      return this.timeEntries.find(entry => 
        entry.date === format(date, 'yyyy-MM-dd')
      );
    },
    hasTimeEntry(date) {
      return this.timeEntries.some(entry => 
        entry.date === format(date, 'yyyy-MM-dd')
      );
    }
  }
});
</script>