import { useState } from 'react';
import CodeInput from './components/CodeInput';
import DomTree from './components/DomTree';
import ParseHtmlToTree from './utils/ParseHtmlToTree';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [tree, setTree] = useState(null);
  const handleParse = (code) => {
    const parsedTree = ParseHtmlToTree(code);
    setTree(parsedTree);
    if(tree){
      console.log(tree);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">DOM Visualizer</h1>
      <CodeInput onParse={handleParse} />
      <DomTree tree={tree} />
      <ToastContainer/>
    </div>
  );
}

export default App;
