import { useEffect, useState } from "react";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";
import Navbar from "../../components/Navbar/Navbar";

const NavbarContainer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
  }, []);
  return isMobile ? <MobileNavbar /> : <Navbar />;
}

export default NavbarContainer
