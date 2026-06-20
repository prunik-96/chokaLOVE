import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    onChildAdded
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

const firebaseConfig = {

    apiKey: "YOUR_API_KEY",

    authDomain: "YOUR_PROJECT.firebaseapp.com",

    databaseURL:
    "https://YOUR_PROJECT-default-rtdb.firebaseio.com",

    projectId: "YOUR_PROJECT",

    storageBucket: "YOUR_PROJECT.appspot.com",

    messagingSenderId: "123456789",

    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const role = document.getElementById("role");
const myIdInput = document.getElementById("myId");
const connectBtn = document.getElementById("connectBtn");
const senderPanel = document.getElementById("senderPanel");
const targetId = document.getElementById("targetId");
const sendBtn = document.getElementById("sendBtn");
const status = document.getElementById("status");

let currentId = "";

connectBtn.addEventListener("click", () => {

    currentId = myIdInput.value.trim();

    if(!currentId){
        alert("Введите ID");
        return;
    }

    status.textContent =
    "Подключено как: " + currentId;

    if(role.value === "sender"){
        senderPanel.classList.remove("hidden");
    }else{
        senderPanel.classList.add("hidden");
    }
});

sendBtn.addEventListener("click", () => {

    const target = targetId.value.trim();

    if(!target){
        alert("Введите ID клиента");
        return;
    }

    push(ref(db, "signals"), {

        target: target,

        sender: currentId,

        timestamp: Date.now()
    });

    status.textContent =
    "Сигнал отправлен → " + target;
});

onChildAdded(ref(db, "signals"), snapshot => {

    const data = snapshot.val();

    if(!currentId)
        return;

    if(data.target !== currentId)
        return;

    document.body.classList.add("pulse");

    if(navigator.vibrate){
        navigator.vibrate([
            300,
            150,
            300,
            150,
            600
        ]);
    }

    setTimeout(() => {
        document.body.classList.remove("pulse");
    }, 2000);

    alert(
        "💗 Получен сигнал от: " +
        (data.sender || "неизвестно")
    );
});
