// --- Inicializace proměnných / Variable Initialization ---
let isAutoMode = false; // Ve výchozím stavu manuální režim / Manual mode by default
let ledOn = false;

// DOM elementy / DOM Elements
const currentModeText = document.getElementById('currentMode');
const autoWarning = document.getElementById('autoWarning');
const btnRequestData = document.getElementById('btnRequestData');
const ledStatusText = document.getElementById('ledStatus');

// --- Funkce pro přepínání režimů / Mode switching functions ---

function setAutoMode() {
    isAutoMode = true;
    currentModeText.innerText = "Automatický";
    currentModeText.className = "mode-auto";
    autoWarning.style.display = "block"; // Zobrazí varování o automatickém režimu / Show auto mode warning
    btnRequestData.style.display = "none"; // Skryje tlačítko pro vyžádání dat / Hide data request button

    // Spustí simulaci automatické aktualizace dat / Start auto-update simulation
    startAutoUpdates();
}

function setManualMode() {
    isAutoMode = false;
    currentModeText.innerText = "Manuální";
    currentModeText.className = "mode-manual";
    autoWarning.style.display = "none";
    btnRequestData.style.display = "inline-block"; // Zobrazí tlačítko pro vyžádání dat / Show data request button

    // Vymaže hodnoty (v manuálním režimu se aktualizují pouze na vyžádání) / Clear values (in manual mode, update only on request)
    document.getElementById('tempValue').innerText = "--";
    document.getElementById('lightValue').innerText = "--";
}

// --- Funkce pro ovládání LED / LED control functions ---

function toggleLed() {
    if (isAutoMode) {
        alert("Nelze ovládat ručně v automatickém módu!");
        return;
    }
    ledOn = !ledOn;
    ledStatusText.innerText = ledOn ? "Zapnuto" : "Vypnuto";
    // Zde v budoucnu přidáme odeslání příkazu do Python API / Future spot for sending commands to Python API
}

// --- Simulace dat (API) / Data simulation (API) ---

function updateSensorData() {
    // Generuje náhodná čísla pro testování / Generate random numbers for testing
    const temp = (Math.random() * (25 - 20) + 20).toFixed(1);
    const light = Math.floor(Math.random() * 1000);

    document.getElementById('tempValue').innerText = temp;
    document.getElementById('lightValue').innerText = light;

    // Logika automatického režimu (ES_1 na základě ES_2) / Auto mode logic (ES_1 based on ES_2)
    if (isAutoMode) {
        if (light < 300) { // Práh osvětlení / Lighting threshold
            ledStatusText.innerText = "Zapnuto (Auto)";
        } else {
            ledStatusText.innerText = "Vypnuto (Auto)";
        }
    }
}

// --- Přiřazení událostí k tlačítkům / Binding events to buttons ---

document.getElementById('btnAuto').addEventListener('click', setAutoMode);
document.getElementById('btnManual').addEventListener('click', setManualMode);
document.getElementById('btnLedToggle').addEventListener('click', toggleLed);
btnRequestData.addEventListener('click', updateSensorData);

// Spustí simulaci aktualizace dat každé 3 sekundy / Start data update simulation every 3 seconds
function startAutoUpdates() {
    if (isAutoMode) {
        updateSensorData();
        setTimeout(startAutoUpdates, 3000);
    }
}