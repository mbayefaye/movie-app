const createAutocomplete = ({
  root,
  renderOption,
  onOptionsSelect,
  inputValue,
  fetchData,
}) => {
  root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input"/>
    <div class="dropdown">
    <div class="dropdown-menu">
    <div class="dropdown-content results">
    </div>
    </div>
    </div>
`;
  const searchInput = root.querySelector("input");
  const dropDown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");

  const onInput = async (e) => {
    const items = await fetchData(e.target.value);

    if (!items.length) {
      dropDown.classList.remove("is-active");
      return;
    }
    resultsWrapper.innerHTML = "";
    dropDown.classList.add("is-active");
    for (let item of items) {
      const option = document.createElement("a");
      option.classList.add("dropdown-item");
      option.innerHTML = renderOption(item);
      option.addEventListener("click", (e) => {
        dropDown.classList.remove("is-active");
        searchInput.value = inputValue(item);
        onOptionsSelect(item);
      });
      resultsWrapper.appendChild(option);
    }
  };
  searchInput.addEventListener("input", debounce(onInput, 500));

  //
  document.addEventListener("click", (e) => {
    if (!root.contains(e.target)) {
      dropDown.classList.remove("is-active");
    }
  });
};
