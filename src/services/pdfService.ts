import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';

export async function generateFormPdfFromElement(
  elementId: string,
  fileName: string,
  onProgress?: (status: string) => void
): Promise<void> {
  const container = document.getElementById(elementId);
  if (!container) {
    throw new Error('Print container not found in DOM');
  }

  onProgress?.('Preparing document for PDF generation...');

  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  // Find all page elements with class 'print-page'
  const pageElements = container.querySelectorAll<HTMLElement>('.print-page');
  const pagesToRender = pageElements.length > 0 ? Array.from(pageElements) : [container];

  // A4 Landscape: 297mm x 210mm
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const pdfWidth = 297;
  const pdfHeight = 210;
  const marginX = 5;
  const marginY = 5;
  const contentWidth = pdfWidth - marginX * 2; // 287mm
  const contentHeight = pdfHeight - marginY * 2; // 200mm

  for (let i = 0; i < pagesToRender.length; i++) {
    onProgress?.(`Rendering landscape page ${i + 1} of ${pagesToRender.length}...`);

    const pageEl = pagesToRender[i];

    const canvas = await html2canvas(pageEl, {
      scale: 2, // High resolution for crisp Hindi font and borders
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      onclone: (_clonedDoc, clonedEl) => {
        // Reset scale transform on all ancestors in the clone to preserve pure Landscape geometry
        clonedEl.style.transform = 'none';
        let p: HTMLElement | null = clonedEl.parentElement;
        while (p) {
          p.style.transform = 'none';
          p = p.parentElement;
        }
      },
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.96);

    if (i > 0) {
      pdf.addPage('a4', 'landscape');
    }

    // Exact Landscape A4 fit with clean margins, maintaining precise aspect ratio
    const imgHeight = (canvas.height / canvas.width) * contentWidth;
    const renderHeight = Math.min(contentHeight, imgHeight);
    pdf.addImage(imgData, 'JPEG', marginX, marginY, contentWidth, renderHeight, undefined, 'FAST');
  }

  onProgress?.('Saving Landscape PDF file...');
  pdf.save(fileName);
}

export async function triggerPrintWindow(targetElementId: string = 'official-form-render-target'): Promise<boolean> {
  const container = document.getElementById(targetElementId);
  if (!container) {
    try {
      window.print();
      return true;
    } catch {
      return false;
    }
  }

  // Strategy 1: Create an isolated hidden iframe with exact document styles and fonts
  try {
    let iframe = document.getElementById('direct-print-iframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.remove();
    }
    iframe = document.createElement('iframe');
    iframe.id = 'direct-print-iframe';
    iframe.style.position = 'fixed';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '1px';
    iframe.style.height = '1px';
    iframe.style.opacity = '0.01';
    iframe.style.pointerEvents = 'none';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (doc) {
      // Gather all stylesheets and links from current page
      const stylesheets = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
        .map((el) => el.outerHTML)
        .join('\n');

      doc.open();
      doc.write(`<!DOCTYPE html>
<html lang="hi">
  <head>
    <meta charset="UTF-8">
    <title>शिक्षक मास्टर डाटा प्रपत्र (Landscape A4)</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap" rel="stylesheet">
    ${stylesheets}
    <style>
      @page {
        size: 297mm 210mm;
        size: landscape;
        margin: 4mm 5mm 4mm 5mm;
      }
      *, *::before, *::after {
        box-sizing: border-box;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        background: #ffffff !important;
        color: #000000 !important;
        width: 297mm;
      }
      .hindi-text {
        font-family: 'Noto Sans Devanagari', 'Mangal', 'Devanagari Sangam MN', 'Segoe UI', system-ui, sans-serif !important;
        letter-spacing: normal !important;
        word-spacing: normal !important;
      }
      .print-page {
        width: 287mm !important;
        margin: 0 auto 6mm auto !important;
        page-break-after: always !important;
        break-after: page !important;
        border: none !important;
        box-shadow: none !important;
        background: #ffffff !important;
      }
      table {
        border-collapse: collapse !important;
        width: 100% !important;
        table-layout: fixed !important;
      }
    </style>
  </head>
  <body>
    ${container.outerHTML}
  </body>
</html>`);
      doc.close();

      await new Promise((resolve) => setTimeout(resolve, 450));
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      return true;
    }
  } catch (err) {
    console.warn('Isolated iframe print failed, attempting direct window.print():', err);
  }

  // Strategy 2: Direct window.print() fallback
  try {
    window.print();
    return true;
  } catch (err) {
    console.error('All direct print methods failed (sandbox restriction):', err);
    return false;
  }
}
