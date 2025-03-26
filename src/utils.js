export function escapeHtml(str) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return str.replace(/[&<>"']/g, function (m) { return map[m]; });
}

export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export function smoothScroll(destination, duration = 600) {
    const start = window.pageYOffset;
    const startTime = performance.now();
    let to;

    if (typeof destination === 'number') {
        to = destination;
    } else if (destination instanceof HTMLElement) {
        to = destination.offsetTop;
    } else {
        console.error("Destino inválido para smoothScroll. Deve ser um número ou um HTMLElement.");
        return;
    }

    const change = to - start;

    function animateScroll(currentTime) {
        const elapsedTime = currentTime - startTime;
        const newPosition = easeInOutQuad(elapsedTime, start, change, duration);
        window.scrollTo(0, newPosition);
        if (elapsedTime < duration) {
            requestAnimationFrame(animateScroll);
        }
    }

    // Função de easing para uma animação suave
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animateScroll);
}