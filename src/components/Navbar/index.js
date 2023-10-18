import React from "react";
import ConnectWallet from "../ConnectWallet";

const Navbar = () => {
  return (
    <div className="nav">
      <div className="logo-container">
        <div className="logo">DZAP</div>
      </div>
      <div className="network-container">
        <div className="network">Polygon</div>
        <ConnectWallet />
      </div>
    </div>
  );
};

export default Navbar;
