import React from 'react';

const Header = () => {
  return (
    //
    // THIS IS THE ONLY LINE THAT CHANGES:
    // `relative` activates the z-index property.
    // `z-10` puts the header on a higher "layer" (layer 10) than the page content (which is on layer 0).
    //
    <header className="bg-white mt-8 relative z-10">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* TAPMI Logo */}
        <div className="h-12">
           <img src="/tapmi-logo.png" alt="TAPMI Logo" className="h-full object-contain" />
        </div>

        {/* PRME and AACSB Logos */}
        <div className="flex items-center space-x-6">
          <div className="h-10">
            <img src="/prme-logo.png" alt="PRME Logo" className="h-full object-contain" />
          </div>
          <div className="h-10">
            <img src="/aacsb-logo.png" alt="AACSB Logo" className="h-full object-contain" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;