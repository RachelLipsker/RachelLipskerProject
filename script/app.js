document.getElementById('logo').addEventListener('click', () => {
    location.href = "./index.html";
})

const navButton = document.getElementById('navButton');
const checkbox = document.getElementById('humburger');
const ul = document.querySelector('ul');
const size = window.matchMedia("(max-width: 768px)");
const navhead = document.getElementById('navhead');
const navabout = document.getElementById('navabout');
const navservice = document.getElementById('navservice');
const navcontact = document.getElementById('navcontact');

function mediaQuery() {
    if (size.matches) {
        ul.className = 'none';
    } else {
        ul.className = '';
    }
}
mediaQuery();
size.addEventListener("change", function () {
    mediaQuery();
});

checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        ul.className = '';
        // document.querySelector('nav').style.height = "360px";
    } else {
        ul.className = 'none';
    }
})

function toggle() {
    if (size.matches) {
        checkbox.checked = false;
        ul.className = 'none';
    } else {
        ul.className = '';
    }
}

navhead.addEventListener('click', () => {
    toggle();
})

navabout.addEventListener('click', () => {
    toggle();
})

navservice.addEventListener('click', () => {
    toggle();
})

navcontact.addEventListener('click', () => {
    toggle();
})
