import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { createGlobalStyle } from 'styled-components';

import Editoria from './Editoria/Editoria';
import HHMI from './HHMI/HHMI';

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
  background: #fff;
  color: #535e76;
  border: 1px solid#535E76;
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
  cursor: pointer;
  margin-right: 20px;
  border: none;
  background: #535e76;
  padding: 5px 15px 5px 15px;
  color: #fff;
  ${props => props.isActive && activeStyles}
`;

const Editors = () => {
  const [project, setProject] = useState('editoria');

  const displayProject = () => {
    switch (project) {
      case 'hhmi':
        return <HHMI />;
      case 'ncbi':
        break;
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
