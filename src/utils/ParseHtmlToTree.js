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

export default function parseHtmlToTree(htmlString){
       const tagRegex = /<\/?[^>]+>|[^<]+/g;
       const stack = [];
       const root = { tag: 'root', children: [] };
       stack.push(root);
       const tokens = htmlString.match(tagRegex);

       for (let token of tokens) {
              token = token.trim();
              if (!token) continue;

              if (token.startsWith('</')) {
              // Closing tag
              stack.pop();
              } else if (token.startsWith('<')) {
              // Opening tag
              const match = token.match(/^<([a-zA-Z0-9]+)(.*?)\/?>$/);
              if (!match) continue;

              const [, tag, attrString] = match;
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

       return root.children[0]; // Return the actual parsed HTML root node
       };


     