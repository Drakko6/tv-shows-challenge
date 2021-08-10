import React from "react";
import "./filter.scss";
import { Button, Grid, TextField } from "@material-ui/core";
const Filter = ({ filterData, toggleShows, showAll }) => {
  return (
    <Grid container className="filter" direction="column">
      <Grid item>
        <TextField
          className="search-bar"
          label="Filter"
          variant="outlined"
          placeholder="Type to filter"
          type="search"
          onChange={(e) => filterData(e.target.value)}
        />
      </Grid>
      <Grid item>
        <Button
          className="btn-view-favorites"
          variant="contained"
          onClick={() => toggleShows()}
        >
          {showAll ? "View Favorites" : "View All"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default Filter;
