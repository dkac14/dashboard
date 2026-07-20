import "./App.css";
import { useState } from "react";
import Grid from "@mui/material/Grid";

import useFetchData from "./hooks/useFetchData";
import type { CityName } from "./hooks/useFetchData";

import HeaderUI from "./components/HeaderUI";
import AlertUI from "./components/AlertUI";
import SelectorUI from "./components/SelectorUI";
import IndicatorUI from "./components/IndicatorUI";
import TableUI from "./components/TableUI";
import ChartUI from "./components/ChartUI";

function App() {
  const [selectedCity, setSelectedCity] =
    useState<CityName>("guayaquil");

  const dataFetcherOutput =
    useFetchData(selectedCity);

  return (
    <Grid
      container
      spacing={5}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      {/* Encabezado */}
      <Grid size={{ xs: 12 }}>
        <HeaderUI />
      </Grid>

      {/* Alerta */}
      <Grid
        container
        size={{ xs: 12 }}
        sx={{
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <AlertUI description="No se prevén lluvias" />
      </Grid>

      {/* Selector */}
      <Grid size={{ xs: 12, md: 3 }}>
        <SelectorUI
          selectedCity={selectedCity}
          onOptionSelect={setSelectedCity}
        />
      </Grid>

      {/* Indicadores */}
      <Grid
        container
        spacing={2}
        size={{ xs: 12, md: 9 }}
      >
        <Grid size={{ xs: 12, md: 3 }}>
          {dataFetcherOutput && (
            <IndicatorUI
              title="Temperatura (2 m)"
              description={`${dataFetcherOutput.current.temperature_2m} ${dataFetcherOutput.current_units.temperature_2m}`}
            />
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {dataFetcherOutput && (
            <IndicatorUI
              title="Temperatura aparente"
              description={`${dataFetcherOutput.current.apparent_temperature} ${dataFetcherOutput.current_units.apparent_temperature}`}
            />
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {dataFetcherOutput && (
            <IndicatorUI
              title="Velocidad del viento"
              description={`${dataFetcherOutput.current.wind_speed_10m} ${dataFetcherOutput.current_units.wind_speed_10m}`}
            />
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {dataFetcherOutput && (
            <IndicatorUI
              title="Humedad relativa"
              description={`${dataFetcherOutput.current.relative_humidity_2m} ${dataFetcherOutput.current_units.relative_humidity_2m}`}
            />
          )}
        </Grid>
      </Grid>

      {/* Gráfico */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        {dataFetcherOutput && (
          <ChartUI
            arrLabels={dataFetcherOutput.hourly.time}
            arrValues1={
              dataFetcherOutput.hourly.temperature_2m
            }
            arrValues2={
              dataFetcherOutput.hourly.relative_humidity_2m
            }
          />
        )}
      </Grid>

      {/* Tabla */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          minHeight: 400,
        }}
      >
        {dataFetcherOutput && (
          <TableUI
            arrLabels={dataFetcherOutput.hourly.time}
            arrValues1={
              dataFetcherOutput.hourly.temperature_2m
            }
            arrValues2={
              dataFetcherOutput.hourly.relative_humidity_2m
            }
          />
        )}
      </Grid>
    </Grid>
  );
}

export default App;