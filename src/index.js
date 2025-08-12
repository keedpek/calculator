import './style.css'
const previousNumberHtml = document.querySelector('.previous')
const currentNumberHtml = document.querySelector('.current')
const numberBtns = document.querySelectorAll('[data-number]')
const operationBtns = document.querySelectorAll('[data-operations]')
const allClearBtn = document.getElementById('clear')
const equalBtn = document.getElementById('equal')

const calculator = {
  previousNumber: '',
  currentNumber: '0',
  operation: null,
}

function clear() {
  calculator.previousNumber = ''
  calculator.currentNumber = '0'
  calculator.operation = null
}

function deleteDigit() {
  const num = calculator.currentNumber
  if (num === 'Infinity' || num === '-Infinity') {
    calculator.currentNumber = ''
    return
  }
  if (num.length) {
    calculator.currentNumber = num.slice(0, -1)
  }
}

function writeNumber(num) {
  if (calculator.currentNumber.length >= 12) return
  if (calculator.currentNumber === '0') calculator.currentNumber = ''
  if (num === '.') {
    if (!calculator.currentNumber) {
      calculator.currentNumber = `0.`
      return
    }
    if (calculator.currentNumber.includes('.')) return
  }
  calculator.currentNumber =
    calculator.currentNumber.toString() + num.toString()
}

function writeOperation(op) {
  if (op === '%') {
    percentage()
    return
  }
  if (op === '+/-') {
    signChange()
    return
  }
  if (calculator.previousNumber && calculator.currentNumber) {
    calculate()
  }
  calculator.operation = op
  if (calculator.previousNumber === '') calculator.previousNumber = '0'
  if (calculator.currentNumber) {
    calculator.previousNumber = calculator.currentNumber
    calculator.currentNumber = ''
  }
}

function calculate() {
  let result
  const prev = parseFloat(calculator.previousNumber)
  const current = parseFloat(calculator.currentNumber)
  if ((!prev || !current) && prev !== 0 && current !== 0) return
  switch (calculator.operation) {
    case '+':
      result = addition(prev, current)
      break
    case '-':
      result = subtraction(prev, current)
      break
    case '×':
      result = multiplication(prev, current)
      break
    case '÷':
      result = division(prev, current)
      break
  }

  calculator.previousNumber = ''
  calculator.operation = null
  calculator.currentNumber = result.toString()
}

function addition(a, b) {
  return a + b
}
function subtraction(a, b) {
  return a - b
}
function multiplication(a, b) {
  return a * b
}
function division(a, b) {
  return a / b
}
function percentage() {
  calculator.currentNumber = (
    parseFloat(calculator.currentNumber) / 100
  ).toString()
}
function signChange() {
  calculator.currentNumber = (
    parseFloat(calculator.currentNumber) * -1
  ).toString()
}

//TODO: simple parseFloat().toString()
function formatDisplayedNumber(num) {
  if (!num) return ''
  let integerPart = parseInt(num.split('.')[0])
  let fractionalPart = parseInt(num.split('.')[1])
  if (isNaN(integerPart)) integerPart = 0
  if (!fractionalPart) {
    return integerPart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }
  return `${integerPart}.${fractionalPart}`
}

function renderDisplay() {
  if (calculator.operation) {
    previousNumberHtml.innerText = `${formatDisplayedNumber(calculator.previousNumber)} ${calculator.operation}`
  } else {
    previousNumberHtml.innerText = ''
  }
  currentNumberHtml.innerText = formatDisplayedNumber(calculator.currentNumber)
}

numberBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    writeNumber(e.target.innerText)
    renderDisplay()
  })
})

operationBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    writeOperation(e.target.innerText)
    renderDisplay()
  })
})

allClearBtn.addEventListener('click', () => {
  clear()
  renderDisplay()
})

equalBtn.addEventListener('click', () => {
  calculate()
  renderDisplay()
})

document.addEventListener('keydown', (e) => {
  const key = e.key
  let a = 2
  const digitRegEx = /^[0-9]$/
  if (digitRegEx.test(key) || key === '.') {
    writeNumber(key)
  }
  switch (key) {
    case '+':
    case '-':
    case '%':
      e.preventDefault() //when shift + '+' screen is scaling, idk why
      writeOperation(key)
      break
    case '*':
      writeOperation('×')
      break
    case '/':
      writeOperation('÷')
      break
    case ',':
      writeOperation('.')
      break
    case 'Backspace':
      deleteDigit()
      break
    case 'Delete':
      clear()
      break
    case 'Enter':
    case '=':
      calculate()
      break
  }
  renderDisplay()
})
