let currentUnit = 'kmToMile';

function setUnit(unit) {
    currentUnit = unit;
    document.getElementById('kmToMile').classList.toggle('bg-blue-gradient', unit === 'kmToMile');
    document.getElementById('kmToMile').classList.toggle('text-white', unit === 'kmToMile');
    document.getElementById('mileToKm').classList.toggle('bg-orange-gradient', unit === 'mileToKm');
    document.getElementById('mileToKm').classList.toggle('text-white', unit === 'mileToKm');
}

function convertPace() {
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    const resultElement = document.getElementById('result');

    if (minutes === 0 && seconds === 0) {
        resultElement.textContent = 'Please enter a valid pace.';
        resultElement.classList.remove('hidden');
        return;
    }

    if (seconds >= 60) {
        resultElement.textContent = 'Please enter a valid number of seconds (0-59).';
        resultElement.classList.remove('hidden');
        return;
    }

    const totalMinutes = minutes + seconds / 60;
    let convertedMinutes;

    if (currentUnit === 'kmToMile') {
        // Convert min/km to min/mile
        convertedMinutes = totalMinutes * 1.60934;
        const convertedMin = Math.floor(convertedMinutes);
        const convertedSec = Math.round((convertedMinutes - convertedMin) * 60);
        resultElement.innerHTML = `${minutes}:${seconds.toString().padStart(2, '0')} min/km = <strong>${convertedMin}:${convertedSec.toString().padStart(2, '0')} min/mile</strong>`;
    } else {
        // Convert min/mile to min/km
        convertedMinutes = totalMinutes / 1.60934;
        const convertedMin = Math.floor(convertedMinutes);
        const convertedSec = Math.round((convertedMinutes - convertedMin) * 60);
        resultElement.innerHTML = `${minutes}:${seconds.toString().padStart(2, '0')} min/mile = <strong>${convertedMin}:${convertedSec.toString().padStart(2, '0')} min/km</strong>`;
    }

    resultElement.classList.remove('hidden');
}

// Initialize the UI
setUnit('kmToMile');