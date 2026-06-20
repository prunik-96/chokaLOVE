const socket = new WebSocket("wss://mark-dense-enquiry-proxy.trycloudflare.com");

let myId = "";

socket.onopen = () => {
    console.log("connected");
    document.getElementById("status").innerText = "connected";
};

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "vibe") {

        // 💥 вибрация
        if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200, 100, 500]);
        }

        // 💗 визуальный эффект
        document.body.style.background = "#ffd6eb";

        setTimeout(() => {
            document.body.style.background = "#fff0f6";
        }, 500);

        alert("💗 vibe from " + data.from);
    }
};

socket.onerror = (err) => {
    console.log("socket error", err);
    document.getElementById("status").innerText = "error";
};

function connect() {

    myId = document.getElementById("myId").value;

    if (!myId) {
        alert("enter id");
        return;
    }

    socket.send(JSON.stringify({
        type: "register",
        id: myId
    }));

    document.getElementById("status").innerText = "logged in as " + myId;
}

function vibe() {

    const target = document.getElementById("target").value;

    if (!target) {
        alert("enter target id");
        return;
    }

    socket.send(JSON.stringify({
        type: "vibe",
        from: myId,
        to: target
    }));
}
