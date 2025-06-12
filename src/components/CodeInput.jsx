import { useState } from "react";
import { useRef } from "react";
export default function CodeInput({ onParse }) {
  const [code, setCode] = useState('');
  const [fileContent, setFileContent] = useState('');
  const {inputRef}=useRef();
  const handleParse = () => {
    onParse(code);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      setFileContent(content);
      onParse(content);
    };

    reader.readAsText(file);
  };
  const clearFile=()=>{
       inputRef.current.value='';
       setFileContent('');
  }
  return (
    <div className="p-4">
      <textarea
        className="w-full h-40 p-2 border rounded"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button
        className="mt-2 px-2 py-1 bg-blue-500 text-white rounded cursor-pointer "
        onClick={handleParse}
      >
        Visualize DOM
      </button>

      <input
        id="file-upload"
        type="file"
        className="hidden"
        onChange={(e)=>handleFileChange(e)}
        accept=".html,.txt"
      />
      <button className="ml-2 mt-2 px-2 py-1 rounded text-white bg-blue-500 cursor-pointer">
      <label
        htmlFor="file-upload"
      >
        Upload HTML
      </label>
      </button>
      <button className="px-2 py-1 ml-2 rounded text-white bg-red-500 cursor-pointer" onClick={clearFile}>Clear</button>
    </div>
  );
}
