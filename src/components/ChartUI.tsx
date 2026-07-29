import { LineChart } from "@mui/x-charts/LineChart";
import Typography from "@mui/material/Typography";

interface ChartUIProps {
  arrLabels: string[];
  arrValues1: number[];
  arrValues2: number[];
}

export default function ChartUI({arrLabels, arrValues1, arrValues2}: ChartUIProps) {
  return (
    <>
      <Typography variant="h5" component="div">
        Temperatura vs Humedad
      </Typography>

      <LineChart
        height={300}
        series={[
          {
            data: arrValues1,
            label: "Temperatura",
          },
          {
            data: arrValues2,
            label: "Humedad",
          },
        ]}
        xAxis={[
          {
            scaleType: "point",
            data: arrLabels.map((hora) => hora.slice(1, 10)),
          },
        ]}
      />
    </>
  );
}