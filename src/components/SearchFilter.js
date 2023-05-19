import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "../assets/search-icon.png";

const IData = [
  {
    id: 1,
    title: "Leanne Graham",
    minutes: "2 hours ago"
  },
  {
    id: 2,
    title: "Romaguera-Crona",
    minutes: "5 hours ago"
  },
  {
    id: 3,
    title: "Antonette",
    minutes: "6 hours ago"
  },
  {
    id: 4,
    title: "Wisokyburgh",
    minutes: "6 hours ago"
  },
  {
    id: 5,
    title: "Leanne Graham",
    minutes: "7 hours ago"
  },
  {
    id: 6,
    title: "anastasia.net",
    minutes: "8 hours ago"
  }
];

const SearchInput = styled.div`
  width: 100%;
  input {
    border: none;
    outline: none;
    background: transparent;
    color: ${props => props.theme.text};
    width: 100%;
  }
`;

const SearchContainer = styled.div`
  position: relative;
`;

const DropDown = styled.div`
  width: 310px;
  height: auto;
  background: ${props => props.theme.black};
  color: ${props => props.theme.text};
  position: absolute;
  top: 100%;

  ul {
    padding: 8px 22px;
    margin: 6px 0;
    cursor: pointer;
    &:hover {
      background: rgba(0, 146, 255, 0.2);
    }
  }

  li {
    color: ${props => props.theme.text};
    font-size: 16px;
    cursor: pointer;
  }
  p {
    color: ${props => props.theme.lightGray};
    font-size: 14px;
    margin-top: 6px;
  }
`;

const SearchInner = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: ${props => props.theme.black};
  border: 1px solid rgba(119, 119, 119, 0.3);
  border-radius: 5px;
  padding: 14px 16px;
  width: 310px;
`;

const SearchFilter = () => {
  const [value, setValue] = useState("");
  const [openDropDown, setOpenDropDown] = useState(false);

  const onChange = event => {
    setValue(event.target.value);
  };

  const onSearch = searchTerm => {
    setValue(searchTerm);
  };

  return (
    <SearchContainer>
      <SearchInner>
        <img src={SearchIcon} alt="search" onClick={() => onSearch(value)} />

        <SearchInput>
          <input
            type="search"
            value={value}
            placeholder="Search Files"
            onFocus={() => setOpenDropDown(true)}
            onBlur={() => setOpenDropDown(false)}
            onChange={onChange}
          />
        </SearchInput>
      </SearchInner>
      {openDropDown && (
        <DropDown>
          {IData.map(item => (
            <ul key={item.id} onClick={() => onSearch(item.title, item.minutes)}>
              <li>{item.title}</li>
              <p>{item.minutes}</p>
            </ul>
          ))}
        </DropDown>
      )}
    </SearchContainer>
  );
};

export default SearchFilter;
