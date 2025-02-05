document.getElementById('generatePDF').addEventListener('click', function () {
    const element = document.getElementById('cv-content'); // Solo el contenido del CV
    html2pdf()
        .from(element)
        .set({
            margin: 10,
            filename: 'CV-Jhon-Quiñones.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        })
        .save();
});


