function convertPace() {
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    const unit = document.getElementById('unit').value;
    const resultElement = document.getElementById('result');

    if (minutes === 0 && seconds === 0) {
        resultElement.textContent = 'Please enter a valid pace.';
        return;
    }

    if (seconds >= 60) {
        resultElement.textContent = 'Please enter a valid number of seconds (0-59).';
        return;
    }

    const totalMinutes = minutes + seconds / 60;
    let convertedMinutes;

    if (unit === 'kmToMile') {
        // Convert min/km to min/mile
        convertedMinutes = totalMinutes * 1.60934;
        const convertedMin = Math.floor(convertedMinutes);
        const convertedSec = Math.round((convertedMinutes - convertedMin) * 60);
        resultElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')} min/km = ${convertedMin}:${convertedSec.toString().padStart(2, '0')} min/mile`;
    } else {
        // Convert min/mile to min/km
        convertedMinutes = totalMinutes / 1.60934;
        const convertedMin = Math.floor(convertedMinutes);
        const convertedSec = Math.round((convertedMinutes - convertedMin) * 60);
        resultElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')} min/mile = ${convertedMin}:${convertedSec.toString().padStart(2, '0')} min/km`;
    }
}