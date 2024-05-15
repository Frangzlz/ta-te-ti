const JUGADOR = {
  X: "❌",
  O: "⚪"
}

let tablero = []
let contador = 0
let turno = ""

const COMBOS_GANADORES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]


const celdas = document.querySelectorAll(".celda")
const turnoJugador = document.querySelector(".turno-jugador")
const quienEmpieza = document.querySelector(".quien-empieza")
const modalGanadorEmpate = document.querySelector(".ganador-empate")
const modalgeDivHijo = document.querySelector(".modal-ganador-empate")


function setJugador (jugador) { // Jugador que empieza
  if (jugador === JUGADOR.X) {
    turnoJugador.textContent = `TURNO: ${JUGADOR.X}`
    turno = JUGADOR.X
  } else {
    turnoJugador.textContent = `TURNO: ${JUGADOR.O}`
    turno = JUGADOR.O
  }

  quienEmpieza.classList.add("no-display")
}

function cambiarTurnos (jugador) {
  if (jugador === JUGADOR.X) {
    turnoJugador.textContent = `TURNO: ${JUGADOR.O}`
  } else {
    turnoJugador.textContent = `TURNO: ${JUGADOR.X}`
  }
}

function ganador (tablero) { // Verificamos si hay un ganador
  for (const combo of COMBOS_GANADORES) {
    const [n1, n2, n3] = combo

    if (tablero[n1] && tablero[n1] === tablero[n2] && tablero[n1] === tablero[n3]) {
      return tablero[n1]
    }
  }
  return null
}

function empate (tablero) { // Verificamos si hay empate
  for (const valor of tablero) {
    if (tablero[valor] !== null) {
      return true
    } else {
      return false
    }
  }
}

function resetearJuego () {
  celdas.forEach((celda) => celda.textContent = "")
  tablero = []
  contador = 0
  turno = JUGADOR.X
  turnoJugador.textContent = "TURNO"
  modalGanadorEmpate.classList.remove("modal")
  quienEmpieza.classList.remove("no-display")
  modalgeDivHijo.children[0].textContent = "El ganador es: "
}

celdas.forEach((celda, i) => {
  celda.addEventListener("click", () => {
    if (celda.textContent !== "") {
      return
    } else {
      celda.classList.add("check")
    }

    if (turno === JUGADOR.X) {
      celda.textContent = JUGADOR.X
      tablero[i] = JUGADOR.X
      cambiarTurnos(JUGADOR.X)
      turno = JUGADOR.O
    } else {
      celda.textContent = JUGADOR.O
      tablero[i] = JUGADOR.O
      cambiarTurnos(JUGADOR.O)
      turno = JUGADOR.X
    }

    if (ganador(tablero) === JUGADOR.X) {
      modalGanadorEmpate.classList.add("modal")
      modalgeDivHijo.children[0].textContent += `${JUGADOR.X}`
      turnoJugador.textContent = "TURNO"
    } else if (ganador(tablero) === JUGADOR.O) {
      modalGanadorEmpate.classList.add("modal")
      modalgeDivHijo.children[0].textContent += `${JUGADOR.O}`
      turnoJugador.textContent = "TURNO"
    }
    
    if (empate(tablero) && contador === 8) {
      modalGanadorEmpate.classList.add("modal")
      modalgeDivHijo.children[0].textContent = "¡Hay un empate!"
      turnoJugador.textContent = "TURNO"
    }

    contador++
  })
})
