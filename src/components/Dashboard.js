import React, { useState, useCallback, useContext } from "react";
import styled from "styled-components";
import CardGrid from "./CardGrid";
import ListGrid from "./ListGrid";
import { TbMenu2 } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { AiOutlineFileAdd } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { TbFileImport } from "react-icons/tb";
import { ApiContext } from "../ui/contexts/ApiContext";
import { Link } from "react-router-dom";

const DashboardWrapper = styled.div`
  margin-top: 75px;
`;

const WelComeWrapper = styled.div`
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 180px;
  border-bottom: 1px solid ${props => props.theme.borderStyleClr};
`;

const WelComeContent = styled.div`
  h4 {
    font-size: 28px;
    margin-bottom: 12px;
  }
  p {
    font-size: 18px;
    margin-top: 8px;
    line-height: 24px;
    color: ${props => props.theme.lightGray};
  }
`;

const MediumBtn = styled.div`
  a {
    color: ${props => props.theme.blue};
    padding: 8px 24px;
    border: 1px solid ${props => props.theme.blue};
    border-radius: 5px;
    font-size: 14px;
    text-decoration: none;
    margin-top: 25px;
  }
`;

const NewFileContent = styled.div``;

const NewFile = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 150px;
  background: ${props => props.theme.darkClr};
  border: ${props => props.theme.borderFileClr};
  padding: 15px 25px;
  border-radius: 5px;
  cursor: pointer;
  a {
    text-decoration: none;
  }
`;

const NewFilePara = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  white-space: noWrap;

  p {
    font-size: 16px;
    color: ${props => props.theme.text};
  }
`;

const Recently = styled.div`
  padding: 22px 40px;
  border-bottom: 1px solid ${props => props.theme.borderStyleClr};
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    font-size: 20px;
    // margin-bottom: 18px;
  }
`;

const DropDown = styled.div`
  display: flex;
  gap: 12px;

  h4 {
    color: ${props => props.theme.gray};
    font-size: 18px;
    margin-top: 20px;
  }
`;

const DropDownContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const MenuBox = styled.div`
  border: ${props => props.theme.borderFileClr};
  display: flex;
  align-items: center;
  padding: 6px;
  border-radius: 5px;
`;

const ToolbarInputGroup = styled.div`
  margin-top: 20px;

  select {
    border: none;
    outline: none;
    background: transparent;
    color: ${props => props.theme.text};
    width: 115px;
  }
  option {
    background: #000000;
    color: #fff;
    font-size: 17px;
  }
`;

const selectInputStyles = {
  container: base => ({
    ...base,
    width: "128px",
    height: "150px"
  }),
  control: base => ({
    ...base,
    background: "#111111",
    minHeight: "60px",
    borderTopLeftRadius: "0px",
    borderBottomLeftRadius: "0px",
    position: "absolute",
    top: "0px",
    width: "100%",
    borderWidth: "0px",
    cursor: "pointer",
    outline: "none",
    boxShadow: "none",
    padding: "5px 0px"
  })
};

const FilesOption = {
  AllFiles: "All files",
  DesignFiles: "Design files"
};

const transformPivotOptions = [
  { label: "All files", value: FilesOption.AllFiles },
  { label: "Design files", value: FilesOption.DesignFiles }
];

const Dashboard = () => {
  const api = useContext(ApiContext);
  const [gridToggle, setGridToggle] = useState("GridIcon");
  const queryParams = new URLSearchParams(location.search);
  const [isActive, setIsActive] = useState(true);

  const [params, setParams] = useState({
    source: "scene_listings",
    filter: queryParams.get("filter") || "featured-remixable",
    q: queryParams.get("q") || ""
  });

  const updateParams = useCallback(
    nextParams => {
      const search = new URLSearchParams();

      for (const name in nextParams) {
        if (name === "source" || !nextParams[name]) {
          continue;
        }

        search.set(name, nextParams[name]);
      }

      history.push(`/projects/create?${search}`);

      setParams(nextParams);
    },
    [history]
  );

  const onSetAll = useCallback(() => {
    updateParams({
      ...params,
      filter: "remixable",
      q: ""
    });
  }, [updateParams, params]);

  return (
    <>
      <DashboardWrapper>
        <WelComeWrapper>
          <WelComeContent>
            <h4>Welcome</h4>
            <p>If You’re new here we recommend going through the tutorial.</p>
            <p>Otherwise, jump right in and create a project from scratch or from one of our templates.</p>
            <div style={{ marginTop: "32px" }}>
              <MediumBtn>
                <Link to="/projects/tutorial">Start Tutorial</Link>
              </MediumBtn>
            </div>
          </WelComeContent>
          <NewFileContent>
            <NewFile>
              <Link to="/projects/new">
                <NewFilePara>
                  <AiOutlineFileAdd size={28} />
                  <p>New file</p>
                </NewFilePara>
              </Link>
              <div>
                <AiOutlinePlus size={18} />
              </div>
            </NewFile>
            <NewFile style={{ marginTop: "24px" }}>
              <NewFilePara>
                <TbFileImport size={28} />
                <p>Import file</p>
              </NewFilePara>
              <div>
                <AiOutlinePlus size={18} />
              </div>
            </NewFile>
          </NewFileContent>
        </WelComeWrapper>

        <Recently>
          <div>
            <h3>Recently viewed</h3>
          </div>
          <DropDownContent>
            <DropDown>
              {/* <h4>Filter:</h4> */}

              <ToolbarInputGroup>
                {/* <select>
                  <option>Select file</option>
                  <option value="allfile" onClick={onSetAll} active={params.filter === "remixable"}>
                    All files
                  </option>
                  <option value="importfile">Design files</option>
                </select> */}
                {/* <SelectInput styles={selectInputStyles} options={transformPivotOptions} value={FilesOption} /> */}
              </ToolbarInputGroup>
            </DropDown>
            <MenuIcons>
              <div onClick={() => setGridToggle("GridIcon")}>
                <MenuBox
                  onClick={() => setIsActive(!isActive)}
                  style={{ border: isActive ? "1px solid #777777" : "inherit" }}
                >
                  <RxDashboard size={26} />
                </MenuBox>
              </div>
              <div onClick={() => setGridToggle("MenuIcon")}>
                <MenuBox
                  onClick={() => setIsActive(!isActive)}
                  style={{ border: isActive ? "inherit" : "1px solid #777777" }}
                >
                  <TbMenu2 size={26} />
                </MenuBox>
              </div>
            </MenuIcons>
          </DropDownContent>
        </Recently>
      </DashboardWrapper>

      {gridToggle === "GridIcon" && <CardGrid />}
      {gridToggle === "MenuIcon" && <ListGrid />}
    </>
  );
};

export default Dashboard;
