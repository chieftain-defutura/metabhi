// import React from "react";
// import PlusIcon from "../assets/plus.svg";
// import NewFileImg from "../assets/new-file.svg";
// import StarIcon from "../assets/star.svg";
// import styled from "styled-components";

// const IDemoTemplate = [
//   {
//     image: "1",
//     newFileIcon: "",
//     unTitle: "",
//     editTime: "",
//     starIcon: ""
//   },
//   {
//     image: "2",
//     newFileIcon: "",
//     unTitle: "",
//     editTime: "",
//     starIcon: ""
//   },
//   {
//     image: "3",
//     newFileIcon: "",
//     unTitle: "",
//     editTime: "",
//     starIcon: ""
//   },
//   {
//     image: "4",
//     newFileIcon: "",
//     unTitle: "",
//     editTime: "",
//     starIcon: ""
//   }
// ];

// const ProjectTemplate = styled.div`
//   width: 225px;
//   margin: 26px 40px;
// `;

// const TemplateBox = styled.div`
//   background: ${props => props.theme.lightDarkClr};
//   border: 1px solid #252525;
//   border-radius: 5px;
// `;

// const Plus = styled.div`
//   padding: 44px 96px;
//   img {
//     width: 32px;
//     height: 32px;
//   }
// `;

// const UnTitleContent = styled.div`
//   background: ${props => props.theme.darkGray};
//   display: flex;
//   justify-content: space-between;
//   padding: 12px 20px;
// `;

// const Untitle = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 12px;
//   h4 {
//     font-size: 14px;
//     margin-bottom: 2px;
//   }
// `;

// const UntitleProfile = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   img {
//     width: 18px;
//     height: 18px;
//   }
// `;

// const Circle = styled.div`
//   width: 28px;
//   height: 28px;
//   background: #dddddd;
//   border-radius: 50%;
// `;

// const CardTemplate = () => {
//   return (
//     <ProjectTemplate>
//       <TemplateBox>
//         <Plus>
//           <img src={PlusIcon} alt="Plus" />
//         </Plus>
//         <UnTitleContent>
//           <Untitle>
//             <div>
//               <img src={NewFileImg} alt="NewFileImg" />
//             </div>
//             <div>
//               <h4>Untitle</h4>
//               <p>Edit time </p>
//             </div>
//           </Untitle>
//           <UntitleProfile>
//             <Circle></Circle>
//             <img src={StarIcon} alt="star" />
//           </UntitleProfile>
//         </UnTitleContent>
//       </TemplateBox>
//     </ProjectTemplate>
//   );
// };

// export default CardTemplate;

import React, { useContext, useState, useCallback } from "react";
import {
  ProjectGridContainer,
  ProjectGridContent,
  ErrorMessage,
  ProjectGrid,
  Filter
} from "../ui/projects/ProjectGrid";
import ScrollToTop from "../ui/router/ScrollToTop";
import InfiniteScroll from "react-infinite-scroller";
import usePaginatedSearch from "../ui/projects/usePaginatedSearch";
import { ApiContext } from "../ui/contexts/ApiContext";
import styled from "styled-components";
import NewFileImg from "../assets/new-file.svg";
import ImportFileImg from "../assets/import-file.svg";
import { AiOutlinePlus } from "react-icons/ai";
import { TbMenu2 } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import PropTypes from "prop-types";
import CardGrid from "./CardGrid";
import ListGrid from "./ListGrid";
import { Link } from "react-router-dom";

const ProjectTemplateCards = styled.div`
  height: 500px;
  overflow-x: hidden;
  overflow-y: scroll;
  padding-bottom: 32px;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.scrollbarClr};
    border-radius: 50px;
  }
`;
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
  border: 1px solid ${props => props.theme.borderFileClr};
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
  border-bottom: 1px solid ${props => props.theme.borderStyleClr};
  height: 150px;

  h3 {
    font-size: 20px;
    margin-bottom: 18px;
  }
