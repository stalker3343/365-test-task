export const formatThousandSeparator = (a) => {
  const roundedNumber = Number.isInteger(a) ? a : Number(a).toFixed(2)
  return roundedNumber
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ' ')
}

const availableFilters = ['brands', 'color', 'size']
export const normalizeFilters = (filtersObject) => {
  let res = []
  for (const filterItem of filtersObject) {
    let currentFilter = availableFilters.find((el) => !!filterItem[el])
    const currentFilterItem = filterItem[currentFilter]

    currentFilterItem.value = currentFilterItem.value.sort((a, b) => {
      if (!a.sort || !b.sort) return 0
      return +a.sort - +b.sort
    })
    if (currentFilter === 'size') {
      currentFilterItem.value = currentFilterItem.value.map((el) => ({
        ...el,
        id: el.title,
      }))
      currentFilter = 'sizes'
    }
    res.push({ ...currentFilterItem, type: currentFilter })
  }
  res = res.sort((a, b) => +a.sort - +b.sort)
  return res
}
