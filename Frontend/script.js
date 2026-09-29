let loggedInUser = null;
// 1. Text aus dem Editor im Browser (localStorage) speichern
document.getElementById('saveLocalBtn').addEventListener('click', function() {
const textContent = document.getElementById('textEditor').value;
localStorage.setItem('papayaText', textContent);
document.getElementById('editorMessage').style.color = 'green';
document.getElementById('editorMessage').textContent = "Text lokal im Browser gespeichert!";
});

// Beim Laden der Seite prüfen, ob es einen gespeicherten Text gibt
window.addEventListener('load', function() {
const savedText = localStorage.getItem('papayaText');
if (savedText) {
document.getElementById('textEditor').value = savedText;
}
});

// 2. Als .txt-Datei auf den PC herunterladen
document.getElementById('downloadBtn').addEventListener('click', function() {
const textContent = document.getElementById('textEditor').value;
const blob = new Blob([textContent], { type: 'text/plain' });
const url = URL.createObjectURL(blob);

const a = document.createElement('a');
a.href = url;
a.download = 'papaya-document.txt';
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
URL.revokeObjectURL(url);
});

// 3. In der Spring Boot Datenbank abspeichern
document.getElementById('saveToDbBtn').addEventListener('click', async function() {
const currentUser = localStorage.getItem('papayaUser');

// Prüfen, ob überhaupt jemand im localStorage hinterlegt ist
if (!currentUser) {
alert("Du musst zuerst eingeloggt sein, um in der Datenbank zu speichern!");
return;
}

const textContent = document.getElementById('textEditor').value;

// Direkt das Objekt übergeben (ohne {dataToSend} drumherum)
const dataToSend = {
username: currentUser,
content: textContent
};

try {
const response = await fetch('http://localhost:8080/api/save-text', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataToSend) // <--- Ohne extra geschweifte Klammern!
});

const resultText = await response.text();
const editorMsg = document.getElementById('editorMessage');

if (response.ok) {
    editorMsg.style.color = 'green';
    editorMsg.textContent = resultText;
} else {
    editorMsg.style.color = 'red';
    editorMsg.textContent = "Fehler: " + resultText;
}
} catch (error) {
console.error('Fehler:', error);
}
});
// Das Formular abfangen und per JavaScript (Fetch API) an Spring Boot schicken
document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Verhindert das Neuladen der Seite

    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    const userData = {
        username: usernameInput,
        password: passwordInput
    };

    try {
        const response = await fetch('http://localhost:8080/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const resultText = await response.text();
        const messageElement = document.getElementById('message');

        if (response.ok) {
            messageElement.style.color = 'green';
            messageElement.textContent = resultText;
        } else {
            messageElement.style.color = 'red';
            messageElement.textContent = "Fehler: " + resultText;
        }
    } catch (error) {
        console.error('Fehler bei der Verbindung zum Backend:', error);
    }
});

document.getElementById("loginBtn").addEventListener("click", async function() {
const username = document.getElementById("loginUsername").value;
const password = document.getElementById("loginPassword").value;

const loginData = { username, password };

try {
const response = await fetch("http://localhost:8080/api/login", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginData)
});

const resultText = await response.text();
const editorMsg = document.getElementById("loginMessage");

if (response.ok) {
    loggedInUser = username;
    localStorage.setItem('papayaUser', username);
    editorMsg.style.color = "green";
    editorMsg.textContent = "Login erfolgreich! Willkommen, " + username;
} else {
    editorMsg.style.color = "red";
    editorMsg.textContent = "Login fehlgeschlagen: " + resultText;
}
} catch (error) {
console.error("Fehler:", error);
}
});