import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//base url
// export const baseUrl = "http://192.168.200.46:7004/api";
export const baseUrl = "https://business.agronomics.pk/business/api";
