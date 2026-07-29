import { useEffect, useState} from "react";

import type {
  OpenMeteoResponse,
} from "../types/DashboardTypes";

const CITY_COORDS: Record<
  string,
  {
    latitude: number;
    longitude: number;
  }
> = {
  Guayaquil: {
    latitude: -2.1962,
    longitude: -79.8862,
  },
  Quito: {
    latitude: -0.1807,
    longitude: -78.4678,
  },
  Manta: {
    latitude: -0.9677,
    longitude: -80.7089,
  },
  Cuenca: {
    latitude: -2.9001,
    longitude: -79.0059,
  },
};

export default function useFetchData(selectedOption: string | null): { data: OpenMeteoResponse | undefined; loading: boolean; error: string | null;} {
  const [data, setData] = useState<OpenMeteoResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      
      setLoading(true);
      setError(null);

      try {

        const cityConfig =
          selectedOption !== null
            ? CITY_COORDS[selectedOption]
            : CITY_COORDS["Guayaquil"];

        if (!cityConfig) {
          throw new Error(
            `Ciudad no válida: ${selectedOption}`
          );
        }

        const URL =
          "https://api.open-meteo.com/v1/forecast" +
          `?latitude=${cityConfig.latitude}` +
          `&longitude=${cityConfig.longitude}` +
          "&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m" +
          "&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m" +
          "&timezone=auto";

        const response = await fetch(URL);

        if (!response.ok) {
          throw new Error(
            `Error HTTP: ${response.status}`
          );
        }

        const dataResponse: OpenMeteoResponse = await response.json();

        setData(dataResponse);
        setLoading(false);
      } catch (error) {
          setError((error as Error).message);
          console.error("No se pudieron obtener los datos:",error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedOption]);

  return {
    data, loading, error,
  };
}