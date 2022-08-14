const numberOfSwap = (arr) => {
  let swapCount = 0
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j + 1] < arr[j]) {
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
        ++swapCount
      }
    }
  }
  console.log(swapCount)
}
numberOfSwap(
  [2, 3, 4, 1, 5]
)