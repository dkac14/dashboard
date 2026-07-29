import "./App.css";
import { useState } from "react";
import Grid from "@mui/material/Grid";

import useFetchData from "./hooks/useFetchData";
import HeaderUI from "./components/HeaderUI";
import AlertUI from "./components/AlertUI";
import SelectorUI from "./components/SelectorUI";
import IndicatorUI from "./components/IndicatorUI";
import TableUI from "./components/TableUI";
import ChartUI from "./components/ChartUI";

function App() {

  const [selectedOption, setSelectedOption] =
    useState<string | null>(null);

  const {
      data,
      loading,
      error,
  } = useFetchData(selectedOption);

  if(loading) {
    return <h2> Cargando datos...</h2>
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (

    <Grid
      container
      spacing={5}
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Encabezado */}
      <Grid size={{ xs: 12, md: 12 }}>
        <HeaderUI />
      </Grid>

      {/* Alerta */}
      <Grid
        container
        size={{ xs: 12, md: 12 }}
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
          onOptionSelect={setSelectedOption}
        />
      </Grid>

      {/* Indicadores */}
      <Grid
        container
        spacing={2}
        size={{ xs: 12, md: 9 }}
      >
        <Grid size={{ xs: 12, md: 3 }}>
          {data && (
            <IndicatorUI
              title="Temperatura (2 m)"
              description={`${data.current.temperature_2m} ${data.current_units.temperature_2m}`}
            />
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {data && (
            <IndicatorUI
              title="Temperatura aparente"
              description={`${data.current.apparent_temperature} ${data.current_units.apparent_temperature}`}
            />
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {data && (
            <IndicatorUI
              title="Velocidad del viento"
              description={`${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`}
            />
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {data && (
            <IndicatorUI
              title="Humedad relativa"
              description={`${data.current.relative_humidity_2m} ${data.current_units.relative_humidity_2m}`}
            />
          )}
        </Grid>
      </Grid>

      {/* Gráfico */}
      <Grid
        size={{ xs: 6, md: 6 }}
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        {data && (
          <ChartUI
            arrLabels={
              data.hourly.time
            }
            arrValues1={
              data.hourly
                .temperature_2m
            }
            arrValues2={
              data.hourly
                .relative_humidity_2m
            }
          />
        )}
      </Grid>

      {/* Tabla */}
      <Grid
        size={{ xs: 6, md: 6 }}
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          minHeight: 400,
        }}
      >
        {data && (
          <TableUI
            arrLabels={
              data.hourly.time
            }
            arrValues1={
              data.hourly
                .temperature_2m
            }
            arrValues2={
              data.hourly
                .relative_humidity_2m
            }
          />
        )}
      </Grid>

      {/* Información adicional */}
      <Grid size={{ xs: 12, md: 12 }}>
        Ciudad seleccionada:{" "}
        <strong>
          {selectedOption ?? "Guayaquil"}
        </strong>
      </Grid>
    </Grid>
  );
}

export default App;