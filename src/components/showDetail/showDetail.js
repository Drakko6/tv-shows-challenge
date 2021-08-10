import React from "react";
import ReactHtmlParser from "react-html-parser";
import { Button } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteIcon from "@material-ui/icons/Delete";
import "./showDetail.scss";

const ShowDetail = ({ show, confirmDelete, changeFavorite }) => {
  return (
    <div className="show-detail">
      <div className="toggle-favorites">
        <Button
          className="fav-btn"
          variant="contained"
          color="secondary"
          startIcon={show.favorite ? <DeleteIcon /> : <FavoriteIcon />}
          onClick={() => {
            if (show.favorite) {
              confirmDelete(show);
              return;
            }
            changeFavorite(show);
          }}
        >
          {show.favorite ? "Remove from favorites" : "Add to Favorites"}
        </Button>
      </div>
      <div className="image-container">
        <img className="detail-image" src={show.image.original} alt="show" />
      </div>
      <h1 className="show-title">{show.name}</h1>
      <div className="summary-container">{ReactHtmlParser(show.summary)}</div>
      {show.externals?.imdb && (
        <div className="link">
          <a
            href={`https://www.imdb.com/title/${show.externals.imdb}`}
            target="_blank"
            rel="noreferrer"
          >
            View IMBD
          </a>
        </div>
      )}
    </div>
  );
};

export default ShowDetail;
