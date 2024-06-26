import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ language, value }) => (
  <SyntaxHighlighter language={language} style={vscDarkPlus}>
    {value}
  </SyntaxHighlighter>
);

export default CodeBlock;