`;
const DropDown = styled.div`
  display: flex;
  align-items: center;
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
const MenuBox = styled.div`
  border: ${props => props.theme.borderFileClr};
  display: flex;
  align-items: center;
  padding: 6px;
  border-radius: 5px;
`;

export default function CardTemplate({ history, location }) {
  const api = useContext(ApiContext);
  const [isActive, setIsActive] = useState(true);
  const [gridToggle, setGridToggle] = useState("");

  const queryParams = new URLSearchParams(location.search);

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

      history.push(`/dashboard/template?${search}`);

      setParams(nextParams);
    },
    [history]
  );

  const onChangeQuery = useCallback(
    value => {
      updateParams({
        source: "scene_listings",
        filter: "remixable",
        q: value
      });
    },
    [updateParams]
  );

  const onSetFeaturedRemixable = useCallback(() => {
    updateParams({
      ...params,
      filter: "featured-remixable",
      q: ""
    });
  }, [updateParams, params]);

  const onSetAll = useCallback(() => {
    updateParams({
      ...params,
      filter: "remixable",
      q: ""
    });
  }, [updateParams, params]);

  const onSelectScene = useCallback(
    scene => {
      const search = new URLSearchParams();
      search.set("sceneId", scene.id);
      history.push(`/dashboard/template?${search}`);
    },
    [history]
  );

  const { loading, error, entries, hasMore, loadMore } = usePaginatedSearch(
    `${api.apiURL}/api/v1/media/search`,
    params
  );

  const filteredEntries = entries.map(result => ({
    ...result,
    url: `/dashboard/template?sceneId=${result.id}`,
    thumbnail_url: result && result.images && result.images.preview && result.images.preview.url
  }));
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
                  <img src={NewFileImg} alt="NewFileImg" />
                  <p>New file</p>
                </NewFilePara>
              </Link>
              <div>
                <AiOutlinePlus size={22} />
              </div>
            </NewFile>
            <NewFile style={{ marginTop: "24px" }}>
              <NewFilePara>
                <img src={ImportFileImg} alt="NewFileImg" />
                <p>Import file</p>
              </NewFilePara>
              <div>
                <AiOutlinePlus size={22} />
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
                <Filter onClick={onSetAll} active={params.filter === "remixable"}>
                  All
                </Filter>
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
                  // onClick={() => setIsActive(!isActive)}
                  style={{ border: gridToggle === "GridIcon" ? "1px solid #777777" : "inherit" }}
                >
                  <RxDashboard size={26} />
                </MenuBox>
              </div>
              <div onClick={() => setGridToggle("MenuIcon")}>
                <MenuBox
                  // onClick={() => setIsActive(!isActive)}
                  style={{ border: gridToggle !== "MenuIcon" ? "inherit" : "1px solid #777777" }}
                >
                  <TbMenu2 size={26} />
                </MenuBox>
              </div>
            </MenuIcons>
          </DropDownContent>
        </Recently>
      </DashboardWrapper>

      <div>
        {gridToggle === "GridIcon" && <CardGrid />}
        {gridToggle === "MenuIcon" && <ListGrid />}
        {gridToggle === "" && (
          <ProjectGridContainer>
            <ProjectTemplateCards>
              <ProjectGridContent>
                <ScrollToTop />
                {error && <ErrorMessage>{error.message}</ErrorMessage>}
                {!error && (
                  <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={loadMore}
                    hasMore={hasMore}
                    threshold={100}
                    useWindow={true}
                  >
                    <ProjectGrid
                      projects={filteredEntries}
                      newProjectPath="/dashboard/template"
                      newProjectLabel="New Empty Project"
                      onSelectProject={onSelectScene}
                      loading={loading}
                    />
                  </InfiniteScroll>
                )}
              </ProjectGridContent>
            </ProjectTemplateCards>
          </ProjectGridContainer>
        )}
      </div>
    </>
  );
}

CardTemplate.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};
