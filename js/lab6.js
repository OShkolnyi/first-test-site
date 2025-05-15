const startSize = 3;
let timerInterval = null;
let timeLeft = 5; // секунд на дію

newGame(startSize);

function newGame(currentSize) {
    let size = currentSize;
    drawGameFields(size);

    let counter = 1;
    resetTimer(); // запускаємо таймер

    $('td').off('click').on('click', function () {
        if (+$(this).text() === counter) {
            $(this).addClass('active');
            resetTimer(); // скидаємо таймер після правильного кліку

            if (counter === size * size) {
                clearInterval(timerInterval); // зупиняємо таймер
                if (confirm('Вітаємо! Новий рівень?')) {
                    newGame(size + 1);
                } else {
                    newGame(size);
                }
            } else {
                counter++;
            }
        } else {
            clearInterval(timerInterval);
            alert('Упсс! Помилка.\nПочнемо спочатку?');
            newGame(startSize);
        }
    });
}

function drawGameFields(size) {
    const field = $('.field');
    const arr = createArr(1, size * size);
    createCells(size, field, arr);
}

function createCells(size, elem, arr) {
    let html = '';
    let k = 0;

    for (let i = 0; i < size; i++) {
        html += '<tr>';
        for (let j = 0; j < size; j++) {
            const color = getRandomColor();
            const fontSize = getRandomFontSize();
            html += `<td style="color:${color}; font-size:${fontSize};">${arr[k++]}</td>`;
        }
        html += '</tr>';
    }
    elem.html(html);
}

function createArr(from, to) {
    const arr = [];
    for (let i = from; i <= to; i++) arr.push(i);
    return arr.sort(() => Math.random() - 0.5);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomFontSize() {
    const min = 16, max = 32;
    return Math.floor(Math.random() * (max - min + 1) + min) + 'px';
}

// Таймер: запускає зворотній відлік
function startTimer() {
    clearInterval(timerInterval); // очищає попередній таймер
    timeLeft = 5;

    $('#timer').text(`Час: ${timeLeft}s`);

    timerInterval = setInterval(() => {
        timeLeft--;
        $('#timer').text(`Час: ${timeLeft}s`);
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('Час вийшов! Почнемо знову.');
            newGame(startSize);
        }
    }, 1000);
}

function resetTimer() {
    startTimer();
}
