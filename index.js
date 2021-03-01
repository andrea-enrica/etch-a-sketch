const grid = document.querySelector('#grid');
let color='black';
createGrid(16);
//buttons
const slider=document.getElementById('size-range');
slider.addEventListener('mouseup', event => {
    document.querySelectorAll('#gridItem').forEach(item => {
        item.remove('backgroundColor');
    });
    createGrid(slider.value);
});

const resetButton=document.querySelector('.reset-button');
resetButton.addEventListener('click', event => {
document.querySelectorAll('#gridItem').forEach(item => {
        item.remove('backgroundColor');
    });
    createGrid(slider.value);
});

const blackButton=document.querySelector('.black-button');
blackButton.addEventListener('click', event => {
    color='black';
});

const rainbowButton=document.querySelector('.rainbow-button');
rainbowButton.addEventListener('click', event => {
    color='rainbow';
});

const greyScaleButton=document.querySelector('.grey-button');
greyScaleButton.addEventListener('click', event => {
    color='gray';
});

const eraserButton=document.querySelector('.erase-button');
eraserButton.addEventListener('click', event => {
    color='erase';
});

//Drawing functions
function colorGrid() {
    switch (color) {
        case 'black':
            this.style.backgroundColor=`rgb(0, 0, 0)`;
            this.classList.remove('gray');
            break;
        case 'rainbow':
            this.style.backgroundColor=randomRGB();
            this.classList.remove('gray');
            break;
        case 'gray':
            if (this.style.backgroundColor.match(/rgba/)) {
                let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
                if (currentOpacity < 0.9) {
                    this.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
                    this.className.add('gray');
                }
            } else if (this.classList == 'gray' && this.style.backgroundColor == 'rgb(0, 0, 0)') {
                return;
            } else {
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';  
            }
            break;
        case 'erase':
            this.style.backgroundColor=`rgba(255, 255, 255, 0.030)`;
            this.classList.remove('gray');
            break;
        default:
            this.style.backgroundColor=color;
            this.classList.remove('gray');
            break;
        }
}

//Helper functions
function randomRGB() {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    var rgbColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
    return rgbColor;
}

function createGrid(value) {
    grid.style.setProperty('--grid-rows', value);
    grid.style.setProperty('--grid-columns', value);
    let gridArea= value*value;
    for (let i=0; i<gridArea; i++) {
        let gridItem = document.createElement('div');
        grid.appendChild(gridItem).setAttribute('id', 'gridItem');
    }
    document.querySelectorAll('#gridItem').forEach(item => {
        item.addEventListener('mouseover', colorGrid);
    });
}