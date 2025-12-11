document.addEventListener("DOMContentLoaded", () => {
    loadPending();
    loadApproved();
});

// Approve/Decline buttons
function loadPending() {
    let confessions = JSON.parse(localStorage.getItem("confessions")) || [];
    const pendingList = document.getElementById("pendingList");

    pendingList.innerHTML = "";

    confessions.forEach((item, index) => {
        if(item.status === "pending") {
            let div = document.createElement("div");
            div.className = "adminItem";

            div.innerHTML = `
                <div>${item.text}</div>
                <div class="adminTime"> ${item.time}</div>
                <button onclick="approve(${index})">Approve</button>
                <button onclick="decline(${index})">Decline</button>
            `;
            pendingList.appendChild(div);
        }
    });
}

function approve(index) {
    let confessions = JSON.parse(localStorage.getItem("confessions")) || [];
    confessions[index].status = "approved";
    localStorage.setItem("confessions", JSON.stringify(confessions));
    loadPending();
    loadApproved();
}

function decline(index) {
    let confessions = JSON.parse(localStorage.getItem("confessions")) || [];
    confessions[index].status = "declined";
    localStorage.setItem("confessions", JSON.stringify(confessions));
    loadPending();
}

// Approved list with search
document.getElementById("adminSearchInput").addEventListener("input", () => {
    const searchValue = document.getElementById("adminSearchInput").value.toLowerCase();
    let confessions = JSON.parse(localStorage.getItem("confessions")) || [];
    const approved = confessions.filter(item => item.status === "approved");
    const filtered = approved.filter(item => item.text.toLowerCase().includes(searchValue) || item.time.toLowerCase().includes(searchValue));
    displayApproved(filtered);
});

function loadApproved() {
    let confessions = JSON.parse(localStorage.getItem("confessions")) || [];
    const approved = confessions.filter(item => item.status === "approved");
    displayApproved(approved);
}

function displayApproved(listItems) {
    const list = document.getElementById("approvedList");
    list.innerHTML = "";

    listItems.forEach(item => {
        let div = document.createElement("div");
        div.className = "adminItem";

        div.innerHTML = `
            <div>${item.text}</div>
            <div class="adminTime">🕒${item.time}</div>
        `;

        list.appendChild(div);
    });
}