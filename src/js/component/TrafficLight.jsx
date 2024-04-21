
import React, {useState} from "react";

//include images into your bundle
export const TrafficLight = () => {
    const [color, setColor] = useState("");

	return (
		<div className="traffic-light container-fluid">
            <div className="stem"></div>
			<div className={"light bg-success " + (color === 'green' ? "glow-green" : '')} 
            onClick={() => setColor('green')}></div>
			<div className={"light bg-warning " + (color === 'yellow' ? "glow-yellow" : '')} 
            onClick={() => setColor('yellow')}></div>
			<div className={"light bg-danger " + (color === 'red' ? "glow-red ": '')} 
            onClick={() => setColor('red')}></div>
		</div>
	);
};

