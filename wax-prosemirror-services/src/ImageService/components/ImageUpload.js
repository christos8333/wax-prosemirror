/* eslint react/prop-types: 0 */
import React, { useContext, useRef, useMemo } from 'react'
import { TextSelection } from 'prosemirror-state'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import {
  WaxContext,
  ApplicationContext,
  DocumentHelpers,
  MenuButton,
} from 'wax-prosemirror-core'
import styled from 'styled-components'
import insertImage from './Upload'

const Wrapper = styled.div`
  input {
    display: none;
  }
`

const ImageUpload = ({ item, fileUpload, view }) => {
  const { t, i18n } = useTranslation()
  const { title } = item
  const { app } = useContext(ApplicationContext)
  const context = useContext(WaxContext)

  const {
    activeView,
    activeViewId,
    pmViews: { main },
  } = context

  const isEditable = main.props.editable(editable => {
    return editable
  })

  const inputRef = useRef(null)
  const placeholderPlugin = app.PmPlugins.get('imagePlaceHolder')
  const imageServiceConfig = app.config.get('config.ImageService')

  const handleMouseDown = async e => {
    e.preventDefault()

    if (activeViewId && activeViewId !== 'main') {
      const allNodes = DocumentHelpers.findBlockNodes(view.state.doc)
      let nodeFound = ''
      allNodes.forEach(node => {
        if (node.node.attrs.id === activeViewId) {
          nodeFound = node
        }
      })
      main.dispatch(
        main.state.tr
          .setMeta('outsideView', activeViewId)
          .setSelection(
            new TextSelection(
              main.state.tr.doc.resolve(
                nodeFound.pos +
                  1 +
                  context.pmViews[activeViewId].state.selection.to,
              ),
            ),
          ),
      )
    }

    if (imageServiceConfig && imageServiceConfig.handleAssetManager) {
      await insertThroughFileMAnager()
    } else {
      inputRef.current.click()
    }
  }

  async function insertThroughFileMAnager() {
    const handler = imageServiceConfig.handleAssetManager
    const urls = await handler()
    insertImage(urls, view, placeholderPlugin)
  }

  const isDisabled =
    context.options.uploading || !item.select(activeView) || !isEditable

  const onChangeFileManager = async e => {
    const file = e.target.files[0]
    if (!file) return

    context.setOption({ uploading: true })

    try {
      await fileUpload(file)
    } finally {
      context.setOption({ uploading: false })
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const onChange = e => {
    e.preventDefault()
    fileUpload(e.target.files[0])
    context.setOption({ uploading: true })
    if (inputRef.current) inputRef.current.value = ''
  }

  const ImageUploadComponent = useMemo(
    () => (
      <Wrapper>
        <label htmlFor="file-upload">
          <MenuButton
            active={false}
            disabled={isDisabled}
            iconName={item.icon}
            onMouseDown={handleMouseDown}
            title={
              !isEmpty(i18n) && i18n.exists(`Wax.Images.${title}`)
                ? t(`Wax.Images.${title}`)
                : title
            }
          />

          <input
            accept="image/*"
            id="file-upload"
            onChange={
              imageServiceConfig && imageServiceConfig.handleAssetManager
                ? onChangeFileManager
                : onChange
            }
            // ref={inputRef}
            ref={el => {
              inputRef.current = el
            }}
            type="file"
          />
        </label>
      </Wrapper>
    ),
    [isDisabled, activeViewId, t(`Wax.Images.${title}`)],
  )

  return ImageUploadComponent
}

export default ImageUpload
