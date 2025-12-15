//number '150000'을 '150,000'으로

export const formatPrice = (value: number | string): string => {
  const num = typeof value === "string" ? Number(value) : value;
  if (isNaN(num)) return "";
  return num.toLocaleString("ko-KR");
}