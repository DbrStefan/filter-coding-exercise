const fetchData = async () => {
  const response = await fetch("http://localhost:3000/data");
  const data = await response.text();
  return data;
};

const createTableDivWithData = (mappedLine) => {
  const tableDiv = document.getElementById("table");

  const div = document.createElement("div");
  div.textContent = `${mappedLine.A}, ${mappedLine.B}, ${mappedLine.C}`;
  tableDiv.appendChild(div);
};

const mapData = (data) => {
  const lines = data.trim().split("\n");
  const mappedData = lines.map((el) => {
    [first, second, third] = el.split(",");
    const mappedLine = {
      A: first.trim(),
      B: second.trim(),
      C: third.trim(),
    };

    createTableDivWithData(mappedLine);
    return mappedLine;
  });
  return mappedData;
};

const renderOption = (selectTag, dataSets) => {
  dataSets.forEach((value) => {
    const option = new Option(value, value);
    selectTag.add(option);
  });
};

const fillSelect = (data) => {
  const aValues = new Set(data.map((item) => item.A));
  const bValues = new Set(data.map((item) => item.B));
  const cValues = new Set(data.map((item) => item.C));

  renderOption(document.getElementById("select_A"), aValues);
  renderOption(document.getElementById("select_B"), bValues);
  renderOption(document.getElementById("select_C"), cValues);
};

const filterData = (data) => {
  let selectedA = document.getElementById("select_A").value;
  let selectedB = document.getElementById("select_B").value;
  let selectedC = document.getElementById("select_C").value;

  let conditions = {};
  if (selectedA !== "Toate") conditions.A = selectedA;
  if (selectedB !== "Toate") conditions.B = selectedB;
  if (selectedC !== "Toate") conditions.C = selectedC;

 const reuslt = data.filter((item) => {
    for (let key in conditions) {
      if (item[key] !== conditions[key]) {
        return false;
      }
    }
    return true;
  });

  return reuslt;
};

const rerenderContent = (mappedData) => {
  const filteredData = filterData(mappedData);
  const tableDiv = document.getElementById("table");
  tableDiv.innerHTML = "";

  filteredData.forEach(item => {
    createTableDivWithData(item);
  });
};

const addSelectEventAndRender = (mappedData) => {
  const selects = document.querySelectorAll("select");
  selects.forEach((select) => {
    select.addEventListener("change", () => {
      rerenderContent(mappedData);
    });
  });
};



const appInit = async () => {
  const data = await fetchData();
  const mappedData = mapData(data);
  fillSelect(mappedData);

  addSelectEventAndRender(mappedData);

  const resetFiltersAndContent = () => {
    document.getElementById("select_A").value = "Toate";
    document.getElementById("select_B").value = "Toate";
    document.getElementById("select_C").value = "Toate";
    rerenderContent(mappedData); 
  };
  
  document.getElementById("resetButton").addEventListener("click", resetFiltersAndContent);
  
};

document.addEventListener("DOMContentLoaded", appInit);
