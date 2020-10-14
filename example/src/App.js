import React, { Component } from 'react'

import {Searchbar} from 'caida-components-library'
// Only necessary for specific example:
// import { browserHistory } from 'react-router'
// import axios from 'axios'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mounted: false,
      searchResults: null
    }
  }

  componentDidMount() {
    this.setState({ mounted: true })
  }

  componentWillUnmount() {
    this.setState({ mounted: false })
  }

  // Retrieve Data from somewhere, capture search result array in state
  getData = (nextProps) => {
    if (this.state.mounted) {
      // Set searchTerm to the value of nextProps, nextProps refers to the current search string value in the field.
      this.setState({ searchTerm: nextProps })
      // Update URL to desired API Endpoint
      axios.get(`https://test.ioda.caida.org/metadata/search/asn?name=${nextProps}&limit=11`)
        .then(res => {
          // Update searchResults state value to array of data for search results. Adjust res.data.data.metadata as necessary.
          this.setState({ searchResults: res.data.data.metadata })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  // Define what happens when user clicks entry. This example redirects user to a new page.
  // note: Shouldn't use window object for redirects and should instead use browser history or context as to not refresh the entire website.
  handleResultClick = (query) => {
    // browserHistory.push(`/ioda/dashboard#view=inspect&entity=${event.target.value}&last-view=overview`)
    window.location.href = `https://test.ioda.caida.org/ioda/dashboard#view=inspect&entity=${query}&last-view=overview`
  }

  // Reset searchbar when a selection is made, no customizations needed here.
  handleQueryUpdate = (query) => {
    this.forceUpdate()
    this.setState({
      searchTerm: query
    })
  }

  render () {
    return (
      <div>
        <Searchbar placeholder={'input label'}
          getData={this.getData}
          itemPropertyName={'name'}
          handleResultClick={this.handleResultClick}
          searchResults={this.state.searchResults}
          handleQueryUpdate={this.handleQueryUpdate}
        />
      </div>
    )
  }
}
