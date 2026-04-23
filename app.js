// --- Инициализация переменных ---
let isAutoMode = false; // По умолчанию ручной режим
let ledOn = false;

// Элементы DOM
const currentModeText = document.getElementById('currentMode');
const autoWarning = document.getElementById('autoWarning');
const btnRequestData = document.getElementById('btnRequestData');
const ledStatusText = document.getElementById('ledStatus');

// --- Функции переключения режимов ---

function setAutoMode() {
    isAutoMode = true;
    currentModeText.innerText = "Automatický";
    currentModeText.className = "mode-auto";
    autoWarning.style.display = "block"; // Показываем предупреждение об автоматике
    btnRequestData.style.display = "none"; // Прячем кнопку запроса (в авто данные идут сами)

    // Включаем симуляцию "автоматического" обновления данных
    startAutoUpdates();
}

function setManualMode() {
    isAutoMode = false;
    currentModeText.innerText = "Manuální";
    currentModeText.className = "mode-manual";
    autoWarning.style.display = "none";
    btnRequestData.style.display = "inline-block"; // Показываем кнопку запроса

    // Очищаем значения (по требованию MVP в ручном режиме только по запросу)
    document.getElementById('tempValue').innerText = "--";
    document.getElementById('lightValue').innerText = "--";
}

// --- Функции управления LED ---

function toggleLed() {
    if (isAutoMode) {
        alert("Nelze ovládat ručně v automatickém módu!");
        return;
    }
    ledOn = !ledOn;
    ledStatusText.innerText = ledOn ? "Zapnuto" : "Vypnuto";
    // Тут в будущем будет отправка команды на Python API
}

// --- Симуляция данных (API) ---

function updateSensorData() {
    // Генерируем случайные числа для теста
    const temp = (Math.random() * (25 - 20) + 20).toFixed(1);
    const light = Math.floor(Math.random() * 1000);

    document.getElementById('tempValue').innerText = temp;
    document.getElementById('lightValue').innerText = light;

    // Логика автоматики (ES_1 на основе ES_2)
    if (isAutoMode) {
        if (light < 300) { // Порог освещенности
            ledStatusText.innerText = "Zapnuto (Auto)";
        } else {
            ledStatusText.innerText = "Vypnuto (Auto)";
        }
    }
}

// --- Привязка событий к кнопкам ---

document.getElementById('btnAuto').addEventListener('click', setAutoMode);
document.getElementById('btnManual').addEventListener('click', setManualMode);
document.getElementById('btnLedToggle').addEventListener('click', toggleLed);
btnRequestData.addEventListener('click', updateSensorData);

// Запуск симуляции обновлений раз в 3 секунды
function startAutoUpdates() {
    if (isAutoMode) {
        updateSensorData();
        setTimeout(startAutoUpdates, 3000);
    }
}