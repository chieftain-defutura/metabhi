import React, { useState, useCallback, useEffect } from "react"
import PropTypes from "prop-types"

export const PopupContext = React.createContext()

function getSources(editor) {
  if (!editor) return []
  const isAuthenticated = editor.api.isAuthenticated()
  return editor.sources.filter(source => !source.requiresAuthentication || isAuthenticated)
}

export function PopupContextProvider({ children }) {
  const [editor, setEditor] = useState()
  const [sources, setSources] = useState([])
  const [selectedSource, setSelectedSource] = useState({})
  const [popupToggle, setPopupToggle] = useState(false)

  useEffect(() => {
    if (!editor) return

    const onSetSource = sourceId => {
      setSelectedSource({ src: sources.find(s => s.id === sourceId) })
    }
    const onAuthChanged = () => {
      const nextSources = getSources(editor)
      setSources(nextSources)

      if (nextSources.indexOf(selectedSource) === -1) {
        setSelectedSource({ src: nextSources.length > 0 ? nextSources[0] : null })
      }
    }

    const onSettingsChanged = () => {
      const enableExperimentalFeatures = editor.settings.enableExperimentalFeatures
      const nextSources = getSources(editor).filter(source => !source.experimental || enableExperimentalFeatures)
      setSources(nextSources)
    }

    editor.addListener("settingsChanged", onSettingsChanged)
    editor.addListener("setSource", onSetSource)
    editor.api.addListener("authentication-changed", onAuthChanged)

    return () => {
      editor.removeListener("setSource", onSetSource)
      editor.api.removeListener("authentication-changed", onAuthChanged)
    }
  }, [editor, setSelectedSource, sources, setSources, selectedSource])

  const [savedSourceState, setSavedSourceState] = useState({})

  const setSavedState = useCallback(
    state => {
      setSavedSourceState({
        ...savedSourceState,
        [selectedSource.id]: state
      })
    },
    [selectedSource.id, savedSourceState]
  )

  const savedState = savedSourceState[selectedSource.id] || {}

  useEffect(() => {
    if (editor) {
      setSources(
        getSources(editor).filter(source => !source.experimental || editor.settings.enableExperimentalFeatures)
      )
    }
  }, [editor])

  useEffect(() => {
    if (sources.length) {
      setSelectedSource({ src: sources.length > 0 ? sources[0] : null, toggle: true })
    }
  }, [sources])

  const SourceComponent = selectedSource["src"] && selectedSource.src.component

  return (
    <PopupContext.Provider
      value={{
        setEditor,
        sources,
        setSelectedSource,
        selectedSource,
        popupToggle,
        setPopupToggle,
        setSavedState,
        editor,
        SourceComponent,
        savedState
      }}
    >
      {children}
    </PopupContext.Provider>
  )
}

PopupContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}
