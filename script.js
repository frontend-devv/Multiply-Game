const N = 4
const arr = [...Array(10).keys()].map((n) => n + 1)

const multiplyGame = document.querySelector('.multiply-game')
const checkBtn = document.querySelector('.check-btn')

let currentIndex = 0
let currentInput = null

checkBtn.addEventListener('click', () => {
  const value = Number(currentInput.value)
  const correct = arr[currentIndex] * N

  if (value === correct) {
    currentInput.disabled = true
    currentInput.classList.add('hidden-input')
    checkBtn.classList.add('right')

    setTimeout(() => {
      checkBtn.classList.remove('right')
      checkBtn.classList.add('active')
    }, 1000)
    setTimeout(() => {
      currentIndex++
      if (currentIndex < arr.length) {
        createRow(currentIndex)
      } else {
        const message = document.createElement('p')
        message.classList.add('message')
        message.textContent = 'Great job! All multiplication problems are done!'
        multiplyGame.appendChild(message)
        checkBtn.disabled = true
      }
    }, 500)
  } else {
    currentInput.classList.add('wrong-input')
    checkBtn.classList.remove('active')
    checkBtn.classList.add('wrong')

    setTimeout(() => {
      currentInput.classList.remove('wrong-input')
      checkBtn.classList.remove('wrong')
      checkBtn.classList.add('active')
    }, 1000)
  }
})

function createCubesRow(N, parentRow) {
  const cubesRow = document.createElement('div')
  cubesRow.className = 'cubes-row'

  for (let i = 0; i < N; i++) {
    const cube = document.createElement('div')
    cube.className = 'cube'
    cubesRow.appendChild(cube)

    setTimeout(() => {
      cube.classList.add('show')
    }, 500)
  }

  parentRow.appendChild(cubesRow)
}

function createRow(index) {
  const el = arr[index]

  const row = document.createElement('div')
  row.className = 'row'

  const taskDiv = document.createElement('div')
  taskDiv.className = 'task'

  const span = document.createElement('span')
  span.textContent = `${N} × ${el} =`

  const input = document.createElement('input')
  input.classList.add('answer-input')
  input.type = 'number'

  taskDiv.appendChild(span)
  taskDiv.appendChild(input)
  row.appendChild(taskDiv)

  multiplyGame.appendChild(row)

  createCubesRow(N, row)

  currentInput = input
  currentInput.focus()

  input.addEventListener('input', () => {
    if (input.value.trim() !== '') {
      checkBtn.disabled = false
      checkBtn.classList.remove('right', 'wrong')
      checkBtn.classList.add('active')
    } else {
      checkBtn.disabled = true

      checkBtn.classList.add('right', 'wrong')

      checkBtn.classList.remove('right', 'wrong')
    }
  })

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !checkBtn.disabled) {
      checkBtn.click()
    }
  })
}

createRow(currentIndex)
