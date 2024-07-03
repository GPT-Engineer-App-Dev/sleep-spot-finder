import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SharePage = () => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const savedMarkers = JSON.parse(localStorage.getItem("markers")) || [];
    setMarkers(savedMarkers);
  }, []);

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(markers));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "markers.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Share Your Marked Places</h1>
      <div className="grid gap-4">
        {markers.map((marker) => (
          <Card key={marker.id}>
            <CardHeader>
              <CardTitle>{marker.details.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{marker.details.description}</p>
              {/* Display photos if available */}
            </CardContent>
          </Card>
        ))}
      </div>
      <Button onClick={handleExport} className="mt-4">Export as JSON</Button>
    </div>
  );
};

export default SharePage;