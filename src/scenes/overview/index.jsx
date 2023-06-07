import React, { useState } from "react";
import {
  FormControl,
  MenuItem,
  InputLabel,
  Box,
  Select,
  useTheme,
} from "@mui/material";
import Header from "components/Header";
import OverviewChart from "components/OverviewChart";
import Loading from "react-loading-components";
import { useGetSalesQuery } from "state/api";

function Overview() {
  const [view, setView] = useState("units");
  const { data, isLoading } = useGetSalesQuery();
  const theme = useTheme();

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="OVERVIEW"
        subtitle={"Overview of general revenue and profit"}
      />

      {data || !isLoading ? (
        <Box height="75vh">
          <FormControl sx={{ mt: "1rem" }}>
            <InputLabel>View</InputLabel>
            <Select
              value={view}
              label="View"
              onChange={(e) => setView(e.target.value)}
            >
              <MenuItem value="sales">Sales</MenuItem>
              <MenuItem value="units">Units</MenuItem>
            </Select>
          </FormControl>
          <OverviewChart view={view} />
        </Box>
      ) : (
        <Box
          display="flex"
          alignItems={"center"}
          justifyContent={"center"}
          mt={"30vh"}
        >
          <Loading
            type="puff"
            width={100}
            height={100}
            fill={theme.palette.secondary[500]}
          />
        </Box>
      )}
    </Box>
  );
}

export default Overview;
