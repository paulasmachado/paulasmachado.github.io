// Texto de la máquina de escribir
const text = "I am a product design student based in Madrid, Spain. I am deeply passionate about design and aesthetics, as well as the process carried out from the beginning—researching the specific topic and identifying the problem to be solved.";
let index = 0;
const speed = 50; // Velocidad del efecto

// Función para el efecto de máquina de escribir
function typeWriterEffect(callback) {
    const typewriterElement = document.getElementById('typewriter');
    if (index < text.length) {
        typewriterElement.textContent += text.charAt(index);
        index++;
        setTimeout(() => typeWriterEffect(callback), speed);
    } else if (callback) {
        callback(); // Ejecuta el callback al terminar el efecto
    }
}

// Función para animar barras de progreso de manera continua
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach((bar, index) => {
        // Usa un retraso para iniciar cada barra de forma secuencial
        setTimeout(() => {
            const targetWidth = bar.getAttribute('data-target'); // Obtiene el ancho objetivo
            bar.style.width = `${targetWidth}%`; // Aplica el ancho suavemente (CSS se encarga de la transición)
        }, index * 800); // 800ms de retraso entre cada barra
    });
}

// Intersection Observer para activar las animaciones al entrar en la sección
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Inicia el efecto de máquina de escribir y luego las barras de progreso
                typeWriterEffect(() => {
                    animateProgressBars();
                });
                observer.unobserve(entry.target); // Deja de observar para evitar repetir la animación
            }
        });
    },
    { threshold: 0.5 } // Inicia cuando el 50% del contenedor es visible
);

// Configuración del observer al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const typewriterContainer = document.getElementById('typewriter-container');
    observer.observe(typewriterContainer);
});

function openProjectDetails(title, description, images) {
    // Rellena el contenido de la ventana emergente
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-description').textContent = description;

    const imagesContainer = document.getElementById('modal-images');
    imagesContainer.innerHTML = ''; // Limpia las imágenes anteriores
    images.forEach((imgSrc) => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = title;
        imagesContainer.appendChild(img);
    });

    // Muestra la ventana emergente
    document.getElementById('project-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('project-modal').style.display = 'none';
}


// Slider Functionality
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

let currentSlide = 0;

function updateSliderPosition() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
    updateSliderPosition();
});

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
    updateSliderPosition();
});