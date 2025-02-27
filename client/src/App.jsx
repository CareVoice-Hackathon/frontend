import "./App.css";
import Landing from "./pages/Landing";
import { Route, Routes } from "react-router-dom";
import { useEffect, useMemo, useLayoutEffect } from "react";
import Record from "./pages/Record";
import ClientDocuments from "./pages/ClientDocuments";

function App() {
  return (
    <div className="AppWrapper  w-full flex flex-col flex-1 ">
      <div className="RouteWrapper bg-zinc-50 flex flex-col w-full mr-0 flex-1 ">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/record" element={<Record />} />
          <Route
            path="/client_documents/:clientId"
            element={<ClientDocuments />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
