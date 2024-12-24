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
            :time-in="getTimeEntry(date)?.timeIn"
            :time-out="getTimeEntry(date)?.timeOut"
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
      :time-in="getTimeEntry(selectedDate)?.timeIn"
      :time-out="getTimeEntry(selectedDate)?.timeOut"
      @close="showDetails = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, isSameDay, format } from 'date-fns';
import CalendarHeader from './components/CalendarHeader.vue';
import DayCell from './components/DayCell.vue';
import TimeEntryForm from './components/TimeEntryForm.vue';
import TimeEntryDetails from './components/TimeEntryDetails.vue';
import { useToast } from 'vue-toastification';

interface TimeEntry {
  date: string;
  timeIn: string;
  timeOut: string;
}

const toast = useToast();
const currentDate = ref(new Date());
const selectedDate = ref<Date | null>(null);
const timeEntries = ref<TimeEntry[]>([]);
const showDetails = ref(false);

const daysInMonth = computed(() => 
  eachDayOfInterval({
    start: startOfMonth(currentDate.value),
    end: endOfMonth(currentDate.value),
  })
);

const handlePrevMonth = () => {
  currentDate.value = subMonths(currentDate.value, 1);
};

const handleNextMonth = () => {
  currentDate.value = addMonths(currentDate.value, 1);
};

const handleDayClick = (date: Date) => {
  const entry = timeEntries.value.find(entry => 
    entry.date === format(date, 'yyyy-MM-dd')
  );
  
  selectedDate.value = date;
  showDetails.value = !!entry;
};

const handleSaveTimeEntry = (timeIn: string, timeOut: string) => {
  if (selectedDate.value) {
    const newEntry = {
      date: format(selectedDate.value, 'yyyy-MM-dd'),
      timeIn,
      timeOut,
    };
    timeEntries.value.push(newEntry);
    selectedDate.value = null;
    toast.success(`Time entry for ${format(selectedDate.value, 'MMMM d, yyyy')} has been saved.`);
  }
};

const getTimeEntry = (date: Date) => {
  return timeEntries.value.find(entry => 
    entry.date === format(date, 'yyyy-MM-dd')
  );
};

const hasTimeEntry = (date: Date) =>
  timeEntries.value.some(entry => entry.date === format(date, 'yyyy-MM-dd'));
</script>