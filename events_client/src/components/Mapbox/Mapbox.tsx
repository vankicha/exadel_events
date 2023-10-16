import Map, { Marker } from "react-map-gl";
import Col from "react-bootstrap/Col";
import useMapboxGeocoding from "@hooks/useMapboxGeocoding";
import { AppEvent } from "@constants/event";
import styles from "./Mapbox.module.css";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapboxProps {
	location: AppEvent["address"];
}

const Mapbox = ({ location }: MapboxProps) => {
	const coordinates = useMapboxGeocoding(location);

	return coordinates ? (
		<Col className={styles["col-map-container"]}>
			<Map
				longitude={coordinates.lng}
				latitude={coordinates.lat}
				reuseMaps
				mapboxAccessToken={import.meta.env.VITE_APP_MAPBOX_PUBLIC_TOKEN}
				initialViewState={{
					zoom: 14,
				}}
				style={{ width: "100%", height: "100%" }}
				mapStyle="mapbox://styles/mapbox/streets-v9"
			>
				<Marker longitude={coordinates.lng} latitude={coordinates.lat} />
			</Map>
		</Col>
	) : null;
};

export default Mapbox;
