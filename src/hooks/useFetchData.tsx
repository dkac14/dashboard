import { useEffect, useState } from "react";
import type {
  OpenMeteoResponse,
} from "../types/DashboardTypes";

export type CityName =
  | "guayaquil"
  | "quito"
  | "manta"
  | "cuenca";

interface Coordinates {
  latitude: number;
  longitude: number;
}

const cityCoordinates: Record<
  CityName,
  Coordinates
> = {
  guayaquil: {
    latitude: -2.1962,
    longitude: -79.8862,
  },
  quito: {
    latitude: -0.1807,
    longitude: -78.4678,
  },
  manta: {
    latitude: -0.9677,
    longitude: -80.7089,
  },
  cuenca: {
    latitude: -2.9001,
    longitude: -79.0059,
  },
};

export default function useFetchData(
  selectedCity: CityName
): OpenMeteoResponse | undefined {
  const [data, setData] =
    useState<OpenMeteoResponse>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coordinates =
          cityCoordinates[selectedCity];

        const URL =
          "https://api.open-meteo.com/v1/forecast" +
          `?latitude=${coordinates.latitude}` +
          `&longitude=${coordinates.longitude}` +
          "&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m" +
          "&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m" +
          "&timezone=auto";

        const response = await fetch(URL);

        if (!response.ok) {
          throw new Error(
            `Error HTTP: ${response.status}`
          );
        }

        const dataResponse: OpenMeteoResponse =
          await response.json();

        setData(dataResponse);
      } catch (error) {
        console.error(
          "No se pudieron obtener los datos:",
          error
        );
      }
    };

    fetchData();
  }, [selectedCity]);

  return data;
}