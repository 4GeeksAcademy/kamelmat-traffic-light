
import React, { useEffect, useState } from "react";

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


    useEffect(() => {
        window.onYouTubeIframeAPIReady = () => {
            const player = new window.YT.Player("video", {
                events: {
                    onReady: () => {
                        setVideoPlayer(player);
                    }
                }
            });
        };
        return () => {
            window.onYouTubeIframeAPIReady = null;
        };
    }, []);

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
        <div className="container">
            <iframe
                id="video"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/nMmS2iOsNG8?si=D5XvG0k7ZWTDMBMg&amp;controls=0&amp;start=129&mute=1"
            ></iframe>
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

