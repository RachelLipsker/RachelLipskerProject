div = document.querySelector('div');
let screens = JSON.parse(localStorage.getItem("screen")) || [];
screens.forEach((screen, index) => {
    div.innerHTML += `
            ${screen} <br>
            <button onclick=deleteScreen(${index})>מחק</button>
            <hr>
            `
});

function deleteScreen(index) {
    if (confirm("Are you sure you want to delete this screen?")) {
        screens.splice(index, 1);
        localStorage.setItem("screen", JSON.stringify(screens));
        location.reload();
    }
}