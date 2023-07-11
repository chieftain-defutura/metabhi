// import React from "react"
// import styled from "styled-components"
// import Layout from "../components/Layout/Layout"
// import { TbMenu2 } from "react-icons/tb"
// import { RxDashboard } from "react-icons/rx"
// import { Link } from "react-router-dom"
// import { AiOutlineFileAdd } from "react-icons/ai"
// import { AiOutlinePlus } from "react-icons/ai"
// import { TbFileImport } from "react-icons/tb"

// const DashboardWrapper = styled.div`
//   margin-top: 75px;
// `

// const WelComeWrapper = styled.div`
//   padding: 28px 40px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   gap: 180px;
//   border-bottom: 1px solid ${props => props.theme.borderStyleClr};
// `

// const WelComeContent = styled.div`
//   h4 {
//     font-size: 18px;
//     font-weight: 700;
//     margin-bottom: 8px;
//   }
//   p {
//     font-weight: 400;
//     font-size: 14px;
//     line-height: 21px;
//     color: ${props => props.theme.lightGray};
//   }
// `

// const MediumBtn = styled.div`
//   a {
//     color: ${props => props.theme.blue};
//     padding: 8px 24px;
//     border: 1px solid ${props => props.theme.blue};
//     border-radius: 5px;
//     font-size: 12px;
//     text-decoration: none;
//     margin-top: 25px;
//     font-weight: 700;
//   }
// `

// const NewFileContent = styled.div``

// const NewFile = styled.div`
//   display: flex;
//   justify-content: space-between;
//   gap: 150px;
//   background: ${props => props.theme.darkClr};
//   border: 1px solid ${props => props.theme.borderStyleClr};
//   padding: 15px 25px;
//   border-radius: 5px;
//   cursor: pointer;
//   a {
//     text-decoration: none;
//     &:hover {
//       color: ${props => props.theme.text};
//     }
//   }
//   &:hover {
//     background: rgba(0, 43, 255, 0.1);
//     border: 1px solid rgba(0, 146, 255, 0.2);
//   }
// `

// const NewFilePara = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 12px;
//   white-space: noWrap;

//   img {
//     width: 28px;
//   }
//   p {
//     font-size: 14px;
//     font-weight: 400;
//     color: ${props => props.theme.text};
//   }
// `

// const DropDownContent = styled.div`
//   h3 {
//     font-weight: 500;
//     font-size: 14px;
//     margin-bottom: 12px;
//   }
//   h4 {
//     font-weight: 500;
//     font-size: 14px;
//     color: ${props => props.theme.gray};
//   }
//   p {
//     font-weight: 500;
//     font-size: 14px;
//   }
// `

// const MenuIcons = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   img {
//     cursor: pointer;
//     width: 32px;
//     height: 32px;
//   }
// `

// const RecentlyContent = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 16px 40px;
//   border-bottom: 1px solid ${props => props.theme.borderStyleClr};
// `

// const MenuBox = styled.div``

// const DashboardHead = () => {
//   return (
//     <Layout>
//       <DashboardWrapper>
//         <WelComeWrapper>
//           <WelComeContent>
//             <h4>Welcome</h4>
//             <p>If You’re new here we recommend going through the tutorial.</p>
//             <p>Otherwise, jump right in and create a project from scratch or from one of our templates.</p>
//             <div style={{ marginTop: "32px" }}>
//               <MediumBtn>
//                 <Link to="/projects/tutorial">Start Tutorial</Link>
//               </MediumBtn>
//             </div>
//           </WelComeContent>
//           <NewFileContent>
//             <Link to="/projects/new">
//               <NewFile>
//                 <NewFilePara>
//                   <AiOutlineFileAdd size={24} />
//                   <p>New file</p>
//                 </NewFilePara>
//                 <div>
//                   <AiOutlinePlus size={16} />
//                 </div>
//               </NewFile>
//             </Link>
//             <Link to="/scenes/new">
//               <NewFile style={{ marginTop: "24px" }}>
//                 <NewFilePara>
//                   <TbFileImport size={24} />
//                   <p>Import file</p>
//                 </NewFilePara>
//                 <div>
//                   <AiOutlinePlus size={16} />
//                 </div>
//               </NewFile>
//             </Link>
//           </NewFileContent>
//         </WelComeWrapper>

//         <RecentlyContent>
//           <DropDownContent>
//             <h3>Recently viewed</h3>
//           </DropDownContent>
//           <MenuIcons>
//             <div>
//               <MenuBox>
//                 <RxDashboard size={26} />
//               </MenuBox>
//             </div>
//             <div>
//               <MenuBox>
//                 <TbMenu2 size={26} />
//               </MenuBox>
//             </div>
//           </MenuIcons>
//         </RecentlyContent>
//       </DashboardWrapper>
//     </Layout>
//   )
// }

// export default DashboardHead

import React from "react"

const DashboardHead = () => {
  return <div>DashboardHead</div>
}

export default DashboardHead
