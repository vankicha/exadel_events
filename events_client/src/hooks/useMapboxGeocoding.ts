import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { AppEvent } from "@constants/event";
import { MAPBOX_API_ROUTES } from "@constants/api";

interface Coordinates {
	lat: number;
	lng: number;
}

const useMapboxGeocoding = (location: AppEvent["address"]) => {
	const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

	useEffect(() => {
		async function geocode() {
			const response: AxiosResponse = await axios.get(
				`${import.meta.env.VITE_APP_MAPBOX_GEOCODING_URL}${MAPBOX_API_ROUTES.MAPBOX_PLACES.replace(
					"{location}",
					location as string
				)}`,
				{
					params: { access_token: import.meta.env.VITE_APP_MAPBOX_PUBLIC_TOKEN },
				}
			);

			const firstFeature = response.data.features[0];

			if (firstFeature) {
				setCoordinates({
					lat: firstFeature.geometry.coordinates[1],
					lng: firstFeature.geometry.coordinates[0],
				});
			} else {
				setCoordinates(null);
			}
		}

		geocode();
	}, [location]);

	return coordinates;
};

export default useMapboxGeocoding;
