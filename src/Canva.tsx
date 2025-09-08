// import React, { useState, useRef, useEffect } from 'react';
// import { HiDownload, HiUpload, HiOutlineRefresh, HiOutlineSave } from 'react-icons/hi';

// export const Canva: React.FC = () => {
//     const [isLoading, setIsLoading] = useState(true); // Start with loading true
//     const [diagramData, setDiagramData] = useState<string>('');
//     const [iframeKey, setIframeKey] = useState(0);
//     const drawioRef = useRef<HTMLIFrameElement>(null);
//     const fileInputRef = useRef<HTMLInputElement>(null);

//     // Handle messages from draw.io iframe
//     useEffect(() => {
//         const handleMessage = (event: MessageEvent) => {
//             if (event.origin !== 'https://embed.diagrams.net') return;
            
//             try {
//                 const data = JSON.parse(event.data);
                
//                 if (data.event === 'init') {
//                     // Draw.io has loaded and initialized
//                     setIsLoading(false);
//                     console.log('Draw.io editor initialized');
//                 } else if (data.event === 'save') {
//                     setDiagramData(data.xml);
//                     console.log('Diagram saved:', data.xml);
//                 } else if (data.event === 'exit') {
//                     console.log('Draw.io editor closed');
//                 }
//             } catch (e) {
//                 // Ignore non-JSON messages
//             }
//         };

//         window.addEventListener('message', handleMessage);
        
//         // Fallback: Stop loading after 3 seconds regardless
//         const fallbackTimer = setTimeout(() => {
//             setIsLoading(false);
//         }, 3000);
        
//         return () => {
//             window.removeEventListener('message', handleMessage);
//             clearTimeout(fallbackTimer);
//         };
//     }, [iframeKey]);

//     const handleSave = () => {
//         if (drawioRef.current) {
//             drawioRef.current.contentWindow?.postMessage(JSON.stringify({action: 'export', format: 'xml'}), '*');
//         }
//     };

//     const handleLoad = () => {
//         if (fileInputRef.current) {
//             fileInputRef.current.click();
//         }
//     };

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 const result = e.target?.result as string;
//                 setDiagramData(result);
//                 // You can load this data into the draw.io component
//                 console.log('File loaded:', result);
//             };
//             reader.readAsText(file);
//         }
//     };

//     const handleExport = () => {
//         if (diagramData) {
//             const blob = new Blob([diagramData], { type: 'application/xml' });
//             const url = URL.createObjectURL(blob);
//             const a = document.createElement('a');
//             a.href = url;
//             a.download = `diagram-${new Date().toISOString().split('T')[0]}.drawio`;
//             document.body.appendChild(a);
//             a.click();
//             document.body.removeChild(a);
//             URL.revokeObjectURL(url);
//         }
//     };

//     const handleNewDiagram = () => {
//         setDiagramData('');
//         setIframeKey(prev => prev + 1); // Force iframe reload
//         setIsLoading(true);
//         setTimeout(() => {
//             setIsLoading(false);
//         }, 1000);
//     };

//     return (
//         <div className="h-[calc(100vh-6rem)] w-full bg-white">
//             {/* Header with controls */}
//             <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
//                 <div className="flex items-center space-x-2">
//                     <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
//                         <span className="text-white text-sm font-bold">D</span>
//                     </div>
//                     <h1 className="text-xl font-semibold text-black">Draw.io Canvas</h1>
//                 </div>
                
//                 <div className="flex items-center space-x-2">
//                     <button
//                         onClick={handleNewDiagram}
//                         className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                         title="New Diagram"
//                     >
//                         <HiOutlineRefresh className="h-4 w-4" />
//                         <span className="hidden sm:inline">New</span>
//                     </button>
                    
//                     <button
//                         onClick={handleLoad}
//                         className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                         title="Load Diagram"
//                     >
//                         <HiUpload className="h-4 w-4" />
//                         <span className="hidden sm:inline">Load</span>
//                     </button>
                    
//                     <button
//                         onClick={handleSave}
//                         className="flex items-center space-x-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
//                         title="Save Diagram"
//                     >
//                         <HiOutlineSave className="h-4 w-4" />
//                         <span className="hidden sm:inline">Save</span>
//                     </button>
                    
//                     <button
//                         onClick={handleExport}
//                         disabled={!diagramData}
//                         className="flex items-center space-x-2 px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                         title="Export Diagram"
//                     >
//                         <HiDownload className="h-4 w-4" />
//                         <span className="hidden sm:inline">Export</span>
//                     </button>
//                 </div>
//             </div>

//             {/* Hidden file input */}
//             <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept=".drawio,.xml"
//                 onChange={handleFileChange}
//                 className="hidden"
//             />

//             {/* Draw.io Editor */}
//             <div className="relative h-[calc(100%-4rem)] w-full">
//                 {isLoading ? (
//                     <div className="flex items-center justify-center h-full bg-gray-50">
//                         <div className="text-center">
//                             <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
//                             <p className="mt-2 text-gray-600">Loading draw.io editor...</p>
//                         </div>
//                     </div>
//                 ) : (
//                     <iframe
//                         key={iframeKey}
//                         ref={drawioRef}
//                         src={`https://embed.diagrams.net/?embed=1&ui=kennedy&spin=1&modified=unsavedChanges&proto=json&saveAndExit=1&noSaveBtn=0&noExitBtn=0&libraries=1&stealth=1&pv=0${diagramData ? `&xml=${encodeURIComponent(diagramData)}` : ''}`}
//                         className="w-full h-full border-none bg-white"
//                         title="Draw.io Editor"
//                         allowFullScreen
//                         style={{ minHeight: '500px' }}
//                         onLoad={() => {
//                             // Backup method to stop loading if message doesn't come
//                             setTimeout(() => setIsLoading(false), 2000);
//                         }}
//                     />
//                 )}
//             </div>

