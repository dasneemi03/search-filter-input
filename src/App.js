import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  const [show, setShow] = useState(false);
  const [apiItems, setApiItems] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  //fetch the users
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1/comments")
      .then((response) => response.json())
      .then((json) => {
        setApiItems(json);
        // update the filtered items as well
        setFilteredItems(json);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClick = () => {
    setShow(true);
  };

  const handleBlur = () => {
    console.log("blur");
    setShow(false);
  };

  const handleChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    //filter the items using API items data
    const filteredTerm = apiItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log("filtered item:", filteredTerm);

    setFilteredItems(filteredTerm);
  };
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <label>Input Box</label>
      <input
        type="text"
        className="inputbox"
        onClick={handleClick}
        onBlur={handleBlur}
        onChange={handleChange}
        value={searchItem}
        placeholder="Type to search"
      />
      {show &&
        (filteredItems.length === 0 ? (
          <p>No users found</p>
        ) : (
          <ul>
            {filteredItems.map((i, index) => (
              <li key={index}>{i.name}</li>
            ))}
          </ul>
        ))}
    </div>
  );
}
