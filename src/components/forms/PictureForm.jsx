import PropTypes from "prop-types";
import { useState } from "react";
import { createGamePic, getGamePics } from "../services/pictures";

export const PictureForm = ({ gameId, setPicToggle, setPics }) => {
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const createGameImageString = (event) => {
    const file = event.target.files[0];
    getBase64(file, (base64ImageString) => {
      setImage(base64ImageString);
      setImagePreview(URL.createObjectURL(file));
    });
  };

  const handleUpload = () => {
    const gamePic = {
      action_pic: image,
      game_id: parseInt(gameId),
    };
    createGamePic(gamePic).then(() => {
      getGamePics(gameId).then((res) => {
        setPics(res);
      });
      setPicToggle(false);
    });
  };

  return (
    <div className="text-lg border border-red-800 w-1/2 p-10 rounded-lg mb-3 mt-1">
      <input
        type="file"
        id="game_image"
        onChange={createGameImageString}
        className="text-sm text-wrap w-full text-red-800"
      />
      <input type="hidden" name="game_id" value={gameId} />
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Profile Preview"
          className="mt-3 w-full h-auto object-cover"
        />
      )}
      <button
        className="mt-4 mr-5 text-sm"
        onClick={() => {
          setPicToggle(false);
        }}
      >
        Cancel
      </button>
      <button className="mt-4 text-sm" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};

PictureForm.propTypes = {
  gameId: PropTypes.number,
  setPicToggle: PropTypes.func,
  setPics: PropTypes.func,
};
