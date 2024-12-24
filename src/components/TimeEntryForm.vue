<template>
  <Dialog :open="show" @update:open="$emit('close')">
    <DialogContent class="sm:max-w-md">
      <form @submit.prevent="handleSubmit" class="space-y-4 p-4">
        <h3 class="text-lg font-semibold mb-4">
          Time Entry for {{ format(date, 'MMMM d, yyyy') }}
        </h3>
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
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { format } from 'date-fns';
import { Clock } from 'lucide-vue-next';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const props = defineProps<{
  date: Date;
  show: boolean;
}>();

const emit = defineEmits(['close', 'save']);

const timeIn = ref('');
const timeOut = ref('');

const handleSubmit = () => {
  emit('save', timeIn.value, timeOut.value);
  timeIn.value = '';
  timeOut.value = '';
};
</script>