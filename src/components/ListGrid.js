import React from "react";
import styled from "styled-components";
import Star from "../assets/star.svg";

const IListCard = [
  {
    starIcon: Star,
    unknown: "Unknown",
    minutes: "1 minute ago"
  },
  {
    starIcon: Star,
    unknown: "Unknown",
    minutes: "1 minute ago"
  },
  {
    starIcon: Star,
    unknown: "Unknown",
    minutes: "1 minute ago"
  }
];

const ListGridWrapper = styled.div`
  margin: 24px 40px;
`;

const ListGridHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 120px;
  h5 {
    font-size: 18px;
    margin-bottom: 24px;
  }
`;

const ListGridContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
`;

const ListGridContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  img {
    width: 24px;
    height: 24px;
  }
  p {
    font-size: 16px;
    color: ${props => props.theme.lightGray};
  }
`;

const Profile = styled.div`
  width: 24px;
  height: 24px;
  background: ${props => props.theme.text};
  border-radius: 2px;
`;

const Minutes = styled.div`
  display: flex;
  align-items: center;
  gap: 100px;
  p {
    font-size: 16px;
    color: ${props => props.theme.lightGray};
  }
`;

const Circle = styled.div`
  width: 24px;
  height: 24px;
  background: #f6851b;
  border-radius: 50%;
`;

const ListGrid = () => {
  return (
    <ListGridWrapper>
      <ListGridHead>
        <h5>Files name</h5>
        <h5>Last viewed</h5>
      </ListGridHead>
      {IListCard.map((f, index) => {
        return (
          <ListGridContainer key={index}>
            <ListGridContent>
              <img src={f.starIcon} alt="star" />
              <Profile></Profile>
              <p>{f.unknown}</p>
            </ListGridContent>
            <Minutes>
              <p>{f.minutes}</p>
              <Circle></Circle>
            </Minutes>
          </ListGridContainer>
        );
      })}
    </ListGridWrapper>
  );
};

export default ListGrid;
