interface TimeSlot {
  startTime: string;
  endTime: string;
}

export function timeToMinutes(time: string): number {
  const [hours = 0, minutes = 0] = time.split(":").map(Number);

  return hours * 60 + minutes;
}

export function minutesToTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function generateTimeSlots(
  startTime: string,
  endTime: string,
  durationMinutes: number,
  breakMinutes: number = 0,
): TimeSlot[] {
  const start = timeToMinutes(startTime);
  const end = timeToMinutes(endTime);

  const slots: TimeSlot[] = [];

  for (
    let current = start;
    current + durationMinutes <= end;
    current += durationMinutes + breakMinutes
  ) {
    slots.push({
      startTime: minutesToTime(current),
      endTime: minutesToTime(current + durationMinutes),
    });
  }

  return slots;
}
