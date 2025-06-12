import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const tags = [
  "html",
  "head",
  "title",
  "body",
  "div",
  "span",
  "p",
  "a",
  "ul",
  "ol",
  "li",
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "td",
  "th",
  "form",
  "label",
  "button",
  "select",
  "option",
  "textarea",
  "script",
  "style",
  "section",
  "article",
  "nav",
  "aside",
  "header",
  "footer",
  "main",
  "figure",
  "figcaption",
  "video",
  "audio",
  "canvas",
  "svg",
  "blockquote",
  "pre",
  "code",
  "em",
  "strong",
  "i",
  "b",
  "u",
  "small",
  "mark",
  "cite",
  "q",
  "del",
  "ins",
  "abbr",
  "time",
  "details",
  "summary",
  "dialog",
  "noscript",
  "h1",
  "h2","h3","h4","h5","h6"
];


const parseAttributes = (attrString) => {
       const attrs = {};
       const regex = /([a-zA-Z0-9\-]+)="(.*?)"/g;
       let match;
       while ((match = regex.exec(attrString)) !== null) {
         const [, key, value] = match;
         attrs[key] = value;
       }
       return attrs;
     };
const isVoidTag = (tag) => {
       const voidTags = ['br', 'hr', 'img', 'input', 'meta', 'link'];
       return voidTags.includes(tag.toLowerCase());
};

export default function ParseHtmlToTree(htmlString){
       const tagRegex = /<\/?[^>]+>|[^<]+/g;
       const stack = [];
       const root = { tag: 'root', children: [] };
       stack.push(root);
       const tokens = htmlString.match(tagRegex);
       let flag=false;
       for (let token of tokens) {
              token = token.trim();
              if (!token) continue;
              if (token.startsWith('</')){
              // Closing tag
              if(flag==false){
                     toast.error("Invalid HTML code Snippet....");
                     // alert("Invalid HTML code Snippet....")
                     return 0;
              }

                     stack.pop();
              } else if (token.startsWith('<')) {
                     // Opening tag
              flag=true;
              const match = token.match(/^<([a-zA-Z0-9]+)(.*?)\/?>$/);
              if (!match) continue;
              const [, tag, attrString] = match
              if(!tags.includes(tag)){ toast.error("Invalid tag..."); return 0;}
              const node = {
              tag,
              attributes: parseAttributes(attrString),
              children: [],
              text: null,
              };
              stack[stack.length - 1].children.push(node);
              if (!token.endsWith('/>') && !isVoidTag(tag)) {
              stack.push(node);
              }
              } else {
              // Text node
              if(flag==false){
                     toast.error("Invalid code Snippet...");
                     return 0;
              }
              const parent = stack[stack.length - 1];
              if (token.trim()) {
              parent.children.push({
                     tag: 'text',
                     attributes: {},
                     children: [],
                     text: token.trim(),
              });
              }
              }
       }
       if(stack.length>1){
              toast.error("Invalid Code snippet..."); return 0;}
       toast.success("HTML parsing Success...");
       return root.children[0]; // Return the actual parsed HTML root node
       };


     