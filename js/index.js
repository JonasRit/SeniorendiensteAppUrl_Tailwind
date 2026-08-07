// Elemente
const toggleButton = document.getElementById('toggle-button');
const dropdownMenu = document.getElementById('dropdown-menu');
const overlay = document.getElementById('overlay');
const header = document.getElementById('main-header');
const nav = document.getElementById('main-nav');

// Toggle Dropdown
toggleButton.addEventListener('click', () => {
    const isOpen = !dropdownMenu.classList.contains('hidden');

    if (isOpen) {
        dropdownMenu.classList.add('hidden');
        dropdownMenu.classList.remove('flex');
        overlay.classList.add('hidden');
    } else {
        dropdownMenu.classList.remove('hidden');
        dropdownMenu.classList.add('flex');
        overlay.classList.remove('hidden');
    }
});

// Overlay schliesst Dropdown
overlay.addEventListener('click', () => {
    dropdownMenu.classList.add('hidden');
    dropdownMenu.classList.remove('flex');
    overlay.classList.add('hidden');
});

// Scroll — Nav Größe
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.remove('h-21');
        nav.classList.add('h-16');
        header.classList.add('shadow-md');
        dropdownMenu.classList.remove('top-21');
        dropdownMenu.classList.add('top-16');
    } else {
        nav.classList.remove('h-16');
        nav.classList.add('h-21');
        header.classList.remove('shadow-md');
        dropdownMenu.classList.remove('top-16');
        dropdownMenu.classList.add('top-21');
    }
});

// Slider
const track = document.getElementById('slider-track');
const total = 3;
let current = 0;
let timer;
let animating = false;

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(1), 4000);
}

function goTo(direction) {
    if (animating) return;
    animating = true;

    if (direction === 1) {
        track.style.transition = 'none';
        track.style.transform = 'translateX(0%)';

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                track.style.transition = 'transform 500ms ease-in-out';
                track.style.transform = 'translateX(-100%)';

                track.addEventListener('transitionend', () => {
                    track.style.transition = 'none';
                    track.style.transform = 'translateX(0%)';
                    track.appendChild(track.firstElementChild);
                    animating = false;
                }, { once: true });
            });
        });

    } else {
        track.insertBefore(track.lastElementChild, track.firstElementChild);
        track.style.transition = 'none';
        track.style.transform = 'translateX(-100%)';

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                track.style.transition = 'transform 500ms ease-in-out';
                track.style.transform = 'translateX(0%)';

                track.addEventListener('transitionend', () => {
                    animating = false;
                }, { once: true });
            });
        });
    }

    current = (current + direction + total) % total;
    updateDots();
    startTimer();
}

function updateDots() {
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('opacity-100', i === current);
        dot.classList.toggle('opacity-50', i !== current);
    });
}

document.getElementById('prev').addEventListener('click', () => goTo(-1));
document.getElementById('next').addEventListener('click', () => goTo(1));
document.querySelectorAll('.dot').forEach((dot, i) =>
    dot.addEventListener('click', () => {
        const diff = ((i - current) + total) % total;
        goTo(diff <= total / 2 ? 1 : -1);
    })
);

startTimer();
updateDots();