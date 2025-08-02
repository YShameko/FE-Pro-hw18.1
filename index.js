"use strict";

class Timer {
    // 
    // timerStrValue - рядок 'mm:ss', початкове значення таймера
    // ElemenetShowTimer - посилання на елемент, у який буде додаватись поточне значення таймера
    constructor(timerStrValue, ElemenetShowTimer) {
        this.timerValue = this.stringToSeconds(timerStrValue);
        this.ElemenetShowTimer = ElemenetShowTimer;
        this.intervalId = null; 
        this.blinkIntervalId = null;
    }

    run() {
        this.intervalId = setInterval(() => {
            if (this.timerValue >= 0) {
                this.displayTimer();
                this.timerValue--;
            } else {
                this.stop();
                this.startBlinkEffect();
            }
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
        this.ElemenetShowTimer.innerText = "00:00";
        console.log("Таймер зупинився!");
    }

    displayTimer() {
        this.ElemenetShowTimer.innerText = this.secondsToString(this.timerValue);
    }

    secondsToString(secondsQuantity) {
        const minutes = Math.floor(secondsQuantity / 60);
        const seconds = secondsQuantity % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    }

    stringToSeconds(timeString) {
        const parts = timeString.split(':');
        const minutes = parseInt(parts[0], 10);
        const seconds = parseInt(parts[1], 10);
        if (isNaN(minutes) || isNaN(seconds)) {
            console.error("Некоректний формат часу. Очікується 'MM:SS'.");
            return 0; 
        }
        return (minutes * 60) + seconds;
    }

    startBlinkEffect() {
        let isVisible = true;
        this.blinkIntervalId = setInterval(() => {
            if (isVisible) {
                this.ElemenetShowTimer.style.visibility = 'hidden';
            } else {
                this.ElemenetShowTimer.style.visibility = 'visible';
            }
            isVisible = !isVisible;
        }, 500);

        setTimeout(() => {
            clearInterval(this.blinkIntervalId);
            this.ElemenetShowTimer.style.visibility = 'visible'; 
        }, 2000);
    }
}

// ===================================================================================
const startTimeMin = document.querySelector('.input-min');
const startTimeSec = document.querySelector('.input-sec');
const timerPlaceEl = document.querySelector('.place-for-timer');
const timerForm = document.querySelector('.form-for-timer');

startTimeSec.addEventListener("input", () => {
    const minutes = startTimeMin.value.padStart(2, '0');
    const seconds = startTimeSec.value.padStart(2, '0');
    timerPlaceEl.innerText = `${minutes}:${seconds}`;
});

timerForm.addEventListener('submit', event => {
    event.preventDefault();
    const minutes = startTimeMin.value;
    const seconds = startTimeSec.value;
    const timerValueFromInput = `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    const timer = new Timer(timerValueFromInput, timerPlaceEl);
    timer.run();
    
    event.target.reset();
});
