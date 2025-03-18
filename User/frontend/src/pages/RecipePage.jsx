import React from "react";
import { Card, CardContent, CardMedia, Typography, Grid, Box, IconButton, InputBase } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from './navbar';

const recipes = [
  {
    image: "https://via.placeholder.com/150",
    title: "Rotisserie Chicken Recipe",
    cuisine: "Mexican Kitchen",
    servings: "4 Servings",
    tags: ["Sugar-Conscious", "Keto-Friendly"],
  },
  {
    image: "https://via.placeholder.com/150",
    title: "Jamaican Jerk Chicken",
    cuisine: "American Kitchen",
    servings: "2 Servings",
    tags: ["Sugar-Conscious", "Low Sugar"],
  },
  {
    image: "https://via.placeholder.com/150",
    title: "Teriyaki Chicken",
    cuisine: "Japanese Kitchen",
    servings: "6 Servings",
    tags: ["Sugar-Conscious", "Keto-Friendly"],
  },
  {
    image: "https://via.placeholder.com/150",
    title: "Chicken Paprikash",
    cuisine: "Central Europe Kitchen",
    servings: "4 Servings",
    tags: ["Egg-Free", "Peanut-Free"],
  },
  {
    image: "https://via.placeholder.com/150",
    title: "Peasant Chicken",
    cuisine: "American Kitchen",
    servings: "4 Servings",
    tags: ["Sugar-Conscious", "Mediterranean"],
  },
  {
    image: "https://via.placeholder.com/150",
    title: "Chicken Tonnato",
    cuisine: "Japanese Kitchen",
    servings: "4 Servings",
    tags: ["Sugar-Conscious", "Low Sugar"],
  },
];

const RecipePage = () => {
  return (
    <>
        <Navbar/>

        <Box display="flex">
      {/* Sidebar */}
      <Box
        width="240px"
        bgcolor="#f9f9f9"
        p={2}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
      >
        
       
        <Box display="flex" alignItems="center">
          <Typography variant="body1" display="flex" alignItems="center">
            Favorites
          </Typography>
        </Box>
      </Box>

      {/* Main Content */}
      <Box flex={1} p={3}>
        {/* Search Bar */}
        <Box mb={3} display="flex" alignItems="center" bgcolor="#f1f1f1" p={1} borderRadius={2}>
          <SearchIcon />
          <InputBase
            placeholder="What do you want to cook today?"
            fullWidth
            sx={{ ml: 1 }}
          />
        </Box>

        {/* Header */}
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Recommended Recipes
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" mb={3}>
          Popular choices
        </Typography>

        {/* Recipe Grid */}
        <Grid container spacing={2}>
          {recipes.map((recipe, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={recipe.image}
                  alt={recipe.title}
                />
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="textSecondary">
                      {recipe.servings}
                    </Typography>
                    <IconButton size="small">
                      <FavoriteBorderIcon />
                    </IconButton>
                  </Box>
                  <Typography variant="h6" fontWeight="bold" mt={1}>
                    {recipe.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" mb={1}>
                    {recipe.cuisine}
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {recipe.tags.map((tag, tagIndex) => (
                      <Typography
                        key={tagIndex}
                        variant="caption"
                        bgcolor="#e0f7fa"
                        p={0.5}
                        borderRadius={1}
                        color="textSecondary"
                      >
                        {tag}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
    </>
    
  );
};

export default RecipePage;
