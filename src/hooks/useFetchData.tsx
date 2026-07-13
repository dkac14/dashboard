import { useEffect, useState } from "react";
import type { OpenMeteoResponse } from "../types/DashboardTypes";

export default function useFetchData(): OpenMeteoResponse | undefined {
    const URL =
        "https://api.open-meteo.com/v1/forecast?latitude=-1.25&longitude=-78.25&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature&timezone=America%2FChicago";

    const [data, setData] = useState<OpenMeteoResponse>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(URL);

                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const dataResponse: OpenMeteoResponse = await response.json();
                setData(dataResponse);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData(); 
    }, []);

    return data;
}