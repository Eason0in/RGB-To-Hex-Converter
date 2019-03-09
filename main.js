'use strict'

const btnConvert = document.getElementById('btn-convert')
const hexText = document.getElementById('hex-text')
const hexColor = document.querySelector('.hex-show-color')
const color = document.querySelectorAll('[data-target="color"]')
let rgbColor = []

//監控所有RGB輸入框
color.forEach(item => item.addEventListener('keyup', changeColor))

//當輸入RGB數值時，即時更新輸入之顏色
function changeColor(e) {
  let changeTarget = document.querySelector(`.show-${e.target.dataset.color}`)
  let red = 0
  let green = 0
  let blue = 0
  switch (e.target.dataset.color) {
    case 'red':
      red = e.target.value
      break
    case 'green':
      green = e.target.value
      break
    case 'blue':
      blue = e.target.value
      break
    default:
      break
  }
  changeTarget.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
}

//監控Convert按鈕
btnConvert.addEventListener('click', () => {
  if (checkRgbNumber(color) > 0) return
  setHexColor(rgbColor)
})

//設定16進位顏色及16進位碼
function setHexColor(rgbColorArray) {
  let hexNumber = rgbColorArray.join('')
  hexColor.style.backgroundColor = '#' + hexNumber
  hexText.value = hexNumber
}

//檢查RGB輸入值是否符合0~255、數值、非空白
function checkRgbNumber(target) {
  let count = 0
  target.forEach(item => {
    rgbColor = []
    clearFeedBack(item)
    if (isNaN(item.value) || item.value > 255 || item.value < 0 || !item.value) {
      count++
      setInvalidFeedBack(item)
    } else {
      target.forEach(item => rgbColor.push((parseInt(item.value).toString(16)).padStart(2, '0')))
      setValidFeedBack(item)
    }
  })

  return count
}

//設定不符合規定CSS及回饋文字
function setInvalidFeedBack(target) {
  target.classList.add('is-invalid')
  target.nextElementSibling.classList.add('invalid-feedback')
  target.nextElementSibling.innerHTML = `Please enter 0~255`

}

//設定符合規定CSS及回饋文字
function setValidFeedBack(target) {
  target.classList.add('is-valid')
  target.nextElementSibling.classList.add('valid-feedback')
  target.nextElementSibling.innerHTML = `Looks good!`

}

//清除設定CSS及回饋文字
function clearFeedBack(target) {
  target.classList.remove('is-valid', 'is-invalid')
  target.nextElementSibling.classList.remove('invalid-feedback', 'valid-feedback')
  target.nextElementSibling.innerHTML = ''
}