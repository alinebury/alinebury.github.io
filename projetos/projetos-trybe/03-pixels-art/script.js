const elementHeader = document.querySelector('header');
const elementSectionPalette = document.querySelector('#color-palette');
const elementSectionPixel = document.querySelector('#pixel-board');
const button = document.querySelector('#clear-board');
const input = document.querySelector('#board-size');
const buttonInput = document.querySelector('#generate-board');

// 1 - Adicione à página o título "Paleta de Cores".
function title(header) {
  const elementH1 = document.createElement('h1');

  elementH1.id = 'title';
  elementH1.innerText = 'Paleta de Cores';
  header.appendChild(elementH1);
}
title(elementHeader);

// 2 - Adicione à página uma paleta contendo quatro cores distintas.
function palette(paletteSection) {
  for (let i = 0; i < 4; i += 1) {
    const elementDiv = document.createElement('div');
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);

    if (i === 0) {
      elementDiv.className = 'color black';
      elementDiv.style.backgroundColor = 'black';
    } else {
      elementDiv.className = 'color';
      elementDiv.style.backgroundColor = '#' + randomColor;
    }
    paletteSection.appendChild(elementDiv);
  }
}
palette(elementSectionPalette);

// 4 - Adicione à página um quadro de pixels, com 25 pixels.
function pixelsSquare(section, number) {
  for (let i = 0; i < number; i += 1) {
    for (let j = 0; j < number; j += 1) {
      const div = document.createElement('div');
      div.className = 'pixel';
      section.appendChild(div);
    }
    const br = document.createElement('br');
    section.appendChild(br);
  }
}
pixelsSquare(elementSectionPixel, 5);

// 6 - Definia a cor preta como cor inicial. Ao carregar a página a cor preta já deve estar selecionada para pintar os pixels
window.onload = function selected() {
  const blackElement = document.querySelector('.black');

  blackElement.classList.add('selected');
};

// 7 - Clicar em uma das cores da paleta faz com que ela seja selecionada e utilizada para preencher os pixels no quadro.
elementSectionPalette.addEventListener('click', (event) => {
  const paletteColor = document.querySelector('.selected');

  paletteColor.classList.remove('selected');
  event.target.classList.add('selected');
});

// 8 - Clicar em um pixel dentro do quadro após selecionar uma cor na paleta faz com que o pixel seja preenchido com a cor selecionada.
elementSectionPixel.addEventListener('click', (event) => {
  const divColor = document.querySelector('.selected');
  const getColor = window.getComputedStyle(divColor, null);
  const color = getColor.getPropertyValue('background-color');

  if (event.target.id !== 'pixel-board') {
    event.target.style.backgroundColor = color;
  }
});

// 9 - Crie um botão que, ao ser clicado, limpa o quadro preenchendo a cor de todos seus pixels com branco.
function clearAll() {
    const pixels = document.querySelectorAll(".pixel");

    for (let i = 0; i < pixels.length; i++) {
        pixels[i].style.backgroundColor = "white";
    }
}
button.addEventListener('click', clearAll);

// //10 - Faça o quadro de pixels ter seu tamanho definido pela pessoa usuária.
function resetPixels() {
  elementSectionPixel.innerHTML = '';
}
buttonInput.addEventListener('click', function() {

    if (input.value == 0) {
        alert("Board inválido!");

    } else if ((input.value <= 5) || (input.value >= 50)) {
        if (input.value <= 5) {
            resetPixels();
            pixelsSquare(elementSectionPixel, 5);
        } else if (input.value >= 50) {
            resetPixels();
            pixelsSquare(elementSectionPixel, 50);
        }

    } else {
        resetPixels();
        pixelsSquare(elementSectionPixel, input.value);
    }
    input.value = "";
});