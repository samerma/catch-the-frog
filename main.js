const $playingField = $("#playing-field")
const frogs = new Frogs()
let timerId = ""

const getRandomInt = function (max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const addFrogs = function () {
    //create new frogs
    for (let i = 0; i < frogs.getLevel(); i++) {
        // create random location
        const w = $playingField.width()
        const h = $playingField.height()
        const x = getRandomInt(w)
        const y = getRandomInt(h)
        const id = Frogs.getIdCount()
        const frog = new Frog(id, x, y)
        frogs.add(frog)
    }
    console.log(frogs);
}

const removeFrog = function (id) {
    frogs.delete(id)
}

const renderFrogs = function () {
    $playingField.empty()
    const source = $('#frog-template').html();
    const template = Handlebars.compile(source);
    const newHTML = template({ frogs: frogs.getFrogs() });
    $playingField.append(newHTML)
}

$playingField.on("click", ".frog", function () {
    removeFrog($(this).data("id"))
    if (frogs.getFrogsCount() === 0) {
        clearTimeout(timerId);
        timerId = setTimeout(() => alert('Hello'), 1000 * frogs.getLevel());
        addFrogs()
    }
    renderFrogs()
})

$("#start").on("click", function () {
    addFrogs()
    renderFrogs()
    timerId = setTimeout(() => alert('you lose'), 1000 * frogs.getLevel());

})
