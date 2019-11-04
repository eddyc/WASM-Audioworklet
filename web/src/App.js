import React from "react";
import Audio from "./wasm/Audio";
function App() {
    const audio = new Audio();

    return (
        <div className="App">
            <button onClick={() => audio.play()}>Play </button>
        </div>
    );
}

export default App;
