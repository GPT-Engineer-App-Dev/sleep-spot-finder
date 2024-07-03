import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h1 className="text-3xl mb-4">Welcome to Kayak Trip Planner</h1>
      <p className="mb-4">Plan your kayak trips and share your favorite spots!</p>
      <Button onClick={() => navigate("/map")}>Get Started</Button>
    </div>
  );
};

export default Index;