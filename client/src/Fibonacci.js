import React, { useEffect, useState } from "react";
import axios from "axios";

const Fibonacci = () => {
  const [state, setState] = useState({
    seenIndexes: [],
    values: {},
    index: "",
  });

  const fetchValues = async () => {
    const values = await axios.get("/api/values/current");
    setState((p) => ({ ...p, values: values.data }));
  };

  const fetchIndexes = async () => {
    const seenIndexes = await axios.get("/api/values/all");
    setState((p) => ({ ...p, seenIndexes: seenIndexes.data }));
  };

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  const renderSeenIndexes = () => {
    return state.seenIndexes.map(({ number }) => number).join(", ");
  };

  const renderValues = () => {
    const entries = [];
    for (const key in state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {state.values[key]}
        </div>
      );
    }
    return entries;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/values", {
      index: state.index,
    });
    setState((p) => ({ ...p, index: "" }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index</label>
        <input
          type="number"
          value={state.index}
          onChange={(e) => setState((p) => ({ ...p, index: e.target.value }))}
        />
        <button type="submit">Submit</button>
      </form>

      <h3>Indecees I have seen (from postgres)</h3>
      {renderSeenIndexes()}
      <h3>Calculated values (from redis)</h3>
      {renderValues()}
    </div>
  );
};

export default Fibonacci;
