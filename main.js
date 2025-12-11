// Load approved confessions on page load
document.addEventListener("DOMContentLoaded", loadConfessions);

// Submit button
document.getElementById("submitBtn").addEventListener("click", saveConfession);

// Search
document.getElementById("searchInput").addEventListener("input", searchConfessions);

function saveConfession() {
    const input = document.getElementById("confessionInput");
    let confessionText = input.value.trim();

    if (confessionText === "") {
        alert("Please write a confession.");
        return;
    }

    const now = new Date();
    const timestamp = now.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    let confessions = JSON.parse(localStorage.getItem("confessions")) || [];

    confessions.unshift({
        text: confessionText,
        time: timestamp,
        status: "pending" // all new confessions are pending
    });

    localStorage.setItem("confessions", JSON.stringify(confessions));

    input.value = "";
    loadConfessions();
}

function loadConfessions() {
    let confessions = JSON.parse(localStorage.getItem("confessions")) || [];
    const approved = confessions.filter(item => item.status === "approved");
    displayFiltered(approved);
}

function searchConfessions() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    let confessions = JSON.parse(localStorage.getItem("confessions")) || [];
    const approved = confessions.filter(item => item.status === "approved");
    const filtered = approved.filter(item => item.text.toLowerCase().includes(searchValue) || item.time.toLowerCase().includes(searchValue));
    displayFiltered(filtered);
}

function displayFiltered(listItems) {
    const list = document.getElementById("confessionList");
    list.innerHTML = "";

    listItems.forEach(item => {
        let container = document.createElement("div");
        container.className = "confessionItem";

        container.innerHTML = `
            <div>${item.text}</div>
            <div class="confessionTime">Date: ${item.time}</div>
        `;

        list.appendChild(container);
    });
}