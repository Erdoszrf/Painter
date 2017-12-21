var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d')
var lineWidth = 2
var lineColor = "black"
var eraserEnabled = false //橡皮擦启用标志
autoSetCanvasSize(canvas) //设置画布大小
ctx.fillStyle = "white";  
ctx.fillRect(0, 0, canvas.width, canvas.height);
listenUser(canvas) //监听用户操作

pen.onclick = function() {
  pen.classList.add('active')
  eraser.classList.remove('active')
}
eraser.onclick = function() {
  eraser.classList.add('active')
  pen.classList.remove('active')
  eraserEnabled = true

}
clear.onclick = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
download.onclick = function() {
  var image = canvas.toDataURL("image/png");
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = image
  a.download = '我的画儿'
  a.target = '_blank'
  a.click()
}
black.onclick = function() {
  black.classList.add('active')
  skyblue.classList.remove('active')
  red.classList.remove('active')
  yellow.classList.remove('active')
}
red.onclick = function() {
  black.classList.remove('active')
  skyblue.classList.remove('active')
  red.classList.add('active')
  yellow.classList.remove('active')
  lineColor = "red"
}
yellow.onclick = function() {
  black.classList.remove('active')
  skyblue.classList.remove('active')
  red.classList.remove('active')
  yellow.classList.add('active')
  lineColor = "yellow"
}
skyblue.onclick = function() {
  black.classList.remove('active')
  skyblue.classList.add('active')
  red.classList.remove('active')
  yellow.classList.remove('active')
  lineColor = "skyblue"
}
twoPx.onclick = function() {
  lineWidth = 2
  twoPx.classList.add('active')
  threePx.classList.remove('active')
  fivePx.classList.remove('active')
}
threePx.onclick = function() {
  lineWidth = 3
  twoPx.classList.remove('active')
  threePx.classList.add('active')
  fivePx.classList.remove('active')
}
fivePx.onclick = function() {
  lineWidth = 5
  twoPx.classList.remove('active')
  threePx.classList.remove('active')
  fivePx.classList.add('active')
}
/*****↓设置canvas为目前窗口大小↓*****/
function autoSetCanvasSize(canvas) {
  setCanvasSize()
  window.onresize = function() {
    setCanvasSize()
  }

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}
/*****↑设置canvas为目前窗口大小↑*****/
function drawLine(x1, y1, x2, y2) {

  ctx.beginPath()
  ctx.strokeStyle = lineColor
  ctx.lineWidth = lineWidth
  ctx.moveTo(x1, y1) //起点
  ctx.lineTo(x2, y2) //终点
  ctx.stroke() //点与点之间画线
  ctx.closePath()
}
/*****↓监听用户鼠标和手指操作↓*****/
function listenUser(canvas) {
  var using = false //操作开始状态符
  var lastPoint = {
    x: undefined,
    y: undefined
  }
  /*****↓特性检测↓*****/
  if(document.body.ontouchstart !== undefined) { //触屏设备
    canvas.ontouchstart = function(down) {
      var x = down.touches[0].clientX //手指触碰坐标
      var y = down.touches[0].clientY

      using = true
      if(eraserEnabled) {
        ctx.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }
    canvas.ontouchmove = function(move) {
      var x = move.touches[0].clientX
      var y = move.touches[0].clientY
      if(!using) {
        return
      }

      if(eraserEnabled) {
        ctx.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = {
          "x": x,
          "y": y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }

    }
    canvas.ontouchend = function(up) {
      using = false
    }

  } else {
    canvas.onmousedown = function(down) {
      var x = down.clientX
      var y = down.clientY
      using = true
      if(eraserEnabled) {
        ctx.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }
    canvas.onmousemove = function(move) {
      var x = move.clientX
      var y = move.clientY
      if(!using) {
        return
      }

      if(eraserEnabled) {
        ctx.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = {
          "x": x,
          "y": y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }

    }
    canvas.onmouseup = function(up) {
      using = false
    }
  }
}
/*****↑监听用户鼠标和手指操作↑*****/