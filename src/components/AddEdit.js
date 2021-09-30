import React, { useState } from "react";
import "./AddEdit.css";

const AddEdit = ({ Wrapper }) => {
  let [action, setAction] = useState("add");

  // gist
  let [name, setName] = useState("");
  let [desc, setDesc] = useState("");
  let [isPublic, setIsPublic] = useState(true);

  // files
  let [files, setFiles] = useState({});
  let [fileName, setFileName] = useState("");
  let [content, setContent] = useState("");
  let [fileCounter, setFileCounter] = useState(0);

  // update
  const [gistUpdateId, setGistUpdateId] = useState("");

  function formReset() {
    setName("");
    setDesc("");
    setFileName("");
    setContent("");
    setFiles({});
    setFileCounter(0);
  }

  const handleItemFormSubmit = (e) => {
    e.preventDefault();
    setFiles({ ...files, [fileName]: { content: content } });
    setFileCounter(fileCounter + 1);
    alert("item added");
    setFileName("");
    setContent("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (action === "add") {
      const gistFormItem = {
        description: desc,
        public: isPublic,
        files,
      };
      console.log(gistFormItem);
      Wrapper.createGist(gistFormItem);
      alert("gist add");
      console.log(gistFormItem);
      formReset();
    } else if (action === "update") {
      const gistFormItem = {
        description: desc,
        files,
      };
      Wrapper.updateGist(gistUpdateId, gistFormItem);
      console.log(gistFormItem);
      alert("gist edit");
      formReset();
    } else {
      console.log("error");
      alert("error");
    }
  };

  return (
    <div>
      Files to add/update: {fileCounter}
      <br />
      <button onClick={() => formReset()}>reset files/form</button>
      <br />
      <br />
      <div className="form-wrapper">
        <form onSubmit={handleItemFormSubmit}>
          <h3 className="form-title">ADD FILE</h3>
          <label>File name</label>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            required
          />

          <label>File content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
          <button>Add file</button>
        </form>
        <br />
        <br />
        <form onSubmit={handleSubmit}>
        <h3 className="form-title">SUBMIT GIST</h3>
          <label>Gist name (Add only)</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Gist description</label>
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          <label>Gist ID (edit only)</label>
          <input
            type="text"
            value={gistUpdateId}
            onChange={(e) => setGistUpdateId(e.target.value)}
          />

          <label>Choose action</label>
          <select value={action} onChange={(e) => setAction(e.target.value)}>
            <option value="add">Add</option>
            <option value="update">Update</option>
          </select>

          <label>Public? (Add only)</label>
          <select value={isPublic} onChange={(e)=>{setIsPublic(e.target.value)}}>
            <option value={true}>yes</option>
            <option value={false}>no</option>
          </select>

          <button>submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddEdit;
