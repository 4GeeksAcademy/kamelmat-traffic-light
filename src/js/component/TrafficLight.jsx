
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

//include images into your bundle
export const TrafficLight = () => {
    const [color, setColor] = useState("");
    const [isRunning, setIsRunning] = useState(false)
    const [videoPlayer, setVideoPlayer] = useState(null);
    const [purple, setPurple] = useState(false);

    useEffect(() => {
        let timeoutId
        if (isRunning) {
            timeoutId = setTimeout(() => {
                updateState()
            }, Math.floor(3 * 1000));
        }
        return () => {
            clearTimeout(timeoutId);
        };
    }, [isRunning, color]);


    const updateState = () => {
        if (color === "red") {
            setColor("yellow");
        } else if (color === "yellow") {
            setColor("green");
        } else {
            setColor("red");
        }
    };
    const handleStartButtonClick = () => {
        setIsRunning(prevIsRunning => !prevIsRunning);
        setColor("");
        if (videoPlayer) {
            videoPlayer.playVideo();
        }
    };
    const handleExtraButton = () => {
        if (purple) {
            setPurple(false);
            setColor('');
        } else {
            setPurple(true);
            setColor('purple');
        }
    }

    return (
       
         <div className="player-container">
                <ReactPlayer
                    url={"https://youtu.be/nMmS2iOsNG8?si=cXzFfRyNrw8qjS3e&t=129"}
                    playing={isRunning} // para controlar la reproducción
                    muted={true} // para silenciar el video y permitir la reproducción automática
                    onPause={() => setIsRunning(false)} // para manejar eventos de pausa
                    onPlay={() => setIsRunning(true)} // para manejar eventos de reproducción
                    onReady={player => setVideoPlayer(player)}
                    className="background-video"
                />
            
            <div className={`container ${purple ? "traffic-light2" : "traffic-light"}`}>
                <div className="stem"></div>

                <div className={"light bg-danger " + (color === 'red' ? "glow-red " : '')}
                    onClick={() => setColor('red')}></div>
                <div className={"light bg-warning " + (color === 'yellow' ? "glow-yellow" : '')}
                    onClick={() => setColor('yellow')}></div>
                <div className={"light bg-success " + (color === 'green' ? "glow-green" : '')}
                    onClick={() => setColor('green')}></div>
                <div className={`light bg-purple ${color === 'purple' ? "glow-purple" : 'd-none'}`} onClick={() => handleExtraButton()}></div>
                <div className="button">
                    <span type="button" className="btn btn-warning startButton" onClick={handleStartButtonClick}>
                        {isRunning ? "Stop" : "Start"}
                    </span>
                </div>
                <div className="button">
                    <span type="button" className="btn btn-info" onClick={handleExtraButton}>
                        ExtraColor
                    </span>
                </div>
            </div>
        </div>
    );
};

