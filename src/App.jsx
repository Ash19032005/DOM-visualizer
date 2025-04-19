import { useState } from 'react';
import CodeInput from './components/CodeInput';
import DomTree from './components/DomTree';
import ParseHtmlToTree from './utils/ParseHtmlToTree';
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
    </div>
  );
}

export default App;
