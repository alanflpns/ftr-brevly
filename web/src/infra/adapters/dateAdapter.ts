import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const timeZone = "America/Bahia";

export function toDate(date?: string | Date): dayjs.Dayjs {
  return dayjs(date).tz(timeZone);
}

export function formatDate(date: string | Date, pattern: string): string {
  return toDate(date).locale("pt-br").format(pattern);
}
