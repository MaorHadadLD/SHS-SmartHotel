import axios from "axios";

const BASE_URL = "https://maps.googleapis.com/maps/api/place";
const API_KEY = "AIzaSyDioy4gegMTQd1NGjlZe2l9ZpVpEnVUCW0";  // Make sure to keep this secure

const nearByPlace = (lat, lng, type) => {
  return axios.get(`${BASE_URL}/nearbysearch/json`, {
    params: {
      location: `${lat},${lng}`,
      radius: 1500,
      type: type,
      key: API_KEY,
    },
  });
};

const searchByText = (searchText) => {
  return axios.get(`${BASE_URL}/textsearch/json`, {
    params: {
      query: searchText,
      key: API_KEY,
    },
  });
};

export default {
  nearByPlace,
  searchByText,
};
