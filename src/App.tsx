import './App.css';
import useFetchData from './hooks/useFetchData';
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';

function App() {
  const dataFetcherOutput = useFetchData();
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
        <HeaderUI/>
      </Grid>

      {/* Alertas */}
      <Grid size={{ xs: 12, md: 12 }}
        container sx={{ justifyContent: "right", alignItems: "center" }}>

             <AlertUI description="No se preveen lluvias"/>
      </Grid>

      {/* Selector */}
      <Grid size={{ xs: 12, md: 3 }}>
        Elemento: Selector
      </Grid>

      {/* Indicadores */}
             <Grid container size={{ xs: 12, md: 9 }} >

              <Grid size={{ xs: 12, md: 3 }}>
                  {dataFetcherOutput &&
                      (<IndicatorUI
                          title='Temperatura (2m)'
                          description={ `${dataFetcherOutput.current.temperature_2m} ${dataFetcherOutput.current_units.temperature_2m}` } />)
                  }
              </Grid>

                 <Grid size={{ xs: 12, md: 3 }}>
                     {/* IndicatorUI con la Temperatura aparente en °C' */}
                      {dataFetcherOutput &&
                          (<IndicatorUI
                              title='Temperatura (2m)'
                              description={ `${dataFetcherOutput.current.apparent_temperature} ${dataFetcherOutput.current_units.apparent_temperature}` } />)
                      }
                 </Grid>

                 <Grid size={{ xs: 12, md: 3 }}>
                     {/* IndicatorUI con la Velocidad del viento en km/h' */}
                     {dataFetcherOutput && 
                          (<IndicatorUI 
                            title='Velocidad de Viento (km/h)'
                            description={`${dataFetcherOutput.current.wind_speed_10m} ${dataFetcherOutput.current.wind_speed_10m}`}
                                >

                          </IndicatorUI>

                          )
                     }
                 </Grid>

                 <Grid size={{ xs: 12, md: 3 }}>
                     {/* IndicatorUI con la Humedad relativa en %' */}
                      {dataFetcherOutput && 
                          (<IndicatorUI 
                            title='Velocidad de Viento (km/h)'
                            description={`${dataFetcherOutput.current.relative_humidity_2m} ${dataFetcherOutput.current.relative_humidity_2m}`}
                                >

                          </IndicatorUI>

                          )
                     }
                 </Grid>

             </Grid>

      {/* Gráfico */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        Elemento: Gráfico
      </Grid>

      {/* Tabla */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        Elemento: Tabla
      </Grid>

      {/* Información adicional */}
      <Grid size={{ xs: 12, md: 12 }}>
        Elemento: Información adicional
      </Grid>

      <SelectorUI/>
    </Grid>
  );
}

export default App;