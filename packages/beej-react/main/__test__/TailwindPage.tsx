import React from "react";
import Button from "../libraries/tailwindcss/components/ui/button";

export default function TailwindPage() {
  return (
    <div className="p-4">
      <Button variant="ghost" colorscheme={"primary"} className="rounded-md">
        Click me
      </Button>
    </div>
  );
}
