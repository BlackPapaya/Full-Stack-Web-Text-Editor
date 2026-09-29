let loggedInUser = null;
// 1. Save in Browser
document.getElementById('saveLocalBtn').addEventListener('click', function() {
const textContent = document.getElementById('textEditor').value;
localStorage.setItem('papayaText', textContent);
document.getElementById('editorMessage').style.color = 'green';
document.getElementById('editorMessage').textContent = "Text lokal im Browser gespeichert!";
});

// check if there is saved text file already
window.addEventListener('load', function() {
const savedText = localStorage.getItem('papayaText');
if (savedText) {
document.getElementById('textEditor').value = savedText;
}
});

// 2. download as txt file on the pc
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

// 3.Save in SpringBoot Database
document.getElementById('saveToDbBtn').addEventListener('click', async function() {
const currentUser = localStorage.getItem('papayaUser');

// check if acc is in local Storage
if (!currentUser) {
alert("Du musst zuerst eingeloggt sein, um in der Datenbank zu speichern!");
return;
}

const textContent = document.getElementById('textEditor').value;

// sending the Object
const dataToSend = {
username: currentUser,
content: textContent
};

try {
const response = await fetch('http://localhost:8080/api/save-text', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataToSend) 
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
// Catch formula and send with fetch to Springboot
document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // prevents restarting the site

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