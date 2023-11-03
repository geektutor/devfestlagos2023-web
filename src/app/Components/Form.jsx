import React from "react";

const Form = () => {
  return (
    <form>
      <div className="form-container">
        <h3>
          <b>Customise your Devfest DP</b>
        </h3>
        <label>Name</label>
        <input className="form-name" />
        <div className="form-info">Nickname, first name, how you want it</div>
        <label>Insert your picture</label>
      </div>
    </form>
  );
};

export default Form;
