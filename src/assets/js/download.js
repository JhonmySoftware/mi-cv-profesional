// Verificar si el navegador soporta las APIs necesarias
function isBrowserSupported() {
    return 'Promise' in window && 'fetch' in window && 'addEventListener' in window;
}

// Función para mostrar mensajes de error
function showError(message) {
    alert(message);
}

// Función mejorada para generar PDF
function generateMobilePDF() {
    if (!isBrowserSupported()) {
        showError('Tu navegador no es compatible con esta función');
        return;
    }

    const element = document.getElementById('cv-content');
    const loadingIndicator = document.getElementById('loading-indicator') || document.createElement('div');
    
    // Configurar indicador de carga
    loadingIndicator.style.display = 'block';
    loadingIndicator.textContent = 'Generando PDF...';
    
    // Configuración optimizada para móviles
    const options = {
        margin: 5,
        filename: 'CV-Jhon-Quiñones.pdf',
        image: { 
            type: 'jpeg', 
            quality: 0.95 
        },
        html2canvas: { 
            scale: 3, // Mayor escala para mejor calidad en móviles
            useCORS: true,
            scrollY: 0,
            allowTaint: true,
            logging: true
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait' 
        }
    };

    // Añadir timeout para manejar dispositivos lentos
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error('Tiempo de espera agotado'));
        }, 30000); // 30 segundos timeout
    });

    Promise.race([
        html2pdf().from(element).set(options).save(),
        timeoutPromise
    ]).catch(error => {
        console.error('Error al generar PDF:', error);
        showError('Error al generar el PDF. Por favor intenta nuevamente.');
    }).finally(() => {
        loadingIndicator.style.display = 'none';
    });
}

// Event listener mejorado para dispositivos táctiles
const pdfButton = document.getElementById('generatePDF');
if (pdfButton) {
    pdfButton.addEventListener('click', function(e) {
        e.preventDefault();
        generateMobilePDF();
    });
    
    // Manejar eventos táctiles para iOS
    pdfButton.addEventListener('touchend', function(e) {
        e.preventDefault();
        generateMobilePDF();
    });
}