import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { goTo } from 'utils/location'
import { colorMap } from 'utils/cvss'
import {
  Grid, Header, Icon, Loader, Dimmer, Table, Segment, Image, Label
} from 'semantic-ui-react'

class ListView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItem: '0',
      activeVuln: '0'
    }
  }

  static propTypes = {
    items: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    // initData: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { items, loading } = this.props
    if (!items.count() && !loading) {
      // call fetch data e.g. initData()
    }
  }

  renderRow = (v, k) => {
    const details = v.get('details').toJS()
    const cvss2Base = Math.round(v.getIn(['details', 'item_vuln_average_cvss2']))
    const cvss2Pred = Math.round(v.getIn(['details', 'item_average_pred_cvss2']))
    const cvss3Base = Math.round(v.getIn(['details', 'item_vuln_average_cvss3']))
    const cvss3Pred = Math.round(v.getIn(['details', 'item_average_pred_cvss3']))
    const name = details.netbios_name.toLowerCase() || details.itemname.split('.')[0] || null
    const nameProps = name
      ? { content: name }
      : { warning: true, icon: 'attention', content: 'itemname & NetBIOS Name Unavailable' }
    return (
      <Table.Row textAlign='center' style={{ cursor: 'pointer' }} key={k} onClick={() => goTo(`/orci/item/${k}`)}>
        <Table.Cell>{v.get('ip')}</Table.Cell>
        <Table.Cell {...nameProps} />
        <Table.Cell>{v.get('vulnerabilities').count()}</Table.Cell>
        <Table.Cell>
          <Label color={colorMap(cvss2Base, 2)}>{cvss2Base}</Label>
        </Table.Cell>
        <Table.Cell>
          <Label color={colorMap(cvss2Pred, 2)}>{cvss2Pred}</Label>
        </Table.Cell>
        <Table.Cell>
          <Label color={colorMap(cvss3Base, 3)}>{cvss3Base}</Label>
        </Table.Cell>
        <Table.Cell>
          <Label color={colorMap(cvss3Pred, 3)}>{cvss3Pred}</Label>
        </Table.Cell>
      </Table.Row>
    )
  }

  renderTable = () => {
    const { items } = this.props
    const rows = items.count() ? items.map(this.renderRow) : null
    return (
      <div>
        <Table compact celled selectable structured>
          <Table.Header>
            <Table.Row textAlign='center'>
              <Table.HeaderCell rowSpan='2'>IP</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Name</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Vulnerabilities</Table.HeaderCell>
              <Table.HeaderCell colSpan='2'>CVSS 2 Avg Score</Table.HeaderCell>
              <Table.HeaderCell colSpan='2'>CVSS 3 Avg Score</Table.HeaderCell>
            </Table.Row>
            <Table.Row textAlign='center'>
              <Table.HeaderCell>Base</Table.HeaderCell>
              <Table.HeaderCell>Predicted</Table.HeaderCell>
              <Table.HeaderCell>Base</Table.HeaderCell>
              <Table.HeaderCell>Predicted</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{rows}</Table.Body>
        </Table>
      </div>
    )
  }

  render () {
    const { items, loading } = this.props
    const emptyState = (
      <Segment textAlign='center' padded='very'>
        <Header color='blue' as='h3' icon>
          <Icon name='info' />
          item information not available.
        </Header>
      </Segment>
    )
    const loader = (
      <Segment>
        <Dimmer active inverted>
          <Loader size='large'>Loading</Loader>
        </Dimmer>
        <Image src='/assets/images/paragraph.png' />
      </Segment>
    )
    return (
      <div>
        <Grid columns={1}>
          <Grid.Row>
            <Grid.Column>
              <Header as='h1'>
                Clicktool Database table
                <Header.Subheader>
                  Click to Delete
                </Header.Subheader>
              </Header>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              {!loading && items.count() ? this.renderTable() : null}
              {loading && loader}
              {!loading && !items.count() && emptyState}
            </Grid.Column>
          </Grid.Row>
        </Grid>

      </div>

    )
  }
}

export default ListView
