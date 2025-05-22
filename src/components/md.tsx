import { useSearchParams } from "react-router-dom";
import MarkdownViewer from "./Markdownviewer";

const MdPage = () => {
  const [searchParams] = useSearchParams();
  const file = searchParams.get("file");

  return (
    <div style={{ padding: "2rem" }}>
      {file ? <MarkdownViewer filePath={file} /> : <p>No file selected</p>}
    </div>
  );
};

export default MdPage;