//             {/* Status bar */}
//             <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
//                 <div className="flex items-center space-x-4">
//                     <span>Ready</span>
//                     {diagramData && (
//                         <span className="flex items-center space-x-1">
//                             <HiOutlineSave className="h-3 w-3" />
//                             <span>Diagram saved</span>
//                         </span>
//                     )}
//                 </div>
//                 <div className="text-xs text-gray-500">
//                     Powered by diagrams.net
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Canva;


import { useState, useEffect, useCallback, useRef } from 'react';
import { DrawIoEmbed } from 'react-drawio';
import type { DrawIoEmbedRef } from 'react-drawio';
import { HiDownload, HiUpload, HiOutlineRefresh, HiCloudUpload } from 'react-icons/hi';

function Canva() {
  const [diagramData, setDiagramData] = useState<string>('');
  const [isAutoSaveEnabled] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'unsaved' | 'saving'>('saved');
  const drawioRef = useRef<DrawIoEmbedRef>(null);

  useEffect(() => {
    const savedDiagram = localStorage.getItem('drawio-diagram');
    if (savedDiagram) {
      setDiagramData(savedDiagram);
      const savedTime = localStorage.getItem('drawio-last-saved');
      if (savedTime) {
        setLastSaved(new Date(savedTime));
      }
    }
  }, []);

  const handleAutoSave = useCallback((data: { xml: string }) => {
    if (!isAutoSaveEnabled) return;
    
    const newXml = data.xml;
    if (!newXml) return;

    setSaveStatus('saving');
    
    setTimeout(() => {
      localStorage.setItem('drawio-diagram', newXml);
      localStorage.setItem('drawio-last-saved', new Date().toISOString());
      setLastSaved(new Date());
      setSaveStatus('saved');
      console.log('Diagram auto-saved silently');
    }, 500);
  }, [isAutoSaveEnabled]);

  const handleExport = () => {
    const currentData = localStorage.getItem('drawio-diagram');
    if (currentData) {
      const blob = new Blob([currentData], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `diagram-${new Date().toISOString().split('T')[0]}.drawio`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.drawio,.xml,.svg';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          if (result) {
            if (drawioRef.current) {
              drawioRef.current.load({ xml: result });
            }
            
            localStorage.setItem('drawio-diagram', result);
            localStorage.setItem('drawio-last-saved', new Date().toISOString());
            setLastSaved(new Date());
            setSaveStatus('saved');
            setDiagramData(result);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleNewDiagram = () => {
    if (window.confirm('Are you sure you want to start a new diagram? This will clear your current work.')) {
      if (drawioRef.current) {
        drawioRef.current.load({ xml: '' });
      }
      
      setDiagramData('');
      localStorage.removeItem('drawio-diagram');
      localStorage.removeItem('drawio-last-saved');
      setLastSaved(null);
      setSaveStatus('saved');
    }
  };

  const formatLastSaved = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins === 0) return 'Just now';
    if (diffMins === 1) return '1 minute ago';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return '1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50">
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg font-bold">O</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Canvas</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                saveStatus === 'saved' ? 'bg-green-100 text-green-800' :
                saveStatus === 'saving' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {saveStatus === 'saved' ? '✓ Saved' :
                 saveStatus === 'saving' ? '⏳ Saving...' :
                 '● Unsaved changes'}
              </span>
              {lastSaved && (
                <span>Last saved: {formatLastSaved(lastSaved)}</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleNewDiagram}
            className="flex items-center space-x-2 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            title="New Diagram"
          >
            <HiOutlineRefresh className="h-4 w-4" />
            <span className="hidden sm:inline">New</span>
          </button>
          
          <button
            onClick={handleImport}
            className="flex items-center space-x-2 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            title="Import Diagram"
          >
            <HiUpload className="h-4 w-4" />
            <span className="hidden sm:inline">Import</span>
          </button>

          <button
            onClick={handleExport}
            disabled={saveStatus === 'unsaved' && !localStorage.getItem('drawio-diagram')}
            className="flex items-center space-x-2 px-3 py-2 bg-black text-white rounded-lg hover:bg-black-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Export Diagram"
          >
            <HiDownload className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      <div className="flex-1 relative w-full h-full">
        <DrawIoEmbed
          ref={drawioRef}
          xml={diagramData}
          autosave={isAutoSaveEnabled}
          onAutoSave={handleAutoSave}
          urlParameters={{
            ui: 'kennedy',
            spin: true,
            libraries: true,
            noExitBtn: true,
            noSaveBtn: true,
            saveAndExit: false,
            grid: true,
          }}

        />
      </div>

      <div className="flex items-center justify-between px-4 py-2 bg-white border-t border-gray-200 text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${
              saveStatus === 'saved' ? 'bg-green-500' :
              saveStatus === 'saving' ? 'bg-yellow-500 animate-pulse' :
              'bg-red-500'
            }`} />
            <span>{saveStatus === 'saved' ? 'All changes saved' : 
                   saveStatus === 'saving' ? 'Saving...' : 
                   'Unsaved changes'}</span>
          </span>
          {isAutoSaveEnabled && (
            <span className="flex items-center space-x-1 text-blue-600">
              <HiCloudUpload className="h-3 w-3" />
              <span>Auto-save enabled</span>
            </span>
          )}
        </div>
        <div className="text-xs text-gray-500">
          Powered by diagrams.net • Your work is automatically saved
        </div>
      </div>
    </div>
  );
}

export default Canva; 
