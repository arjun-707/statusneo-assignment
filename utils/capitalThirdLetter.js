const capitalThirdLetter = (str) => {
  let strSplit = str.split(' ')
  for (let i = 0; i < strSplit.length; i++) {
    if (strSplit[i].length > 2) {
      strSplit[i] = strSplit[i].substr(0, 2) + strSplit[i].substr(2,1).toUpperCase() + strSplit[i].substr(3, strSplit[i].length)
    }
  }
  return strSplit.join(' ')
}
const thirdCapitalLetter = capitalThirdLetter("statusneo is a technology company")
console.log(thirdCapitalLetter)