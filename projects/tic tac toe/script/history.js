let gameResults = JSON.parse(localStorage.getItem("games")) || [];
if (gameResults.length == 0) {
    document.getElementById('empty').innerHTML = "אין משחקים להצגה";
}

for (let i = 0; i < gameResults.length; i++) {
    document.querySelector('tbody').innerHTML += `<tr>
        <td>${gameResults[i].winner}</td>
        <td>${gameResults[i].gameType}</td>
        <td>${gameResults[i].length} שניות</td>
     </tr>
    `;
}



document.getElementById('delete').addEventListener('click', () => {
    localStorage.setItem("games", JSON.stringify([]));
    location.reload();
})


document.getElementById('menu').addEventListener('click', () => {
    location.href = "./index.html"
})
