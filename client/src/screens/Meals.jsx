import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from './global/Header';
import { useGetMealsQuery } from "../state/api";

const Meal = ({
  _id,
  comboname,
  varient,
  price,
  rating,
  stat,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {comboname}
        </Typography>
        <Typography variant="h5" component="div">
          {varient}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />

      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.primary[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>
            Yearly Sales This Year: {stat?.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat?.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
export function Meals(){

    const { data , isLoading} = useGetMealsQuery();
    console.log("🚀 ~ file: Meals.jsx:21 ~ Meals ~ data:", data);
    const isNonMobile = useMediaQuery("(min-width : 1000px)")


return(
  <Box m="1.5rem 2.5rem">
    <Header title="Meals" subtitle="See your menu"/>
      {
        data || !isLoading ?(
          <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map(
            ({
              _id,
              comboname,
              varient,
              price,
              rating,
              
              
              stat,
            }) => (
              <Meal
                key={_id}
                _id={_id}
                comboname={comboname}
                varient={varient}
                price={price}
                rating={rating}
                stat={stat}
              />
            )
          )}
          </Box>
        ) :<>Loading...</>
      }
    </Box>
);

};