import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function formatDate(rawDate: Date | string) {
  if (rawDate === 'NA') return 'NA';
  const date = new Date(rawDate);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  return `${hours}:${minutes} ${day}/${month}/${year}`;  
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
