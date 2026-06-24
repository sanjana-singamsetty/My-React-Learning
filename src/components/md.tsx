import { useSearchParams } from "react-router-dom";
import MarkdownViewer from "./Markdownviewer";
import Sidebar from "./sidebar";

const MdPage = () => {
  const [searchParams] = useSearchParams();
  const file = searchParams.get("file");

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "240px", flex: 1, minHeight: "100vh" }}>
        {file ? <MarkdownViewer filePath={file} /> : <p style={{ padding: "2rem" }}>No file selected.</p>}
      </div>
    </div>
  );
};

export default MdPage;
