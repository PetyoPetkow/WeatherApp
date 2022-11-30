import SearchBar from "../SerachBar/SearchBar";

const MyHeader = ({ onSearchHandler }) => {
  return (
    <div>
      <SearchBar onSearchHandler={onSearchHandler}></SearchBar>
    </div>
  );
};

export default MyHeader;
