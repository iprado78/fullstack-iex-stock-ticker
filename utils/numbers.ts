const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

export const toUSD = (num: number): string => {
  return USD.format(num)
}

export const toUsNum = (num: number): string => {
  return num.toLocaleString("en-US")
}

export const toPercent = (num: number): string => {
  return (num * 100).toFixed(2) + "%"
}
