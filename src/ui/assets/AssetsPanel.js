import React, { useContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Column, Row } from "../layout/Flex";
import { List, ListItem } from "../layout/List";
import { EditorContext } from "../contexts/EditorContext";
import AssetDropZone from "./AssetDropZone";

const AssetsPanelContainer = styled(Row)`
  position: relative;
  flex: 1;
  background: ${props => props.theme.grayClr};
  background-color: ${props => props.theme.panel};
  display: block;
`;

const AssetsPanelToolbarContainer = styled.div`
  display: flex;
  min-height: 32px;
  background-color: ${props => props.theme.toolbar};
  align-items: center;
  padding: 0 8px;
  justify-content: space-between;
  border-bottom: 1px solid ${props => props.theme.panel};
`;

export const AssetPanelToolbarContent = styled(Row)`
  flex: 1;
  align-items: flex-end;

  & > * {
    margin-left: 16px;
  }
`;

export function AssetsPanelToolbar({ title, children, ...rest }) {
  return (
    <></>
    // <AssetsPanelToolbarContainer {...rest}>
    //   <AssetPanelToolbarContent>{children}</AssetPanelToolbarContent>
    // </AssetsPanelToolbarContainer>
  );
}

AssetsPanelToolbar.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
};

const Source = styled.div`
  background-color: ${props => props.theme.dropdown};
  position: fixed;
  top: 13%;
  right: 0;
  width: 30%;
  display: flex;
  z-index: 1000;
`;

const AssetsPanelColumn = styled(Column)`
  max-width: 100%;
  border-right: 1px solid ${props => props.theme.border};
  overflow: auto;
`;

export const AssetPanelContentContainer = styled(Row)`
  flex: 1;
  overflow: hidden;
`;

function getSources(editor) {
  const isAuthenticated = editor.api.isAuthenticated();
  return editor.sources.filter(source => !source.requiresAuthentication || isAuthenticated);
}

export default function AssetsPanel() {
  const editor = useContext(EditorContext);

  const [sources, setSources] = useState(
    getSources(editor).filter(source => !source.experimental || editor.settings.enableExperimentalFeatures)
  );
  const [selectedSource, setSelectedSource] = useState({ src: sources.length > 0 ? sources[0] : null, toggle: true });
  const SourceComponent = selectedSource.src && selectedSource.src.component;
  useEffect(() => {
    const onSetSource = sourceId => {
      setSelectedSource({ src: sources.find(s => s.id === sourceId) });
    };
    const onAuthChanged = () => {
      const nextSources = getSources(editor);
      setSources(nextSources);

      if (nextSources.indexOf(selectedSource) === -1) {
        setSelectedSource({ src: nextSources.length > 0 ? nextSources[0] : null });
      }
    };

    const onSettingsChanged = () => {
      const enableExperimentalFeatures = editor.settings.enableExperimentalFeatures;
      const nextSources = getSources(editor).filter(source => !source.experimental || enableExperimentalFeatures);
      setSources(nextSources);
    };

    editor.addListener("settingsChanged", onSettingsChanged);
    editor.addListener("setSource", onSetSource);
    editor.api.addListener("authentication-changed", onAuthChanged);

    return () => {
      editor.removeListener("setSource", onSetSource);
      editor.api.removeListener("authentication-changed", onAuthChanged);
    };
  }, [editor, setSelectedSource, sources, setSources, selectedSource]);

  const [savedSourceState, setSavedSourceState] = useState({});

  const setSavedState = useCallback(
    state => {
      setSavedSourceState({
        ...savedSourceState,
        [selectedSource.id]: state
      });
    },
    [selectedSource, setSavedSourceState, savedSourceState]
  );

  const savedState = savedSourceState[selectedSource.id] || {};

  const [openSavedState, setOpenSavedState] = useState(false);

  return (
    <>
      <AssetsPanelContainer id="assets-panel">
        <Column flex>
          {openSavedState && (
            <Source>
              <h1 onClick={() => setOpenSavedState(false)}>close</h1>
              {SourceComponent && !selectedSource.toggle && (
                <SourceComponent
                  key={selectedSource.id}
                  source={selectedSource.src}
                  editor={editor}
                  savedState={savedState}
                  setSavedState={setSavedState}
                />
              )}
            </Source>
          )}
        </Column>
        <AssetsPanelColumn flex>
          <AssetsPanelToolbar title="Assets" />
          <List onClick={() => setOpenSavedState(true)}>
            {sources.map(source => (
              <ListItem
                key={source.id}
                onClick={() =>
                  setSelectedSource({ toggle: selectedSource.src == source && !selectedSource.toggle, src: source })
                }
                selected={selectedSource.src === source}
              >
                {source.name}
              </ListItem>
            ))}
          </List>
        </AssetsPanelColumn>
        <AssetDropZone />
      </AssetsPanelContainer>
    </>
  );
}
