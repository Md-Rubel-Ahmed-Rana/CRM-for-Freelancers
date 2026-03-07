import Footer from "@/common/Footer";
import Navbar from "@/common/Navbar";

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return (
    <main
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar />
      <main
        style={{
          flex: 1,
          maxWidth: "1440px",
          width: "100%",
          margin: "0px auto",
        }}
      >
        {children}
      </main>
      <Footer />
    </main>
  );
};

export default RootLayout;
