import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { createGlobalStyle } from 'styled-components';

import Editoria from './Editoria/Editoria';
import HHMI from './HHMI/HHMI';
import NCBI from './NCBI/NCBI';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    overflow-y: hidden;
    padding: 0;
  }

  #root {
    height:100vh;
    width:100vw;
  }
`;

const activeStyles = css`
  background: #535e76;
  color: #fff;
  padding: 5px 15px 5px 15px;
`;

const ProjectContainer = styled.div`
  display: flex;
  height: calc(100% - 65px);
`;

const ChooseProject = styled.div`
  background: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 60px;

  span {
    margin-right: 20px;
  }
`;

const Projects = styled.div`
  margin-left: 10px;

  span {
    font-size: 16px;
  }
`;

const ProjectButton = styled.button`
  border: 1px solid #535e76;
  cursor: pointer;
  color: #535e76;
  margin-right: 20px;
  background: #fff;
  padding: 4px 14px 4px 14px;
  ${props => props.isActive && activeStyles}
`;

const Editors = () => {
  const [project, setProject] = useState('editoria');

  const displayProject = () => {
    switch (project) {
      case 'hhmi':
        return <HHMI />;
      case 'ncbi':
        return <NCBI />;
      default:
        return <Editoria />;
    }
  };

  return (
    <>
      <GlobalStyle />
      <ChooseProject>
        <Projects>
          <span>Select Project:</span>
          <ProjectButton
            isActive={project === 'editoria'}
            onClick={() => setProject('editoria')}
          >
            Editoria
          </ProjectButton>
          <ProjectButton
            isActive={project === 'hhmi'}
            onClick={() => setProject('hhmi')}
          >
            Widget Example
          </ProjectButton>
          <ProjectButton
            isActive={project === 'ncbi'}
            onClick={() => setProject('ncbi')}
          >
            NCBI
          </ProjectButton>
        </Projects>
      </ChooseProject>
      <ProjectContainer>{displayProject()}</ProjectContainer>
    </>
  );
};

export default Editors;
