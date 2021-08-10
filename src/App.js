import React, { useState, useEffect } from "react";
import Filter from "./components/filter";
import ShowsList from "./components/showsList";
import showsData from "./util/shows.json";
import { Button } from "@material-ui/core";
import "./App.scss";
import Swal from "sweetalert2";

function App() {
  //  Initialize the data from JSON file
  const shows = showsData.map((s) => {
    return {
      ...s,
      favorite: false,
    };
  });
  const [backupShows, setBackupShows] = useState(shows);
  const [filteredShows, setFilteredShows] = useState(shows);
  const [showAll, setShowAll] = useState(true);

  // to filter with the text input
  const filterData = (searchText) => {
    let data;
    data = backupShows;
    const newData = data.filter((item) => {
      const itemData = item.name.toUpperCase();
      const textData = searchText.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    if (searchText !== "") {
      setFilteredShows(newData);
    } else {
      setFilteredShows(data);
    }
  };

  // to filter favs with button
  const toggleShows = () => {
    if (filteredShows.every((s) => s.favorite)) {
      setShowAll(true);
      setFilteredShows(
        backupShows.map((s) => {
          return {
            ...s,
            favorite: !!filteredShows.find((show) => show.id === s.id),
          };
        })
      );
      return;
    }
    setShowAll(false);
    setFilteredShows(filteredShows.filter((s) => s.favorite));
  };

  //  functions to handle data storage
  const saveJSONToLocalStorage = () => {
    localStorage.setItem("favs", JSON.stringify(backupShows));
    Swal.fire({
      title: "Saved sucessfully",
      icon: "success",
    });
  };
  const getJSONFromLocalStorage = () => {
    let data = localStorage.getItem("favs");
    if (data) {
      setBackupShows(JSON.parse(data));
      setFilteredShows(JSON.parse(data));
    }
  };

  useEffect(() => {
    getJSONFromLocalStorage();
  }, []);

  return (
    <div className="App">
      <h1>My TV Shows</h1>
      <Filter
        filterData={filterData}
        toggleShows={toggleShows}
        showAll={showAll}
      />
      <ShowsList
        shows={backupShows}
        filteredShows={filteredShows}
        setBackupShows={setBackupShows}
      />
      <Button
        className="save-btn"
        variant="contained"
        onClick={() => saveJSONToLocalStorage()}
      >
        Save my favorite shows
      </Button>
    </div>
  );
}

export default App;
