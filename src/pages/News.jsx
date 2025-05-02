import React from 'react';
import PDFViewer from './PDFViewer';

const News = () => {
  return (
    <div className="news-container">
      <h1 className='NewsH1'>This Week's Newspaper</h1>
      <PDFViewer pdfUrl="/current-news.pdf" />
    </div>
  );
};

export default News;
