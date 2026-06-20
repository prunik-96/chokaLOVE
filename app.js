const socket = new WebSocket("wss://star-eng-assistant-proposals.trycloudflare.com");

let myId = "";

socket.onopen = () => {
    document.getElementById("status").innerText = "connected";
};

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "vibe") {

        // 💥 вибрация
        if (navigator.vibrate) {
            navigator.vibrate([200,100,200,100,500]);
        }

        document.body.style.background = "#ffd6eb";

        setTimeout(() => {
            document.body.style.background = "#fff0f6";
        }, 500);

        alert("💗 vibe from " + data.from);
    }
};

function connect() {

    myId = document.getElementById("myId").value;

    socket.send(JSON.stringify({
        type: "register",
        id: myId
    }));

    document.getElementById("status").innerText = "logged in as " + myId;
}

function vibe() {

    const target = document.getElementById("target").value;

    socket.send(JSON.stringify({
        type: "vibe",
        from: myId,
        to: target
    }));
}
