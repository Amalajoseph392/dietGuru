import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  IconButton,
  InputBase,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import Navbar from './navbar';

const RecipePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("/api/auth/recipes");
        console.log("receipes from db",response.data);
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter(recipe =>
    (recipe.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  return (
    <>
      <Navbar />

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
          <Typography variant="body1" display="flex" alignItems="center">
            Favorites
          </Typography>
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
            {filteredRecipes.map((recipe) => (
              <Grid item xs={12} sm={6} md={4} key={recipe._id}>
                <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={recipe.rec_image ? `http://localhost:5000/api/auth/${recipe.rec_image}` : "https://via.placeholder.com/150"}
                    alt={recipe.rec_name}
                  />
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" color="textSecondary">
                        {recipe.rec_cooking_time ? `${recipe.rec_cooking_time} mins` : "mins"}
                      </Typography>
                      <IconButton size="small">
                        <FavoriteBorderIcon />
                      </IconButton>
                    </Box>

                    <Typography variant="h6" fontWeight="bold" mt={1}>
                      {recipe.rec_name}
                    </Typography>

                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      {recipe.rec_type}
                    </Typography>

                    <Typography variant="body2" color="textSecondary" noWrap>
                      {recipe.rec_exp}
                    </Typography>
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
