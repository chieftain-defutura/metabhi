import React from "react";
import PropTypes from "prop-types";
import OnboardingOverlay from "./OnboardingOverlay";
import { Button, SecondaryButton } from "../inputs/Button";
import defaultBackgroundImage from "../../assets/onboarding/default.png";
import WelcomeImg from "../../assets/welcome-page-img.png";
import styled from "styled-components";

const StyledOnboadingDialog = styled.div`
  width: 640px;
  height: 420px;
  background-color: ${props => props.theme.darkClr};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
`;

const LeftContent = styled.div`
  display: flex;
  width: 460px;
  // background-color: #006eff;
  background-size: cover;
  border-top-left-radius: inherit;
  align-items: center;
  // padding: 30px;
  background-image: url(${props => props.backgroundImage});

  img {
    height: 420px;
    width: 460px;
  }

  // video {
  //   border-radius: 6px;
  // }
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  // flex: 1;
  padding: 90px 60px 30px 60px;

  h2 {
    color: ${props => props.theme.text2};
    font-size: 14px;
    text-align: center;
    margin-bottom: 4px;
  }

  h1 {
    font-weight: 700;
    font-size: 24px;
    text-align: center;
    margin-bottom: 16px;
  }

  p {
    line-height: 20px;
    font-size: 14px;
    text-align: center;
  }

  img {
    align-self: center;
    margin-bottom: 8px;
  }
`;

const BottomNav = styled.div`
  // display: flex;
  // height: 64px;
  // flex-direction: row;
  // justify-content: flex-end;
  // align-items: center;
  // background-color: black;
  // border-bottom-left-radius: inherit;
  // border-bottom-right-radius: inherit;
  // padding: 8px;
  margin-top: 44px;

  button {
    width: 84px;
  }

  & > * {
    margin: 0 8px;
  }
`;

const SkipBtn = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  a {
    padding: 8px 32px;
    color: ${props => props.theme.text};
    background: linear-gradient(92.34deg, #002bff -0.06%, #0092ff 99.94%);
    border-radius: 5px;
    text-decoration: none;
  }
`;

const Buttons = styled.div`
  .next-btn {
    width: 130px;
    margin: 0 auto;
  }
`;

export default function OnboardingDialog({
  children,
  backgroundImage,
  videoSrc,
  steps,
  curStepIdx,
  prevStep,
  disablePrev,
  nextStep,
  disableNext,
  disableSkip,
  skip
}) {
  return (
    <OnboardingOverlay>
      <StyledOnboadingDialog>
        <Content>
          <LeftContent backgroundImage={backgroundImage || defaultBackgroundImage}>
            <img src={WelcomeImg} alt="welcome-img" />
            {/* {videoSrc && <video src={videoSrc} loop autoPlay muted />} */}
          </LeftContent>
          <RightContent>
            {children}

            <BottomNav>
              {!disableSkip && (
                <SkipBtn>
                  <a
                    href=""
                    onClick={e => {
                      e.preventDefault();
                      e.target.blur();
                      skip();
                    }}
                  >
                    Skip Tutorial
                  </a>
                </SkipBtn>
              )}
              <Buttons>
                {!disablePrev && curStepIdx > 0 && <SecondaryButton onClick={prevStep}>Back</SecondaryButton>}
                {!disableNext && curStepIdx < steps.length - 1 && (
                  <Button onClick={nextStep} className="next-btn">
                    Next
                  </Button>
                )}
                {!disableNext && curStepIdx === steps.length - 1 && <Button onClick={nextStep}>Finish</Button>}
              </Buttons>
            </BottomNav>
          </RightContent>
        </Content>
      </StyledOnboadingDialog>
    </OnboardingOverlay>
  );
}

OnboardingDialog.propTypes = {
  children: PropTypes.node,
  backgroundImage: PropTypes.string,
  videoSrc: PropTypes.string,
  steps: PropTypes.array.isRequired,
  curStepIdx: PropTypes.number.isRequired,
  nextStep: PropTypes.func.isRequired,
  disableNext: PropTypes.bool,
  prevStep: PropTypes.func.isRequired,
  disablePrev: PropTypes.bool,
  disableSkip: PropTypes.bool,
  skip: PropTypes.func.isRequired
};
