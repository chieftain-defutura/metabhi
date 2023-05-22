import React from "react";
import styled from "styled-components";
import { AiOutlineStar } from "react-icons/ai";
import PenFile from "../assets/pen-file-svg.png";

const ICardGrid = [
  {
    image: PenFile,
    unTitle: "UnTitle",
    editName: "Edit Name"
  },
  {
    image: PenFile,
    unTitle: "UnTitle",
    editName: "Edit Name"
  },
  {
    image: PenFile,
    unTitle: "UnTitle",
    editName: "Edit Name"
  },
  {
    image: PenFile,
    unTitle: "UnTitle",
    editName: "Edit Name"
  },
  {
    image: PenFile,
    unTitle: "UnTitle",
    editName: "Edit Name"
  },
  {
    image: PenFile,
    unTitle: "UnTitle",
    editName: "Edit Name"
  },
  {
    image: PenFile,
    unTitle: "UnTitle",
    editName: "Edit Name"
  },
  {
    image: PenFile,
    unTitle: "UnTitle",
    editName: "Edit Name"
  },
  {
    image: PenFile,
    unTitle: "UnTitle",
    editName: "Edit Name"
  },
  {
    image: PenFile,
    unTitle: "UnTitle",
    editName: "Edit Name"
  }
];

const CardGridWrapper = styled.div`
  padding: 24px 40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 28px;
`;

const GridContent = styled.div`
  background: ${props => props.theme.grayClr};
  border: 1px solid ${props => props.theme.borderFileClr};
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    box-shadow: rgba(69, 68, 68, 0.3) 0px 8px 24px;
  }
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
    font-weight: 700;
  }
  p {
    margin-top: 2px;
    font-size: 12px;
    font-weight: 400;
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
                <AiOutlineStar size={18} />
              </Profile>
            </CardGridUnTitle>
          </GridContent>
        );
      })}
    </CardGridWrapper>
  );
};

export default CardGrid;
