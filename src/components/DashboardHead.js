import React from "react";
import styled from "styled-components";
import NewFileImg from "../assets/new-file.svg";
import ImportFileImg from "../assets/import-file.svg";
import PlusIcon from "../assets/plus.svg";
import GridIcon from "../assets/grid-icon.svg";
import MenuIcon from "../assets/menu.svg";
import Layout from "../components/Layout/Layout";

const DashboardWrapper = styled.div`
  margin-top: 75px;
`;

const WelComeWrapper = styled.div`
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 180px;
  border-bottom: ${props => props.theme.borderStyleClr};
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

const MediumButton = styled.a`
  color: ${props => props.theme.blue};
  padding: 8px 24px;
  border: 1px solid ${props => props.theme.blue};
  border-radius: 5px;
  font-size: 14px;
  text-decoration: none;
  margin-top: 25px;
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
  img {
    width: 28px;
  }
  p {
    font-size: 16px;
    color: ${props => props.theme.text};
  }
`;

const Recently = styled.div`
  padding: 22px 40px;
  border-bottom: ${props => props.theme.borderStyleClr};
  height: 150px;

  h3 {
    font-size: 20px;
    margin-bottom: 18px;
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
  img {
    cursor: pointer;
    width: 32px;
    height: 32px;
  }
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

const DashboardHead = () => {
  return (
    <Layout>
      <DashboardWrapper>
        <WelComeWrapper>
          <WelComeContent>
            <h4>Welcome</h4>
            <p>If You’re new here we recommend going through the tutorial.</p>
            <p>Otherwise, jump right in and create a project from scratch or from one of our templates.</p>
            <div style={{ marginTop: "32px" }}>
              <MediumButton href="/projects/tutorial">Start Tutorial</MediumButton>
            </div>
          </WelComeContent>
          <NewFileContent>
            <NewFile>
              <a href="/projects/new">
                <NewFilePara>
                  <img src={NewFileImg} alt="NewFileImg" />
                  <p>New file</p>
                </NewFilePara>
              </a>
              <div>
                <img src={PlusIcon} alt="PlusIcon" />
              </div>
            </NewFile>
            <NewFile style={{ marginTop: "24px" }}>
              <NewFilePara>
                <img src={ImportFileImg} alt="NewFileImg" />
                <p>Import file</p>
              </NewFilePara>
              <div>
                <img src={PlusIcon} alt="PlusIcon" />
              </div>
            </NewFile>
          </NewFileContent>
        </WelComeWrapper>

        <Recently>
          <h3>Recently viewed</h3>
          <DropDownContent>
            <DropDown>
              <h4>Filter:</h4>

              <ToolbarInputGroup>
                <select>
                  <option>Select file</option>
                  <option value="allfile" onClick={onSetAll} active={params.filter === "remixable"}>
                    All files
                  </option>
                  <option value="importfile">Design files</option>
                </select>
                {/* <SelectInput styles={selectInputStyles} options={transformPivotOptions} value={FilesOption} /> */}
              </ToolbarInputGroup>
            </DropDown>
            <MenuIcons>
              <div>
                <img src={GridIcon} alt="GridIcon" />
              </div>
              <div>
                <img src={MenuIcon} alt="MenuIcon" />
              </div>
            </MenuIcons>
          </DropDownContent>
        </Recently>
      </DashboardWrapper>
    </Layout>
  );
};

export default DashboardHead;
