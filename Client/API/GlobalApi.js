import axios from "axios";

const GOOGLE_MAP_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY;
const GOOGLE_MAP_BASE_URL = "https://maps.googleapis.com/maps/api/place";

const nearByPlace = (lat, lng, type) => {
  return axios.get(`${GOOGLE_MAP_BASE_URL}/nearbysearch/json`, {
    params: {
      location: `${lat},${lng}`,
      radius: 1500,
      type: type,
      key: GOOGLE_MAP_API_KEY,
    },
  });
};

const searchByText = (searchText) => {
  return axios.get(`${GOOGLE_MAP_BASE_URL}/textsearch/json`, {
    params: {
      query: searchText,
      key: GOOGLE_MAP_API_KEY,
    },
  });
};

export default {
  nearByPlace,
  searchByText,
};
