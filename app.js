const socket = new WebSocket("wss://mark-dense-enquiry-proxy.trycloudflare.com");

let myId = "";

socket.onopen = () => {
    console.log("🟢 connected");
    document.getElementById("status").innerText = "connected";
};

socket.onerror = (e) => {
    console.log("❌ socket error", e);
    document.getElementById("status").innerText = "error";
};

socket.onclose = () => {
    console.log("🔴 socket closed");
    document.getElementById("status").innerText = "disconnected";
};

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "vibe") {
        if (navigator.vibrate) {
            navigator.vibrate([200,100,200,100,500]);
        }

        alert("💗 vibe from " + data.from);
    }
};

function connect() {

    if (socket.readyState !== 1) {
        alert("socket not ready: " + socket.readyState);
        return;
    }

    myId = document.getElementById("myId").value;

    socket.send(JSON.stringify({
        type: "register",
        id: myId
    }));

    document.getElementById("status").innerText = "logged in";
}

function vibe() {

    if (socket.readyState !== 1) {
        alert("socket not connected");
        return;
    }

    const target = document.getElementById("target").value;

    socket.send(JSON.stringify({
        type: "vibe",
        from: myId,
        to: target
    }));
}
