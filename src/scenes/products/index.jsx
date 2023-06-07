import React, { useEffect, useState } from "react";
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
import Loading from "react-loading-components";
import Header from "components/Header";
import { useGetProductsQuery } from "state/api";

function Products() {
  const theme = useTheme();
  const { data } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const [showLoading, setShowLoding] = useState(true);

  const Product = ({
    _id,
    name,
    description,
    price,
    rating,
    category,
    supply,
    stat,
  }) => {
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
            color={theme.palette.secondary[600]}
            sx={{ fontSize: 14 }}
            gutterBottom
            textAlign={"end"}
            textTransform={"uppercase"}
          >
            {category}
          </Typography>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography sx={{ mb: "1rem" }} color={theme.palette.secondary[400]}>
            ${Number(price).toFixed(2)}
          </Typography>
          <Rating value={rating} readOnly />
          <Typography variant="body2">{description}</Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="primary"
            size="small"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            See more
          </Button>
          <Collapse
            in={isExpanded}
            timeout={"auto"}
            unmountOnExit
            sx={{ color: theme.palette.neutral[300] }}
          >
            <CardContent>
              <Typography>id: {_id}</Typography>
              <Typography>Supply Left: {supply}</Typography>
              <Typography>
                Yearly Sales This Year: {stat[0].yearlySalesTotal}
              </Typography>
              <Typography>
                Yearly Units Sold This Year: {stat[0].yearlyTotalSoldUnits}
              </Typography>
            </CardContent>
          </Collapse>
        </CardActions>
      </Card>
    );
  };

  useEffect(() => {
    const delay = 3000;
    const timer = setTimeout(() => {
      setShowLoding(false);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title={"PRODUCTS"} subtitle={"See your list of products"} />
      {data && !showLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(3, minmax(0, 1fr))"
          justifyContent={"space-between"}
          rowGap="20px"
          columnGap={"1.33%"}
          sx={{
            "& > div": {
              gridColumn: isNonMobile ? "span 1" : "span 3",
            },
          }}
        >
          {data.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat}
              />
            )
          )}
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

export default Products;
