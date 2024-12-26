<template>
  <Dialog :open="show" @update:open="$emit('close')">
    <DialogContent class="sm:max-w-md">
      <form @submit.prevent="handleSubmit" class="space-y-4 p-4">
        <h3 class="text-lg font-semibold mb-4">
          Time Entry for {{ format(date, 'MMMM d, yyyy') }}
        </h3>
        <div v-if="existingEntry" class="space-y-4">
          <div class="flex items-center justify-between px-4 py-2 bg-slate-50 rounded-lg">
            <div class="flex items-center gap-2">
              <ArrowRight class="w-4 h-4 text-blue-500" />
              <span class="text-sm">Time In: {{ formatTime(existingEntry.timeIn) }}</span>
            </div>
          </div>
          <div class="flex items-center justify-between px-4 py-2 bg-slate-50 rounded-lg">
            <div class="flex items-center gap-2">
              <ArrowLeft class="w-4 h-4 text-yellow-500" />
              <span class="text-sm">Time Out: {{ formatTime(existingEntry.timeOut) }}</span>
            </div>
          </div>
        </div>
        <div v-else class="space-y-4">
          <div class="flex items-center space-x-2">
            <Clock class="w-4 h-4 text-slate-500" />
            <input
              type="time"
              v-model="timeIn"
              required
              class="flex h-10 w-32 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <span>to</span>
            <input
              type="time"
              v-model="timeOut"
              required
              class="flex h-10 w-32 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            class="inline-flex w-full items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Save Time Entry
          </button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { format } from 'date-fns';
import { Clock, ArrowRight, ArrowLeft } from 'lucide-vue-next';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface TimeEntry {
  timeIn: string;
  timeOut: string;
}

const props = defineProps<{
  date: Date;
  show: boolean;
  existingEntry?: TimeEntry;
}>();

const emit = defineEmits(['close', 'save']);

const timeIn = ref('');
const timeOut = ref('');

const formatTime = (time: string) => {
  return format(new Date(`2000-01-01T${time}`), 'hh:mm a');
};

const handleSubmit = () => {
  if (!props.existingEntry) {
    emit('save', timeIn.value, timeOut.value);
    timeIn.value = '';
    timeOut.value = '';
  }
};
</script>