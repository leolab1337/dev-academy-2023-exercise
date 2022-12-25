import "leaflet/dist/leaflet.css";
import {MapContainer, CircleMarker, TileLayer} from "react-leaflet";


const svgMarker = {
    path:
        "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "blue",
    fillOpacity: 0.6,
    strokeWeight: 0,
    rotation: 0,
    scale: 2
};

/**
 * A component that displays a map centered at the specified coordinates, with a marker at the same position.
 * @param {number} x - The longitude of the center of the map and marker.
 * @param {number} y - The latitude of the center of the map and marker.
 * @return {JSX.Element} The `MapContainer` element with the map and marker.
 */
const Map = ({x= 24.9442,y= 60.166}) => {

    const position = [y, x];

    console.log(position);
    return (
        <div>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{width: '35vw' ,height : '315px' , minWidth:'180px'}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                    <CircleMarker
                        center={position}
                        color={"#000000"}
                        fillColor={"red"}
                        stroke={true}
                        fillOpacity={true}
                        weight={1}
                        icon={svgMarker}
                    />
            </MapContainer>
        </div>
    );
};

export default Map;
