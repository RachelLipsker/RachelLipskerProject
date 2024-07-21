const btn = document.getElementById('btn');
const space = document.getElementById('space');
const reset = document.getElementById('reset');
const saveScreen = document.getElementById('saveScreen');
const go2saves = document.getElementById('go2saves');

const elementType = document.getElementById('elementType');
const bgc = document.getElementById('bgc');
const height = document.getElementById('height');
const width = document.getElementById('width');
const text = document.getElementById('text');
const textAlign = document.getElementById('textAlign');
const color = document.getElementById('color');
const fontSize = document.getElementById('fontSize');
const borderStyle = document.getElementById('borderStyle');
const borderColor = document.getElementById('borderColor');
const borderWidth = document.getElementById('borderWidth');
const borderRadius = document.getElementById('borderRadius');
const margin = document.getElementById('margin');
const padding = document.getElementById('padding');

const response = document.getElementById('response');



function createElement() {
    let newElement = document.createElement(elementType.value);
    newElement.style.backgroundColor = bgc.value;
    newElement.style.height = height.value + 'px';
    newElement.style.width = width.value + 'px';
    newElement.innerText = text.value;
    newElement.style.textAlign = textAlign.value;
    newElement.style.color = color.value;
    newElement.style.fontSize = fontSize.value + 'px';
    newElement.style.borderStyle = borderStyle.value;
    newElement.style.borderColor = borderColor.value;
    newElement.style.borderWidth = borderWidth.value + 'px';
    newElement.style.borderRadius = borderRadius.value + '%';
    newElement.style.margin = margin.value + 'px';
    newElement.style.padding = padding.value + 'px';

    space.appendChild(newElement);

    elementType.value = 'div';
    bgc.value = '#ffffff';
    height.value = '';
    width.value = '';
    text.value = '';
    textAlign.value = 'center';
    color.value = '#000000';
    fontSize.value = '';
    borderStyle.value = 'none';
    borderColor.value = '#000000';
    borderWidth.value = '';
    borderRadius.value = '';
    margin.value = '';
    padding.value = '';
    response.innerText = '';
}

btn.addEventListener('click', () => {
    createElement();
})

reset.addEventListener('click', () => {
    if (confirm("האם אתה בטוח שברצונך לאפס את המסך?")) {
        space.innerHTML = '';

    }
})

let screens = JSON.parse(localStorage.getItem("screen")) || [];
saveScreen.addEventListener('click', () => {
    if (space.innerHTML != '') {
        screens.push(space.innerHTML);
        localStorage.setItem("screen", JSON.stringify(screens));
        response.innerText = "המסך נשמר בהצלחה"
    }
})

go2saves.addEventListener('click', () => {
    location.href = './savedScreens.html'
})