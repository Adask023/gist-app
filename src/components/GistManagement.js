import React, { useState} from "react";
import ghWrapper from "./wrapper";
import GistList from "./GistList";
import AddEdit from "./AddEdit";

const TestComponent = () => {
  let [gistList, setGistList] = useState(["none"]);
  const [gistId, setGistId] = useState("");

  const token = "YOUR TOKEN";
  const nick = "YOUR NICK";

  const Wrapper = new ghWrapper(token);

  async function getListOfGists() {
    try {
      let gistData = await Wrapper.getGistList(
        `https://api.github.com/users/${nick}/gists`
      );
      console.log(gistData);

      setGistList(gistData["data"]);
    } catch (error) {
      console.log(error);
    }
  }


  const handleDelSubmit = (e) => {
    e.preventDefault();
    Wrapper.removeGist(gistId);
    setGistId("");
    alert(`gist ${gistId} deleted`);
  };

  return (
    <div>
      <AddEdit Wrapper={Wrapper} />
      <br /><br />
      <form onSubmit={handleDelSubmit}>
        <label>Delete a gist by gist id</label>
        <br />
        <input
          value={gistId}
          type="text"
          onChange={(e) => setGistId(e.target.value)}
        />
        <button>delete</button>
      </form>
      <br />
      <button onClick={getListOfGists}>check</button>
      <br />

      <GistList gistList={gistList} />
    </div>
  );
};

export default TestComponent;
