import React from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";
import Section from "../components/section";

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Section title="Section Title">This is the section content.</Section>
      <Footer />
    </div>
  );
};

export default Home;
