/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Vortex } from 'react-loader-spinner';

const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <Vortex
        ariaLabel="vortex-loading"
        colors={[
          '#872031',
          '#872031',
          '#872031',
          '#872031',
          '#872031',
          '#872031',
        ]}
        height={80}
        visible={true}
        width={80}
        wrapperClass="vortex-wrapper"
        wrapperStyle={{}}
      />
    </div>
  );
};

export default Loader;
