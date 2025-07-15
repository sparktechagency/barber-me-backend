import axios from "axios";
import config from "../config";

interface Location {
    coordinates: [number, number];
}

const getDistanceFromCoordinates = async (
    destination: Location,
    origin: Location
): Promise< object | null> => {
    const apiKey = config.google_maps;

    // Validate input
    if ( !Array.isArray(origin) || origin.length !== 2 || !Array.isArray(destination) || destination.length !== 2
    ) {
        console.error("Invalid origin or destination coordinates.");
        return null;
    }

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin[1]},${origin[0]}&destinations=${destination[1]},${destination[0]}&key=${apiKey}`;

    try {
        // Make API request with a timeout
        const response = await axios.get(url, { timeout: 5000 }); // 5-second timeout
        const data = await response.data;

        const distance = data?.rows?.[0]?.elements?.[0]?.distance?.value / 1609.34;

        return {
            distance: distance?.toFixed(2),
            duration: data?.rows?.[0]?.elements?.[0]?.duration?.text
        }
    } catch (error: unknown) {
        return null;
    }
};

export default getDistanceFromCoordinates;