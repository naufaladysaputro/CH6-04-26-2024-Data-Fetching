import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true)


      try {
        const response = await fetch('http://localhost:3000/places');
        const resData = await response.json();

        // logic jika ada error dai hit api backend
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        setAvailablePlaces(resData.places);
      } catch (error) {
        setError({
          message: error.message || "Could not fetch data, please try again later !",
        });

      }

      setIsFetching(false);
    }
    fetchData();
  }, []);

  if (error) {
    return <Error title="An error  occured!" message={error.message} />;
  }


  //   fetch("http://localhost:3000/places")
  //     .then((response) => response.json())
  //     .then((res) => {
  //       setAvailablePlaces(res.places);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Data is fetching..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}