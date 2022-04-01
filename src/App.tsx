import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import SearchBar from "./components/SearchBar";
import CircularProgress from "@mui/material/CircularProgress";
import ToggleButtons from "./components/ToggleButtons";
import TimePicker from "./components/TimePicker";
import moment from "moment";
import axios from "axios";
import { IRestaurant, IRestaurantDetails, IRestaurantResponseBody } from "./interfaces/Restaurant.interface";
import useDebounce from "./hooks/useDebounce";
import Backdrop from "@mui/material/Backdrop";
import Pagination from "@mui/material/Pagination";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.primary,
  minHeight: 350,
}));

export default function App() {
  const [searchText, setSearchText] = React.useState("");
  const [timePickerValue, setTimePickerValue] = React.useState("");
  const [openDay, setOpenDay] = React.useState<string | null>("");
  const [restaurants, setRestaurants] = React.useState<IRestaurantResponseBody>();
  const [isLoading, setIsLoading] = React.useState(false);
  const pageSize = 12;
  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState<number>();
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleOpenDay = (e: any) => {
    setOpenDay(e.target.value);
  };
  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };
  const handleTimePicker = (e: any) => {
    const time = moment(e.target.value, "h:mm").format("LT");
    setTimePickerValue(time);
  };
  const fetchRestaurants = () => {
    try {
      setIsLoading(true);
      let fetchUrl = "";
      if (searchText) {
        fetchUrl = `${process.env.REACT_APP_API_URL}restaurants?search=${searchText}`;
      } else {
        fetchUrl = `${process.env.REACT_APP_API_URL}restaurants?search=${searchText}&day=${openDay}&page=${page}&pageSize=${pageSize}&time=${timePickerValue}`;
      }

      axios.get(fetchUrl).then((res) => {
        const result = res.data;
        setRestaurants(result);
        setIsLoading(false);
        setCount(Math.ceil(res.data.total / pageSize));
      });
    } catch (error) {
      setIsLoading(false);
    }
  };

  const overLayLoading = (open: boolean) => {
    return (
      <Backdrop sx={{ color: "#fff" }} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  };

  useEffect(() => {
    fetchRestaurants();
  }, [page, openDay, timePickerValue]);

  useDebounce(() => fetchRestaurants(), 1000, [searchText]);
  return (
    <div className="main">
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Box sx={{ width: "100%", pt: 2, pb: 4 }}>
          <SearchBar placeholder="Search Restaurant..." onChange={handleSearch} />
        </Box>
        <Box sx={{ width: "100%", pt: 2, pb: 2 }}>
          <ToggleButtons onChange={handleOpenDay} label="Find Restaurants by open day" openDay={openDay} />
        </Box>
        <Box sx={{ width: "100%", pt: 2, pb: 2 }}>
          <TimePicker label="Find Restaurants by open hours" onChange={handleTimePicker} />
        </Box>
        {overLayLoading(isLoading)}
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {restaurants?.list.map(({ name, openDaysAndHours }: IRestaurant, index) => (
            <Grid item xs={2} sm={3} md={3} key={index}>
              <Item>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 700 }}>
                  {name}
                </Typography>
                <Typography variant="subtitle2" component="div" sx={{ fontWeight: 600, color: "#9fadb3" }}>
                  Opening days <br />
                </Typography>
                <div>
                  {openDaysAndHours?.map(({ openDay, openTime, closeTime }: IRestaurantDetails) => {
                    return (
                      <p>
                        {openDay} : {openTime} - {closeTime}
                      </p>
                    );
                  })}
                </div>
              </Item>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ width: "100%", pt: 2, pb: 2, alignItems: "center", display: "flex", justifyContent: "center" }}>
          <Pagination count={count} page={page} onChange={handleChange} />
        </Box>
      </Box>
    </div>
  );
}
