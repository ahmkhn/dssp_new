'use client';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster"; 
import { ImgHTMLAttributes, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { createClient } from "@/utils/supabase/server";
import ResearchType from "@/public/ResearchTypes.json";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import {FloatLabel} from 'primereact/floatlabel';
import "primereact/resources/themes/md-light-deeppurple/theme.css";
type worldMapProps = {
    authorized: boolean | null;
}
type researchType = {
    "name":string
    "code":string
}

export default function Worldmap( {authorized} : worldMapProps) {
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0]);
    const [showInputDiv, setShowInputDiv] = useState(false);
    const [visible, setVisible] = useState(false);

    //user input
    const [fullName, setFullName] = useState<string|null>(null);
    const [title,setTitle] = useState<string|null>(null);
    const [research,setResearch] = useState<researchType|null>(null);
    const [img,uploadImg] = useState<ImageBitmap|null>(null);
    const [locationCoordinates,setLocationCoordinates] = useState<[number,number]|null>(null);
    const [linkedinLink,setLinkedInLink] = useState<string|null>(null);
    //user input end


    
    const AddUserMarker = () => {
        setVisible(true);
        return showInputDiv ? (
            <>
                <Dialog className="w-[50vw] flex flex-grow justify-center gap-6" header="Input your details" visible={visible} position="top"  onHide={() => {if (!visible) return; setVisible(false); }}>
                    <p>Please make sure the marker on the map is accurate to the location you would like to set! :)</p>
                    <FloatLabel>
                        <InputText className="h-30 w-30 shadow shadow-slate-500" id="name" value={fullName} onChange={(e)=>setFullName(e.target.value)}/>
                        <label htmlFor="name">Enter your full name!</label>
                    </FloatLabel>
                    <InputText className="h-30 w-30 " id="name" value={fullName} onChange={(e)=>setFullName(e.target.value)}/>
                    <Dropdown
                        value={research}
                        options={ResearchType.map((type) => ({ label: type.name, value: type.code }))}
                        onChange={(e) => setResearch(e.value)}
                        placeholder="Select a research"
                    />
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
            <AddUserMarker/> {/* Render the input div */}
        </>
    );
}
