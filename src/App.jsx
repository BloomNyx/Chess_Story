import { useState } from "react";
import Cursor from "./assets/components/Cursor";
import Splash from "./assets/components/Splash";
import Hero from "./assets/components/Hero";
import Prologue from "./assets/components/Prologue";
import Queen from "./assets/components/Queen";
import Knight from "./assets/components/Knight";
import Bishop from "./assets/components/Bishop";
import Rook from "./assets/components/Rook";
import Pawn from "./assets/components/Pawn";
import HeaderManager from "./assets/components/header/HeaderManager";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Cursor />
      <HeaderManager />
      <main className="main-page">
        {loading ? (
          <Splash onFinish={() => setLoading(false)} />
        ) : (
          <>
            <Hero />
            <Prologue />
            <Queen />
            <Knight />
            <Bishop />
            <Rook />
            <Pawn />
          </>
        )}
      </main>
    </>
  );
}