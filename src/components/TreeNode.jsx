// components/TreeNode.jsx (Tailwind version)
export default function TreeNode({ node }) {
       return (
         <div className="flex flex-col items-center relative m-4">
           {/* Node box */}
           <div className="px-3 py-1 bg-white border-2 border-blue-500 rounded shadow-sm text-sm font-mono">
             &lt;{node.tag}&gt;
           </div>
     
           {/* Text content */}
           {node.text && (
             <div className="mt-1 text-xs text-gray-600">"{node.text}"</div>
           )}
     
           {/* Line down to children */}
           {node.children.length > 0 && (
             <div className="w-0.5 h-4 bg-blue-400 mt-1"></div>
           )}
     
           {/* Children nodes */}
           {node.children.length > 0 && (
             <div className="flex space-x-4 mt-2">
               {node.children.map((child, idx) => (
                 <TreeNode key={idx} node={child} />
               ))}
             </div>
           )}
         </div>
       );
     }
     