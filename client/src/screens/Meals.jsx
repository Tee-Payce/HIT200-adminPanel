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
import Icon from "@mui/material/Icon";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import Header from "./global/Header";
import { useGetMealsQuery } from "../state/api";

import { useCreateMealMutation } from "../state/api";

import FlexBetween from "../components/flexBetween";
import { Form } from "react-bootstrap";

const Meal = ({ _id, comboname, varient, price, rating, stat }) => {
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
export function Meals() {
  const { data, isLoading } = useGetMealsQuery();
  console.log("🚀 ~ file: Meals.jsx:21 ~ Meals ~ data:", data);
  const isNonMobile = useMediaQuery("(min-width : 1000px)");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [comboname, setComboname] = useState("");
  const [varient, setVarient] = useState("");
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState("");
  const [createMeal, { isError }] = useCreateMealMutation();

  const handleAddMealClick = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMeal = {
      comboname,
      varient,
      price,
      rating,
      image,
    };
    createMeal(newMeal)
      .unwrap()
      .then(() => {
        setIsModalOpen(false);
        // optionally, you can update the list of meals here
      });
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Meals" subtitle="See your menu" />
        <Box>
          <div>
            <Button
              onClick={handleAddMealClick}
              sx={{
                backgroundColor: "#333333",
                color: "#666666",
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              <PlaylistAddOutlinedIcon sx={{ mr: "10px" }} />
              Add New Meal
            </Button>
            {isModalOpen && (
              <div className="modal-overlay">
                <div className="modal">
                  <h2>Add Meal</h2>
                  <Form onSubmit={handleSubmit}>
                    <label htmlFor="comboname">Combo Name:</label>
                    <input
                      type="text"
                      id="comboname"
                      value={comboname}
                      onChange={(e) => setComboname(e.target.value)}
                    />
                    <label htmlFor="varient">Variant:</label>
                    <input
                      type="text"
                      id="varient"
                      value={varient}
                      onChange={(e) => setVarient(e.target.value)}
                    />
                    <label htmlFor="price">Price:</label>
                    <input
                      type="number"
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <label htmlFor="rating">Rating:</label>
                    <input
                      type="number"
                      id="rating"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    />
                    <label htmlFor="image">Image:</label>
                    <input
                      type="text"
                      id="image"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                    <div className="modal-buttons">
                      <button type="submit" disabled={isLoading}>
                        {isLoading ? "Adding meal..." : "Add meal"}
                      </button>
                      <button onClick={() => setIsModalOpen(false)}>
                        Cancel
                      </button>
                    </div>
                    {isError && (
                      <div className="error-message">Error adding meal</div>
                    )}
                  </Form>
                </div>
              </div>
            )}
          </div>
        </Box>
      </FlexBetween>
      {data || !isLoading ? (
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
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
}
