$('.painting').on('click', function () {
    $('.img-popup, .image').addClass('active')
    $('.image').append('<img src="' + $(this).find('.img-painting').attr('src') + '" alt="" class="bigsize" ontouchstart="touchstart(event)" ontouchmove="touchmove(event)" ontouchend="touchend()">')
})

$('.close-btn').on('click', function () {
    $('.img-popup, .image').removeClass('active')
    $('.image').find('.bigsize').remove()
})

let firstElement = false
let lastElement = false

function previousPainting(event) {
    const imgSrc = $('.image').find('.bigsize').attr('src')

    document.querySelectorAll('.img-painting').forEach((element) => {
        if (element.getAttribute('src') == imgSrc) {
            if (element.parentElement == element.parentElement.parentElement.firstElementChild) {
                firstElement = true
            } else {
                firstElement = false
            }
            if (firstElement == true) {
                $('.image').find('.bigsize').remove()
                $('.image').append('<img src="' + element.parentElement.parentElement.lastElementChild.children[0].getAttribute('src') + '" alt="" class="bigsize" ontouchstart="touchstart(event)" ontouchmove="touchmove(event)" ontouchend="touchend()">')
            } else {
                $('.image').find('.bigsize').remove()
                $('.image').append('<img src="' + element.parentElement.previousElementSibling.children[0].getAttribute('src') + '" alt="" class="bigsize" ontouchstart="touchstart(event)" ontouchmove="touchmove(event)" ontouchend="touchend()">')
            }

            if (element.parentElement.nextElementSibling == element.parentElement.parentElement.lastElementChild) {
                lastElement = true
            } else {
                lastElement = false
            }
        }
    })
}

function nextPainting(event) {
    const imgSrc = $('.image').find('.bigsize').attr('src')

    document.querySelectorAll('.img-painting').forEach((element) => {
        if (element.getAttribute('src') == imgSrc) {
            if (element.parentElement == element.parentElement.parentElement.lastElementChild) {
                lastElement = true
            } else {
                lastElement = false
            }
            if (lastElement == true) {
                $('.image').find('.bigsize').remove()
                $('.image').append('<img src="' + element.parentElement.parentElement.children[0].children[0].getAttribute('src') + '" alt="" class="bigsize" ontouchstart="touchstart(event)" ontouchmove="touchmove(event)" ontouchend="touchend()">')
            } else {
                $('.image').find('.bigsize').remove()
                $('.image').append('<img src="' + element.parentElement.nextElementSibling.children[0].getAttribute('src') + '" alt="" class="bigsize" ontouchstart="touchstart(event)" ontouchmove="touchmove(event)" ontouchend="touchend()">')
            }

            if (element.parentElement.previousElementSibling == element.parentElement.parentElement.firstElementChild) {
                firstElement = true
            } else {
                firstElement = false
            }
        }
    })
}

$('.left.arrow').on('click', previousPainting)
$('.right.arrow').on('click', nextPainting)
$('.image').find('.bigsize').on("swipeleft", nextPainting)
$('.image').find('.bigsize').on("swiperight", previousPainting)

$(window).on("swipeleft", function () {
    console.log('cos')
});


var startingX, startingY, movingX, movingY;

function touchstart(evt) {
    startingX = evt.touches[0].clientX;
}

function touchmove(evt) {
    movingX = evt.touches[0].clientX;
}

function touchend() {
    if (startingX + 100 < movingX) {
        previousPainting()
    } else if (startingX - 100 > movingX) {
        nextPainting()
    }
}