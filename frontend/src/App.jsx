import React, { useState } from "react";
import { TimerProvider } from "@/context/AccomplishmentLogContext";



function App({ children }) {
  return (
    <TimerProvider>
      {children}
    </TimerProvider>
  );
}

export default App;