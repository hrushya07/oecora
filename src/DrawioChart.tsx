import React, { useEffect, useRef, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';

type DrawioChartProps = {
  xml: string;
};

const DrawioChart: React.FC<DrawioChartProps> = ({ xml }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  function encodeDiagramXml(xml: string): string {
    const cleanXml = xml.replace(/\s*\n\s*/g, "").trim();
    const encoded = encodeURIComponent(cleanXml);
    
    return `https://viewer.diagrams.net/?lightbox=1&edit=0&nav=0&toolbar=0&menubar=0&chrome=0&layers=0&grid=1#R${encoded}`;
  }

  const handleEditClick = () => {
    // Store the current diagram XML in localStorage so Canvas can load it
    localStorage.setItem('drawio-diagram', xml);
    localStorage.setItem('drawio-last-saved', new Date().toISOString());
    
    navigate('/canvas');
  };

  useEffect(() => {
    if (!containerRef.current || !xml) return;

    setIsLoading(true);

    try {
      const iframe = document.createElement('iframe');
      iframe.style.width = '100%';
      iframe.style.height = '500px';
      iframe.style.border = '1px solid #ccc';
      iframe.style.borderRadius = '8px';
      
      iframe.onload = () => {
        setIsLoading(false);
      };

      // Add onerror event to handle loading errors
      iframe.onerror = () => {
        setIsLoading(false);
      };
      
      const drawioUrl = encodeDiagramXml(xml)
      console.log(drawioUrl)
      iframe.src = drawioUrl;
      
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(iframe);
      
    } catch (error) {
      console.error('Error rendering Draw.io diagram:', error);
      setIsLoading(false);
      if (containerRef.current) {
        containerRef.current.innerHTML = `
          <div style="color: red; padding: 20px; border: 1px solid #ff0000; border-radius: 8px; background: #ffe6e6;">
            <strong>Error rendering diagram:</strong><br/>
            ${error instanceof Error ? error.message : 'Unknown error'}<br/>
            <details>
              <summary>XML Preview</summary>
              <pre style="background: #f0f0f0; padding: 10px; margin-top: 10px; overflow: auto; max-height: 200px; font-size: 12px;">
                ${xml.substring(0, 500)}${xml.length > 500 ? '...' : ''}
              </pre>
            </details>
          </div>
        `;
      }
    }
  }, [xml]);

  return (
    <div className="flex-1 relative w-full h-full">
      <div 
        ref={containerRef} 
        className="drawio-container my-4"
        style={{ minHeight: '500px' }}
      />
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-75 rounded-lg">
          <div className="flex flex-col items-center space-y-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-sm text-gray-600">Loading diagram...</p>
          </div>
        </div>
      )}
      
      <CiEdit className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-gray-700 cursor-pointer" onClick={handleEditClick} />
    </div>
  );
};

export default DrawioChart;