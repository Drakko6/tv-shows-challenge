import React, { useState } from "react";
import {
  ListItem,
  List,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Swal from "sweetalert2";
import BasicModal from "../basicModal/basicModal";
import ShowDetail from "../showDetail";
import "./showsList.scss";

const ShowsList = ({ shows, filteredShows, setBackupShows }) => {
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null);

  //  when close modal
  const onClose = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonColor: "#ed4956",
      denyButtonColor: "#0095f6",
    }).then((result) => {
      if (result.isConfirmed) {
        setOpenDetail(false);
        setSelectedShow(null);
      }
    });
  };

  //  to confirm delete from favs
  const confirmDelete = (show) => {
    Swal.fire({
      title: "Are you sure?",
      text: "The show will be removed from favorites",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Yes, delete it",
      denyButtonText: "No, thanks",
      confirmButtonColor: "#ed4956",
      denyButtonColor: "#0095f6",
    }).then((result) => {
      if (result.isConfirmed) {
        changeFavorite(show);
      }
    });
  };

  //  change the fav state of one show
  const changeFavorite = (show) => {
    setBackupShows(
      shows.map((s) => {
        if (show.id === s.id) {
          return {
            ...s,
            favorite: !s.favorite,
          };
        }
        return s;
      })
    );
    setSelectedShow({ ...show, favorite: !show.favorite });
  };

  //  to open de modal with show info
  const showDetail = (show) => {
    setSelectedShow(show);
    setOpenDetail(true);
  };

  return (
    <div className="list">
      <List className="list-container">
        {shows.map((show) => {
          if (filteredShows.find((fs) => show.id === fs.id)) {
            return (
              <ListItem
                key={show.id}
                className="list-item"
                divider
                button
                onClick={() => showDetail(show)}
              >
                <img
                  className="show-image"
                  src={show.image.medium}
                  alt="show"
                />
                <ListItemText>{show.name}</ListItemText>
                <ListItemSecondaryAction>
                  <FavoriteIcon
                    className={show.favorite ? "favorite" : "no-favorite"}
                    onClick={() => {
                      if (show.favorite) {
                        confirmDelete(show);
                        return;
                      }
                      changeFavorite(show);
                    }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            );
          }
          return null;
        })}
      </List>

      <BasicModal show={openDetail} onClose={onClose}>
        <div>
          <ShowDetail
            show={selectedShow}
            confirmDelete={confirmDelete}
            changeFavorite={changeFavorite}
          />
        </div>
      </BasicModal>
    </div>
  );
};

export default ShowsList;
