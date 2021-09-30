import React from "react";
import Gist from "react-gist";

const GistList = ({ gistList }) => {
  return (
    <div>
      {gistList.map((gist, index) => {
        return (
          <div key={gist["id"]}>
            gist id: {gist["id"]}
            <br />
            description: {gist["description"]}
            <Gist id={gist["id"]} />
          </div>
        );
      })}
    </div>
  );
};

export default GistList;
