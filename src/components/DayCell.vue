<template>
  <button
    class="h-full w-full p-2 flex flex-col items-center justify-between space-y-1 hover:bg-slate-100 relative"
    :class="{ 'bg-blue-50 hover:bg-blue-100': isToday }"
    @click="$emit('click')"
  >
    <span
      class="text-sm font-medium"
      :class="{ 'text-blue-600': isToday }"
    >
      {{ format(date, 'd') }}
    </span>
    
    <div class="flex flex-col items-center gap-1 text-xs">
      <template v-if="hasTimeEntry">
        <div v-if="timeIn" class="flex items-center gap-1">
          <ArrowRight class="w-4 h-4 text-blue-500" />
          <span>{{ formatTime(timeIn) }}</span>
        </div>
        <div v-if="timeOut" class="flex items-center gap-1">
          <ArrowLeft class="w-4 h-4 text-yellow-500" />
          <span>{{ formatTime(timeOut) }}</span>
        </div>
        <CheckCircle2 v-if="timeIn && timeOut" class="w-4 h-4 text-green-500" />
      </template>
      <Clock v-else class="w-4 h-4 text-gray-400" />
    </div>
  </button>
</template>

<script setup lang="ts">
import { format } from 'date-fns';
import { Clock, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-vue-next';

defineProps<{
  date: Date;
  isToday: boolean;
  hasTimeEntry: boolean;
  timeIn?: string;
  timeOut?: string;
}>();

defineEmits(['click']);

const formatTime = (time?: string) => {
  if (!time) return '';
  return format(new Date(`2000-01-01T${time}`), 'HH:mm');
};
</script>