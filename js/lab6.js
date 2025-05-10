
const startSize = 3;
newGame(startSize);

function newGame(currentSize) {
    let size = currentSize;          // 1. одразу зберігаємо фактичний розмір
    drawGameFields(size);

    let counter = 1;

    // 2. скидаємо старі обробники, щоб вони не накопичувались
    $('td').off('click').on('click', function () {
        if (+$(this).text() === counter) {          // 3. порівнюємо як числа
            $(this).addClass('active');

            if (counter === size * size) {            // усі клітинки відкриті
                if (confirm('Вітаємо! Новий рівень?')) {
                    newGame(size + 1);                    // переходимо на наступний
                }
                else
                    newGame(size);                  // стартуємо гру з цим же рівнем складності
            } else {
                counter++;                              // наступне очікуване число
            }
        } else {                                    // неправильний клік
            alert('Упсс! Помилка.\nПочнемо спочатку?');
            newGame(startSize);                       // повертаємось на початок
        }
    });
}

function drawGameFields(size) {
    const field = $('.field');
    const arr = createArr(1, size * size);
    createCells(size, field, arr);                // 4. правильний порядок аргументів
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
    elem.color = getRandomColor();
    elem.html(html);
}

function createArr(from, to) {
    const arr = [];
    for (let i = from; i <= to; i++) arr.push(i);
    return arr.sort(() => Math.random() - 0.5);   // 5. перемішування
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
// Генеруємо випадковий розмір шрифту (16-32 px)
function getRandomFontSize() {
    const min = 16, max = 32;                   
    return Math.floor(Math.random() * (max - min + 1) + min) + 'px';
}
