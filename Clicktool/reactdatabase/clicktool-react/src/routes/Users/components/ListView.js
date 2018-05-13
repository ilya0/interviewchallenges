import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Grid, Header, Icon, Table, Segment, Button, Input
} from 'semantic-ui-react'

class ListView extends Component {

  static propTypes = {
    users: PropTypes.array.isRequired,
    deleteUser: PropTypes.func.isRequired,
    addUser: PropTypes.func.isRequired
  }

  state = {
    form: {
      id: '',
      name: '',
      url: '' 
    }
  }

  newUser = () => {
    const { form } = this.state
    this.props.addUser(form);
  }

  updateFormInput = (e, { name, value }) => {
    let _form = this.state.form
    _form[name] = value
    this.setState({
      form: _form
    })
  }

  renderList = () => {
    const { users, deleteUser } = this.props
    const rows = users.length ? users.map((user, key) => {
      return (
        <Table.Row key={key} textAlign='center'>
          <Table.Cell>{user.id}</Table.Cell>
          <Table.Cell>{user.name}</Table.Cell>
          <Table.Cell>{user.url}</Table.Cell>

          <Table.Cell>
            <Button onClick={() => deleteUser(key)} icon='delete' />
          </Table.Cell>
        </Table.Row>
      )
    }) : null

    return (
      <div>
        <Table compact celled selectable structured>
          <Table.Header>

            <Table.Row textAlign='center'>
              <Table.HeaderCell rowSpan='2'>ID</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Name</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>URL</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Delete</Table.HeaderCell>
            </Table.Row>

          </Table.Header>
            <Table.Body>{rows}</Table.Body>
        </Table>
      </div>
    )
  }

  render () {
    const { users } = this.props
    const emptyState = (
      <Segment textAlign='center' padded='very'>
        <Header color='blue' as='h3' icon>
          <Icon name='info' />
          item information not available.
        </Header>
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
                  Landers Display below
                </Header.Subheader>
              </Header>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              {users.length ? this.renderList() : emptyState}
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Input type='text' name='id' onChange={this.updateFormInput} value={this.state.form.first} placeholder='ID' />
            <Input type='text' name='name' onChange={this.updateFormInput} value={this.state.form.last} placeholder='Name' />
            <Input type='text' name='url' onChange={this.updateFormInput} value={this.state.form.url} placeholder='URL' />
            <Button color='green' content='Add new Lander' onClick={this.newUser} />
          </Grid.Row>
        </Grid>

      </div>

    )
  }
}

export default ListView
