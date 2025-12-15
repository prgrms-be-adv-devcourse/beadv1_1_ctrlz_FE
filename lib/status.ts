export const getProductStatus = (status: String) => {
  if(status === "NEW") return "새상품";
  if(status === "GOOD") return "양호";
  return "보통"
}

export const getTradeStatus = (status: String) => {
  if(status === "SELLING") return "판매중"
  if(status === "PROCESSING") return "거래중"
  return "판매완료"
}