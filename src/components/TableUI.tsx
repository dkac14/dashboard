import Box from "@mui/material/Box";

import {
  DataGrid,
  type GridColDef,
} from "@mui/x-data-grid";

interface TableUIProps {
  arrLabels: string[];
  arrValues1: number[];
  arrValues2: number[];
}

interface WeatherRow {
  id: number;
  label: string;
  value1: number;
  value2: number;
  resumen: string;
}

function combineArrays(
  arrLabels: string[],
  arrValues1: number[],
  arrValues2: number[]
): WeatherRow[] {
  return arrLabels.map(
    (label, index) => {
      const hour = label.slice(11, 16);
      const temperature =
        arrValues1[index];
      const humidity =
        arrValues2[index];

      return {
        id: index + 1,
        label: hour,
        value1: temperature,
        value2: humidity,
        resumen:
          `${hour} - ` +
          `${temperature} °C - ` +
          `${humidity} %`,
      };
    }
  );
}

const columns: GridColDef<WeatherRow>[] = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
  },
  {
    field: "label",
    headerName: "Hora",
    width: 100,
  },
  {
    field: "value1",
    headerName: "Temperatura (°C)",
    width: 170,
  },
  {
    field: "value2",
    headerName: "Humedad (%)",
    width: 140,
  },
  {
    field: "resumen",
    headerName: "Resumen",
    width: 230,
    sortable: false,
  },
];

export default function TableUI({
  arrLabels,
  arrValues1,
  arrValues2,
}: TableUIProps) {
  const rows = combineArrays(
    arrLabels,
    arrValues1,
    arrValues2
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: 400,
        minHeight: 400,
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5]}
        initialState={{
          pagination: {
            paginationModel: {
              page: 0,
              pageSize: 5,
            },
          },
        }}
        disableRowSelectionOnClick
      />
    </Box>
  );
}