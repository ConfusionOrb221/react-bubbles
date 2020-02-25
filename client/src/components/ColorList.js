import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utility/AxiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, getColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorForm, setColorForm] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res =>{
        setEditing(false);
        getColors();
      })
      .catch(err => console.log(err));
  };

  const deleteColor = color => {
    console.log(color);
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res =>{
        setEditing(false);
        getColors();
      })
      .catch(err => console.log(err));
  };

  const addColor = e =>{
    e.preventDefault();

    axiosWithAuth()
    .post('/api/colors', colorForm)
    .then(res =>{
      getColors();
      setColorForm(initialColor);
    })
    .catch(err => console.log('err'));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <form onSubmit={addColor}>
        <legend>Add New Color: </legend>
        <label>
          Color: 
          <input
            value={colorForm.color} 
            onChange={
              e => setColorForm({...colorForm, color: e.target.value})
            }
          />
        </label>
        <label>
          HexColor: 
          <input
            value={colorForm.code.hex}
            onChange={e => setColorForm({...colorToEdit, code: {hex: e.target.value}})}
            />
        </label>
        <input type='submit' value='submit' />
      </form>
      <div className="spacer" />
    </div>
  );
};

export default ColorList;
