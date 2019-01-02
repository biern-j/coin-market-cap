export function handlePriceChange(change) {
  if (change > 0) {
    return "rise";
  }
  if (change < 0) {
    return "fall"
  }
  return "constant";
}