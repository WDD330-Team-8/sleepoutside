// Creates and displays alerts if they exist
export default async function homeAlerts() {
    let alerts;

    if (window.location.href.startsWith("http://localhost")) { // If on localhost (for testing)
        alerts = await fetch("../json/alerts-test.json").then(res => res.json()); // Check out alerts-test.json for an example.
    } else {
        alerts = await fetch("../json/alerts.json").then(res => res.json()); // Gets JSON data from alerts.json
    }

    alerts = alerts.alerts;

    if (alerts.length > 0) { // If there are alerts, display them
        const main = document.querySelector("main");
        const alertEl = buildAlert(alerts);
        main.prepend(alertEl);
    }
}

// Creates an element for each alert within a new section
function buildAlert(alerts) {
    const el = document.createElement("section");
    el.classList.add("alert-list");
    for (let i = 0; i < alerts.length; i++) {
        const alert = alerts[i];
        const alertEl = document.createElement("p");
        alertEl.classList.add("alert");
        alertEl.style.backgroundColor = alert.background;
        alertEl.style.color = alert.color;
        alertEl.textContent = alert.message;
        el.appendChild(alertEl);
    }
    return el;
}