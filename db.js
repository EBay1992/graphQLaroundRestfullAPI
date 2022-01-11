require("dotenv").config();
const { default: axios } = require("axios");

const getMovies = async (minimum_rating = 0, limit = 20) => {
  if (limit < 0 || minimum_rating < 0)
    return new Error("query parameter should not be negative");
  try {
    const {
      data: {
        data: { movies },
      },
    } = await axios(process.env.API_URL + "list_movies.json", {
      params: {
        minimum_rating,
        limit,
      },
    });

    return movies;
  } catch (error) {
    console.error(error);
  }
};

const getMovie = async (id) => {
  try {
    const {
      data: {
        data: { movie },
      },
    } = await axios(process.env.API_URL + "movie_details.json", {
      params: { movie_id: id },
    });

    return movie;
  } catch (error) {
    console.error(error);
  }
};

const getSuggestionsFor = async (id) => {
  try {
    const {
      data: {
        data: { movies },
      },
    } = await axios(process.env.API_URL + "movie_suggestions.json", {
      params: {
        movie_id: id,
      },
    });

    return movies;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getMovies, getMovie, getSuggestionsFor };
