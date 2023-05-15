import React from "react";
import styled from "styled-components";
import Star from "../assets/star.svg";
import PenFile from "../assets/pen-file-svg.png";

const ICardGrid = [
  {
    image: PenFile,
    unTitle: "UnTitle",
    editName: "Edit Name",
    star: Star
  },
  {
    image: PenFile,
    unTitle: "UnTitle",
    editName: "Edit Name",
    star: Star
  },
  {
    image: PenFile,
    unTitle: "UnTitle",
    editName: "Edit Name",
    star: Star
  },
  {
    image: PenFile,
    unTitle: "UnTitle",
    editName: "Edit Name",
    star: Star
  },
  {
    image: PenFile,
    unTitle: "UnTitle",
    editName: "Edit Name",
    star: Star
  }
];

const CardGridWrapper = styled.div`
  margin: 24px 40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  height: 500px;
  overflow-x: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.scrollbarClr};
    border-radius: 50px;
  }
`;

const GridContent = styled.div`
  background: ${props => props.theme.grayClr};
  border: ${props => props.theme.borderFileClr};
  border-radius: 5px;
  width: 264px;
`;

const CardGridBox = styled.div`
  height: 160px;
  background: ${props => props.theme.emptyBoxClr};
`;

const CardGridUnTitle = styled.div`
  background: ${props => props.theme.darkGray};
  padding: 12px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardGridName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  img {
    width: 24px;
    height: 24px;
  }
  h5 {
    font-size: 14px;
  }
  p {
    margin-top: 2px;
    font-size: 12px;
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Circle = styled.div`
  background: ${props => props.theme.profileClr};
  width: 28px;
  height: 28px;
  border-radius: 50%;
`;

const CardGrid = () => {
  return (
    <CardGridWrapper>
      {ICardGrid.map((f, index) => {
        return (
          <GridContent key={index}>
            <CardGridBox></CardGridBox>
            <CardGridUnTitle>
              <CardGridName>
                <div>
                  <img src={f.image} alt="penFile" />
                </div>
                <div>
                  <h5>{f.unTitle}</h5>
                  <p>{f.editName}</p>
                </div>
              </CardGridName>
              <Profile>
                <Circle></Circle>
                <img src={f.star} alt="star" />
              </Profile>
            </CardGridUnTitle>
          </GridContent>
        );
      })}
    </CardGridWrapper>
  );
};

export default CardGrid;
