import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Tabs, Tab } from './styled'
// material-ui-icons
import LayersIcon from '@material-ui/icons/Layers'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

/**
 * @component
 * @category Layer Panel
 * @example ./example.md
 */
class LayerPanel extends Component {
  constructor (props) {
    super(props)

    this.state = {
      activeIndex: false,
      showLayerPanel: false
    }
  }

  handleChange = (_, activeIndex) => {
    const { showLayerPanel } = this.state

    // the first time through the idx is 0 so we need to add 1
    if (activeIndex === 0) {
      this.setState({ showLayerPanel: !this.state.showLayerPanel, activeIndex: showLayerPanel ? false : 1 })
    } else {
      this.setState({ activeIndex })
    }
  }

  render () {
    const { inline, children } = this.props
    const { activeIndex, showLayerPanel } = this.state

    return (
      <Card open={showLayerPanel} numOfTabs={children.length || 1} inline={inline} className='_popup_boundary' >
        <Tabs open={showLayerPanel} value={activeIndex} onChange={this.handleChange} >
          <Tab icon={showLayerPanel ? <ChevronRightIcon /> : <LayersIcon />} />
          {showLayerPanel &&
            React.Children.map(children, (child, i) => {
              if (child) return <Tab key={i} icon={child.props.tabIcon} />
            })
          }
        </Tabs>
        {React.Children.toArray(children)[activeIndex - 1]}
      </Card>
    )
  }
}

LayerPanel.propTypes = {
  /** An array of openlayers layers */
  layers: PropTypes.array,

  /** Render the component inline (without absolute positioning) */
  inline: PropTypes.bool,

  /** The content of the layer panel (likely a set of `LayerPanelPage` components) */
  children: PropTypes.node.isRequired,

  /** An object of styles spread on the layerpanel */
  style: PropTypes.object
}

export default LayerPanel