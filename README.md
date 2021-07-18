# caida-components-library

> 

[![NPM](https://img.shields.io/npm/v/caida-components-library.svg)](https://www.npmjs.com/package/caida-components-library) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save caida-components-library
```

## Usage

# **Searchbar Component**

This component renders an HTML `<input/>` searchbar with real-time search results displayed as user types. Allows user to click a search result, which can then trigger further interaction as defined by parent component.

### Required Props:
```
  placeholder= string for input label and placeholder text.
  getData= Function for retrieving data to display as search results.
  searchResults= a list of objects that return from the api call which match the current search query value.
  itemPropertyName= Key in array of data for sorting and displaying search results provided as string (can provide nested values using ["key"] syntax).
  handleResultClick= Function for determining what happens when user clicks a search result.
  handleQueryUpdate= Resets searchbar after a selection is made.
```

Styles are overridable from local stylesheet.

### Sample Parent Component Call

The lifecycle function code (constructor with state definitions, componentDidMount, componentWillUnmount) that exists in this example needs to be included in the parent component for the Searchbar to function correctly. 
In the getData function, nextProps must be passed as a parameter as this represents the user's search query.

```
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
```


## License

MIT [](https://github.com/)
