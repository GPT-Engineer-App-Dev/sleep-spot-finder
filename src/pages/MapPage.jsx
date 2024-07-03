import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 59.372972225392466,
  lng: 18.69869029448855
};

const MapPage = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY"
  });

  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const onMapClick = useCallback((event) => {
    const newMarker = {
      id: Date.now(),
      position: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      },
      details: {
        name: "",
        description: "",
        photos: []
      }
    };
    setMarkers((current) => [...current, newMarker]);
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleSaveDetails = () => {
    setMarkers((current) =>
      current.map((marker) =>
        marker.id === selectedMarker.id ? selectedMarker : marker
      )
    );
    setSelectedMarker(null);
  };

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={onMapClick}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            onClick={() => handleMarkerClick(marker)}
          />
        ))}
      </GoogleMap>
      {selectedMarker && (
        <Dialog open={true} onOpenChange={() => setSelectedMarker(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Marker Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Name"
                value={selectedMarker.details.name}
                onChange={(e) =>
                  setSelectedMarker((current) => ({
                    ...current,
                    details: { ...current.details, name: e.target.value }
                  }))
                }
              />
              <Textarea
                placeholder="Description"
                value={selectedMarker.details.description}
                onChange={(e) =>
                  setSelectedMarker((current) => ({
                    ...current,
                    details: { ...current.details, description: e.target.value }
                  }))
                }
              />
              {/* Add photo upload functionality here */}
              <Button onClick={handleSaveDetails}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  ) : <></>;
};

export default MapPage;