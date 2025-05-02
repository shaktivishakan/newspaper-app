import React, { useEffect, useState, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js`;

const PDFViewer = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerRef = useRef(null);
  const modalRef = useRef(null);
  const pdfRef = useRef(null);

  const MAX_HEIGHT = 500;

  useEffect(() => {
    const loadPDF = async () => {
      setLoading(true);
      try {
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        pdfRef.current = pdf;
        setNumPages(pdf.numPages);
        setCurrentPage(1);
        await renderPage(1, containerRef, MAX_HEIGHT);
      } catch (err) {
        console.error('Error loading PDF:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPDF();
  }, [pdfUrl]);

  useEffect(() => {
    if (pdfRef.current) {
      renderPage(currentPage, containerRef, MAX_HEIGHT);
    }
  }, [currentPage]);

  const renderPage = async (pageNum, targetRef, heightLimit) => {
    setLoading(true);
    try {
      const pdf = pdfRef.current;
      const page = await pdf.getPage(pageNum);

      const unscaledViewport = page.getViewport({ scale: 1 });
      const scale = heightLimit / unscaledViewport.height;
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      const outputScale = window.devicePixelRatio || 1;

      canvas.width = viewport.width * outputScale;
      canvas.height = viewport.height * outputScale;
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;

      context.setTransform(outputScale, 0, 0, outputScale, 0, 0);

      targetRef.current.innerHTML = '';
      targetRef.current.appendChild(canvas);

      await page.render({ canvasContext: context, viewport }).promise;
    } catch (err) {
      console.error('Render error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < numPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setTimeout(() => {
      renderPage(currentPage, modalRef, window.innerHeight * 0.9);
    }, 100);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to download the PDF
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = pdfUrl.split('/').pop(); // Extract filename from URL
    link.click();
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      {loading && <div className="spinner" />}
      <div
        ref={containerRef}
        onClick={openModal}
        style={{
          cursor: 'pointer',
          marginBottom: '20px',
          overflow: 'hidden',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
        title="Click to enlarge"
      />
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button onClick={handlePrev} disabled={currentPage === 1 || loading}>Previous</button>
        <span>Page {currentPage} of {numPages}</span>
        <button onClick={handleNext} disabled={currentPage === numPages || loading}>Next</button>
        <button onClick={handleDownload}>Download PDF</button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>✖</button>
            <div ref={modalRef} style={{ display: 'flex', justifyContent: 'center' }} />
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        .spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          animation: spin 1s linear infinite;
          margin: 10px auto;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .modal-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100vw; height: 100vh;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          padding: 20px;
          position: relative;
          max-height: 90vh;
          overflow: auto;
          border-radius: 10px;
        }

        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: red;
          color: white;
          border: none;
          font-size: 16px;
          padding: 4px 8px;
          cursor: pointer;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default PDFViewer;
