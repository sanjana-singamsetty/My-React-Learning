import Spline from "@splinetool/react-spline";
import Header from "./header";
import Sidebar from "./sidebar";
import "./land.css"; // gradient CSS
import Mufasa from "./Mufasa";

export default function Homeland() {
  return (
    <div className="min-h-screen gradient-bg flex flex-col relative">
      {/* <Header /> */}
      <Sidebar />
      <Mufasa />
      {/* <Spline scene="https://prod.spline.design/i8eNphGELT2tDQVT/scene.splinecode" /> */}
    </div>
  );
}
