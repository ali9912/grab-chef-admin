
  import React, { FC } from 'react';
  import { MapPin, Navigation } from 'lucide-react';

  interface IProps {
    data: any,
    address: any
  }
  const DeliveryMap:FC<IProps> = ({data, address}) => {
    const chefLoc = data[0]?.location?.location?.coordinates
    const destination = address?.location?.coordinates || [0,0]

    const src = chefLoc ? `directions?origin=${chefLoc}&destination=${destination}` 
      : `place?q=${destination[0]},${destination[1]}`

    return (
      <div className="relative h-80 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden">
      <iframe
        src={`https://maps.google.com/maps/embed/v1/${src}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
        width="100%"
        height="100%"
        className="w-full h-full border-none"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    );
  };

  export default DeliveryMap;
