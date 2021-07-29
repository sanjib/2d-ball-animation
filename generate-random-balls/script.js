function createBall(ballSize) {
  const colors = ['AliceBlue',
                  'AntiqueWhite',
                  'Aqua',
                  'Aquamarine',
                  'Azure',
                  'Beige',
                  'Bisque',
                  'Black',
                  'BlanchedAlmond',
                  'Blue',
                  'BlueViolet',
                  'Brown',
                  'BurlyWood',
                  'CadetBlue',
                  'Chartreuse',
                  'Chocolate',
                  'Coral',
                  'CornflowerBlue',
                  'Cornsilk',
                  'Crimson',
                  'Cyan',
                  'DarkBlue',
                  'DarkCyan',
                  'DarkGoldenRod',
                  'DarkGray',
                  'DarkGrey',
                  'DarkGreen',
                  'DarkKhaki',
                  'DarkMagenta',
                  'DarkOliveGreen',
                  'DarkOrange',
                  'DarkOrchid',
                  'DarkRed',
                  'DarkSalmon',
                  'DarkSeaGreen',
                  'DarkSlateBlue',
                  'DarkSlateGray',
                  'DarkSlateGrey',
                  'DarkTurquoise',
                  'DarkViolet',
                  'DeepPink',
                  'DeepSkyBlue',
                  'DimGray',
                  'DimGrey',
                  'DodgerBlue',
                  'FireBrick',
                  'FloralWhite',
                  'ForestGreen',
                  'Fuchsia',
                  'Gainsboro',
                  'GhostWhite',
                  'Gold',
                  'GoldenRod',
                  'Gray',
                  'Grey',
                  'Green',
                  'GreenYellow',
                  'HoneyDew',
                  'HotPink',
                  'IndianRed',
                  'Indigo',
                  'Ivory',
                  'Khaki',
                  'Lavender',
                  'LavenderBlush',
                  'LawnGreen',
                  'LemonChiffon',
                  'LightBlue',
                  'LightCoral',
                  'LightCyan',
                  'LightGoldenRodYellow',
                  'LightGray',
                  'LightGrey',
                  'LightGreen',
                  'LightPink',
                  'LightSalmon',
                  'LightSeaGreen',
                  'LightSkyBlue',
                  'LightSlateGray',
                  'LightSlateGrey',
                  'LightSteelBlue',
                  'LightYellow',
                  'Lime',
                  'LimeGreen',
                  'Linen',
                  'Magenta',
                  'Maroon',
                  'MediumAquaMarine',
                  'MediumBlue',
                  'MediumOrchid',
                  'MediumPurple',
                  'MediumSeaGreen',
                  'MediumSlateBlue',
                  'MediumSpringGreen',
                  'MediumTurquoise',
                  'MediumVioletRed',
                  'MidnightBlue',
                  'MintCream',
                  'MistyRose',
                  'Moccasin',
                  'NavajoWhite',
                  'Navy',
                  'OldLace',
                  'Olive',
                  'OliveDrab',
                  'Orange',
                  'OrangeRed',
                  'Orchid',
                  'PaleGoldenRod',
                  'PaleGreen',
                  'PaleTurquoise',
                  'PaleVioletRed',
                  'PapayaWhip',
                  'PeachPuff',
                  'Peru',
                  'Pink',
                  'Plum',
                  'PowderBlue',
                  'Purple',
                  'RebeccaPurple',
                  'Red',
                  'RosyBrown',
                  'RoyalBlue',
                  'SaddleBrown',
                  'Salmon',
                  'SandyBrown',
                  'SeaGreen',
                  'SeaShell',
                  'Sienna',
                  'Silver',
                  'SkyBlue',
                  'SlateBlue',
                  'SlateGray',
                  'SlateGrey',
                  'Snow',
                  'SpringGreen',
                  'SteelBlue',
                  'Tan',
                  'Teal',
                  'Thistle',
                  'Tomato',
                  'Turquoise',
                  'Violet',
                  'Wheat',
                  'White',
                  'WhiteSmoke',
                  'Yellow',
                  'YellowGreen']

  const positionX = Math.floor(Math.random() * (window.innerWidth - ballSize))
  const positionY = Math.floor(Math.random() * (window.innerHeight - ballSize))

  const ballHtml            = document.createElement('div')
  ballHtml.className        = 'ball'
  ballHtml.style.background = colors[Math.floor(Math.random() * colors.length)]
  ballHtml.style.width      = ballSize + 'px'
  ballHtml.style.height     = ballSize + 'px'
  ballHtml.style.left       = positionX + 'px'
  ballHtml.style.top        = positionY + 'px'

  const signX = Math.floor(Math.random() * 2) === 1 ? 1 : -1
  const signY = Math.floor(Math.random() * 2) === 1 ? 1 : -1

  return {
    positionX,
    positionY,
    vectorX: Math.floor((Math.random() * 5) + 1) * signX,
    vectorY: Math.floor((Math.random() * 3) + 1) * signY,
    size   : ballSize,
    html   : ballHtml,
  }
}

function moveBalls(balls) {
  for (const ball of balls) {
    if (ball.positionX + ball.size > window.innerWidth || ball.positionX < 0) ball.vectorX = -ball.vectorX
    if (ball.positionY + ball.size > window.innerHeight || ball.positionY < 0) ball.vectorY = -ball.vectorY

    ball.positionX += ball.vectorX
    ball.positionY += ball.vectorY

    ball.html.style.left = ball.positionX + 'px'
    ball.html.style.top  = ball.positionY + 'px'
  }
}

// Starting Point
(function main() {
  const maxBallsToCreate = 1000
  const ballSize         = 20

  const ballCreationSpeed   = 1 // ms
  const ballMoveRefreshRate = 30 // ms

  let timeElapsed = 0
  const balls     = []

  // Time Elapsed (HUD)
  const timerIntervalId = setInterval(function () {
    timeElapsed++
    document.getElementById('time-elapsed').innerText = `${timeElapsed}`
  }, 1000)

  // Ball Creation
  const createBallIntervalId = setInterval(function () {
    if (balls.length === maxBallsToCreate) {
      clearInterval(timerIntervalId)
      clearInterval(createBallIntervalId)
      return
    }

    const ball = createBall(ballSize)
    balls.push(ball)

    document.body.appendChild(ball.html)
    document.getElementById('ball-count').innerText = `${balls.length}`
  }, ballCreationSpeed)

  // Ball Movement
  setInterval(function () {
    moveBalls(balls)
  }, ballMoveRefreshRate)

  // Page Reload on Window Resize
  window.onresize = function () {
    location.reload()
  }
})()

