// JavaScript para el filtro de búsqueda
document.getElementById('search').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const products = document.querySelectorAll('.product-item');
    
    products.forEach(product => {
        const productName = product.getAttribute('data-name').toLowerCase();
        if (productName.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});

// JavaScript para el carrusel de imágenes
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${(i - index) * 100}%)`;
    });
}

document.getElementById('nextSlide').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
});

document.getElementById('prevSlide').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
});

// Inicializar el carrusel en la primera diapositiva
showSlide(currentSlide);
