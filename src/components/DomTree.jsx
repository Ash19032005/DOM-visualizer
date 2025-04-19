// components/DomTree.jsx
import React, { useRef } from 'react';
import Tree from 'react-d3-tree';
import { toPng } from 'html-to-image';
import download from 'downloadjs';

function convertToD3Tree(node) {
  const d3Node = {
    name: node.tag,
  };

  if (node.text) {
    d3Node.children = [{ name: `"${node.text}"` }];
  }

  if (node.children.length > 0) {
    d3Node.children = node.children.map(convertToD3Tree);
  }

  return d3Node;
}

export default function DomTree({ tree }) {
  const treeRef = useRef();

  if (!tree) return <p className="text-gray-500 text-center">Enter HTML to visualize.</p>;

  const data = convertToD3Tree(tree);

  const handleDownload = async () => {
    console.log(treeRef);
    if (!treeRef.current) return;
    try {
      const dataUrl = await toPng(treeRef.current);
      download(dataUrl, 'dom-tree.png');
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div ref={treeRef}  className="h-[600px] w-full border mt-4 bg-white rounded shadow overflow-auto">
        <Tree  data={data} orientation="vertical" />
      </div>

      <button
        onClick={handleDownload}
        className="px-2 py-1 ml-2 mt-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
      >
        Download as PNG
      </button>
    </div>
  );
}

