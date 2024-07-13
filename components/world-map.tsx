'use client';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster"; 
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { createClient } from "@/utils/supabase/server";

type worldMapProps = {
    authorized: boolean | null;
}
export default function Worldmap( {authorized} : worldMapProps) {
    const [initialPosition, setInitialPosition] = useState<[number, number]>([31.3909,74.2417]);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0]);
    const [showInputDiv, setShowInputDiv] = useState(false);
    const [visible, setVisible] = useState(false);


    
    const AddUserMarker = () => {
        setVisible(true);
        return showInputDiv ? (
            <>
                <Dialog className="bg-white w-[50vw]" header="Input your details!" visible={visible} position="top"  onHide={() => {if (!visible) return; setVisible(false); }}>
                    <p className="m-0">
                        Example demo for input.
                    </p>
                </Dialog>
            </>
        ) : null;
    }

    const Markers = () => {
        if(authorized){
            useMapEvents({
                click(e) {                                
                    setSelectedPosition([
                        e.latlng.lat,
                        e.latlng.lng
                    ]);
                    setShowInputDiv(true); // Show the input div
                },            
            });
        }
        return selectedPosition ? (
            <Marker           
                key={selectedPosition[0]}
                position={selectedPosition}
                interactive={false}
                icon={customIcon} 
            />
        ) : null;
    }

    const customIcon = new Icon({
        iconUrl: "https://www.reshot.com/preview-assets/icons/RX7PT3FJZK/pin-RX7PT3FJZK.svg",
        iconSize: [30,30]
    });

    return (
        <>
            <MapContainer className="h-full max-h-full" zoom={14} center={[31.3909,74.2417]}>
                <TileLayer
                    attribution="Google Maps"
                    url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}" // satellite
                    maxZoom={20}
                    subdomains={["mt0", "mt1", "mt2", "mt3"]}
                />
                <Markers />
                <MarkerClusterGroup chunkedLoading></MarkerClusterGroup>
            </MapContainer>
            <AddUserMarker /> {/* Render the input div */}
        </>
    );
}
