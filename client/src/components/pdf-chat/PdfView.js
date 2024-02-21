import { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';

function PdfView({selectedFile}) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
   useEffect(() => {
    console.log('Num Pages:', numPages);
  }, [numPages]);
  function onDocumentLoadSuccess({ numPages }){
    setNumPages(numPages);
    console.log('jnl', numPages )
  }

  return (
    <div className='white'>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <Document
        file={selectedFile}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={(error) => console.error('PDF load error:', error)}
      >
        {Array.apply(null, Array(numPages)).map((x, i) => i + 1).map(page => {
          return (
            <Page pageNumber={page}
              renderTextLayer={false}
              renderAnnotationLayer={false} />
          );
        })}
      </Document>
    </div>
  );
}

export default PdfView;