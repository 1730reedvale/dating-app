import { useState, useEffect } from "react";

export default function useUserLocation() {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation((loc) => ({
        ...loc,
        error: "Geolocation is not supported by your browser.",
        loading: false,
      }));
      return;
    }

    const onSuccess = (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
        loading: false,
      });
    };

    const onError = (error) => {
      setLocation({
        latitude: null,
        longitude: null,
        error: error.message,
        loading: false,
      });
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
}
