<template>
  <Dialog :open="isOpen" @update:open="$emit('close')">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle class="text-xl font-semibold flex items-center gap-2">
          {{ format(date, 'MMMM d, yyyy') }}
          <CheckCircle2 v-if="timeIn && timeOut" class="w-5 h-5 text-green-500" />
        </DialogTitle>
      </DialogHeader>
      <div class="space-y-4 py-4">
        <div class="flex items-center justify-between px-4 py-2 bg-slate-50 rounded-lg">
          <div class="flex items-center gap-2">
            <ArrowRight class="w-4 h-4 text-blue-500" />
            <span class="text-sm font-medium">Time In</span>
          </div>
          <span class="text-sm font-semibold">{{ formatTime(timeIn) }}</span>
        </div>
        <div class="flex items-center justify-between px-4 py-2 bg-slate-50 rounded-lg">
          <div class="flex items-center gap-2">
            <ArrowLeft class="w-4 h-4 text-yellow-500" />
            <span class="text-sm font-medium">Time Out</span>
          </div>
          <span class="text-sm font-semibold">{{ formatTime(timeOut) }}</span>
        </div>
        <div class="flex items-center justify-between px-4 py-2 bg-blue-50 rounded-lg">
          <div class="flex items-center gap-2">
            <Clock class="w-4 h-4 text-blue-600" />
            <span class="text-sm font-medium">Total Duration</span>
          </div>
          <span class="text-sm font-semibold text-blue-600">
            {{ calculateDuration }}
          </span>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { format } from 'date-fns';
import { ArrowRight, ArrowLeft, Clock, CheckCircle2 } from 'lucide-vue-next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const props = defineProps<{
  isOpen: boolean;
  date: Date;
  timeIn?: string;
  timeOut?: string;
}>();

defineEmits(['close']);

const formatTime = (time?: string) => {
  if (!time) return 'Not set';
  return format(new Date(`2000-01-01T${time}`), 'hh:mm a');
};

const calculateDuration = computed(() => {
  if (!props.timeIn || !props.timeOut) return '0 hours';
  
  const [inHours, inMinutes] = props.timeIn.split(':').map(Number);
  const [outHours, outMinutes] = props.timeOut.split(':').map(Number);
  
  const totalMinutes = (outHours * 60 + outMinutes) - (inHours * 60 + inMinutes);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  return `${hours}h ${minutes}m`;
});
</script>