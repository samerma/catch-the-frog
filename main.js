const $playingField = $("#playing-field")
let frogs = new Frogs()
let timerId = ''
let timerDisplayId = ''
const $frogsLeft = $("#frogsLeft")
const $level = $("#level")
const $timeLeft = $("#time")
const $start = $("#start")
$frogsLeft.text("Frogs Left")
$level.text("Level")
$timeLeft.text("time")

const addFrogs = function () {
    for (let i = 0; i < frogs.getLevel(); i++) {
        let location = getRandomLocation()
        while (locationExists(location)) {//make sure no other frogs in location
            location = getRandomLocation()
        }
        const id = Frogs.getIdCount()
        const frog = new Frog(id, location.x, location.y, location.size)
        frogs.add(frog)
    }
}

const removeFrog = function (id) {
    frogs.delete(id)
}

const renderFrogs = function () {
    $playingField.empty()
    const source = $('#frog-template').html();
    const template = Handlebars.compile(source);
    const frogHTML = template({ frogs: frogs.getFrogs() });
    $playingField.append(frogHTML)
}
const renderGameOver = function () {
    $playingField.empty()
    gameOverHTML = '<h1 id="gameOver">Game Over</h1>'
    $playingField.append(gameOverHTML)
}

$playingField.on("click", ".frog", function () {
    removeFrog($(this).data("id"))
    $frogsLeft.text(`${frogs.getFrogsCount()} Frogs Left`)
    if (frogs.getFrogsCount() === 0) {
        startNewLevel()
    }
    renderFrogs()
})

$start.on("click", function () {
    startGame()
})

const startGame = function () {
    resetGame()
    addFrogs()
    renderFrogs()
    timerId = setTimeout(() => {
        resetGame()
    }
        , 2000 * frogs.getLevel());
    $frogsLeft.text(`${frogs.getFrogsCount()} Frogs Left`)
    $level.text(`Level ${frogs.getLevel()}`)
    $timeLeft.text("1 Second Left")
    $start.text('Restart Game')
}

const startNewLevel = function () {
    clearTimeout(timerId);
    clearInterval(timerDisplayId)
    let timeLeft = frogs.getLevel()
    $timeLeft.text(`${timeLeft} Seconds Left`)
    $timeLeft.css("color", "yellow")
    timerDisplayId = setInterval(() => {
        timeLeft--
        $timeLeft.text(`${timeLeft} Seconds Left`)
        if (timeLeft <= 3) {
            $timeLeft.css("color", "red")
        }
        else {
            $timeLeft.css("color", "black")
        }
    }, 1000)
    timerId = setTimeout(() => {
        resetGame()
    }, 2000 * frogs.getLevel());
    addFrogs()
    $frogsLeft.text(`${frogs.getFrogsCount()} Frogs Left`)
    $level.text(`Level ${frogs.getLevel()}`)
}

const resetGame = function () {
    frogs = new Frogs()
    /*  $frogsLeft.text("Frogs Left")
     $level.text("Level")*/
    $timeLeft.text("time")
    $timeLeft.css("color", "black")
    clearTimeout(timerId);
    clearInterval(timerDisplayId)
    renderGameOver()
    $start.text("Start")
}

const getRandomLocation = function () {
    const w = $playingField.width()
    const h = $playingField.height()
    let x = getRandomInt(w)
    let y = getRandomInt(h)
    const size = Math.floor(y / 10) + 5

    //make sure frog not out of bounds
    if (x + size >= w) {
        x -= size
    }
    if (x - size <= 0) {
        x += size
    }
    if (y + size >= h) {
        y -= size
    }
    if (y - size <= 0) {
        y += size
    }

    return { x, y, size }
}

const locationExists = function (location) {
    for (let frog of frogs.getFrogs()) {
        if (location.x >= frog.x - frog.size && location.x <= frog.x + frog.size
            && location.y >= frog.y - frog.size && location.y <= frog.y + frog.size)
            return true
    }
    return false
}
const getRandomInt = function (max) {
    return Math.floor(Math.random() * Math.floor(max));
}


