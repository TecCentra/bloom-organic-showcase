// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// const icon = L.icon({
//   iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
//   iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41]
// });

// const Map = () => {
//   //const position: [number, number] = [40.7128, -74.0060];

//   return (
//     <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
//       <div className="mapouter">
//         <div className="gmap_canvas">
//           <iframe
//             className="gmap_iframe"
//             frameBorder={0}
//             scrolling="no"
//             marginHeight={0}
//             marginWidth={0}
//             src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Beaver House basement b11 Opposite club Eureka  Tom Mboya street&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
//           ></iframe>
//           <a href="https://wheremylocation.com/">where am i</a>
//         </div>
//         <style>{`
//           .mapouter {
//             position: relative;
//             text-align: right;
//             width: 1500px;
//             height: 800px;
//           }
//           .gmap_canvas {
//             overflow: hidden;
//             background: none!important;
//             width: 600px;
//             height: 400px;
//           }
//           .gmap_iframe {
//             width: 600px!important;
//             height: 400px!important;
//           }
//         `}</style>
//       </div>
//     </div>
//   );
// };

// export default Map;


import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useRef } from 'react';

// Custom icon for the exact location
const customIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Map = () => {
  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
      <div className="mapouter">
        <div className="gmap_canvas">
          <iframe
            className="gmap_iframe"
            frameBorder={0}
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src="https://maps.google.com/maps?width=1486&amp;height=400&amp;hl=en&amp;q=Beaver House&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          ></iframe>
        </div>
        <style>{`
          .mapouter {
            position: relative;
            text-align: right;
            width: 100%;
            height: 100%;
          }
          .gmap_canvas {
            overflow: hidden;
            background: none!important;
            width: 100%;
            height: 100%;
          }
          .gmap_iframe {
            width: 100%!important;
            height: 100%!important;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Map;