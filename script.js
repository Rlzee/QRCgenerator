const content = document.querySelector('.content')
const userInput = document.getElementById('placement')
const submitBtn = document.getElementById('generate')
const downloadBtn = document.getElementById('download')
const sizeOptions = document.querySelector('.size')
const BGcolor = document.getElementById('color1')
const FGcolor = document.getElementById('color2')

let QR_code
let sizechoice = 100
let BGColorChoice = "#000000"
let FGColorChoice = "#ffffff"


sizeOptions.addEventListener('change', () => {
    sizechoice = sizeOptions.value
})

BGcolor.addEventListener('input', () => {
    BGColorChoice = BGcolor.value
})

FGcolor.addEventListener('input', () => {
    FGColorChoice = FGcolor.value
})

userInput.addEventListener('input', () => {
    if (userInput.value.trim().length < 1) {
        submitBtn.disabled = true
        downloadBtn.href = ""
        downloadBtn.classList.add('hide')
    } else {
        submitBtn.disabled = false
    }
})

const inputFormatter = (value) => {
    value = value.replace(/[^a-z0-9A-Z]+/g, "")
    return value
}

const generateQRCode = async () => {
    content.innerHTML = ""

    QR_code = await new QRCode(content, {
        text: userInput.value,
        width: sizechoice,
        height: sizechoice,
        colorDark: FGColorChoice,
        colorLight: BGColorChoice
    })

    const src = content.firstChild.toDataURL("imag/pmg")
    downloadBtn.href = src

    let userValue = userInput.value
    try {
        userValue = new URL(userValue).hostname
    } catch (_) {
        userValue = inputFormatter(userValue)
    }
    downloadBtn.download = `${userValue}QR`
    downloadBtn.classList.remove('hide')
}

window.onload = () => {
    content.innerHTML = ""
    sizeOptions.value = sizechoice
    userInput.value = ""
    BGcolor.value = BGColorChoice
    FGcolor.value = FGColorChoice
    downloadBtn.classList.add('hide')
    submitBtn.disabled = true
}

submitBtn.addEventListener('click', generateQRCode)