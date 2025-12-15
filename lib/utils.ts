import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Code = {
  name: string;
  content: string;
  feedbackCodeId?: number;
};
export function sortCodes(codes: Code[]) {
  const mainIndex = codes.findIndex((code) => code.name.startsWith("main!"));
  let code = [...codes];
  if (mainIndex > -1) {
    code = [...code.splice(mainIndex, 1), ...code];
  }
  return code;
}