import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css, StyleSheet } from 'aphrodite-jss'

/* Props Required:
  placeholder= string for input label and placeholder text.
  getData= Function for retrieving data to display as search results.
  itemPropertyName= Key in array of data for sorting and displaying search results provided as string (can provide nested values using [""] syntax).
  handleResultClick= Function for determining what happens when user clicks a search result.
  searchResults= Array of data to populate search results.
  handleQueryUpdate= Resets searchbar after a selection is made.
*/

let styles
styles = StyleSheet.create({
  search: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: '20px 0 0',
    padding: '0',
    height: 'auto'
  },

  searchbar: {
    display: 'flex'
  },

  searchInput: {
    width: '100%',
    borderRadius: '5px',
    border: '2px solid #DCE4EB',
    position: 'relative',
    height: '45px',
    lineHeight: '45px',
    paddingLeft: '5px',
    boxSizing: 'border-box',
    zIndex: '2',
    color: '#2c3e50',
    fontSize: '14px',
    '&:focus': {
      boxShadow: '0 2px 4px #ccc'
    },
    '&:focus ~ label': {
      opacity: '1',
      marginTop: '-15px'
    },
    '&:not(:placeholder-shown) ~ label': {
      opacity: '1',
      marginTop: '-15px'
    }
  },

  searchButton: {
    width: '140px',
    height: '45px',
    backgroundColor: '#DCE4EB',
    borderRadius: '3px',
    marginLeft: '5px',
    border: 'none',
    textTransform: 'uppercase'
  },

  searchLabel: {
    fontSize: '11px',
    opacity: '0',
    position: 'absolute',
    marginTop: '10px',
    transition: '0.3s ease all',
    left: '0',
    zIndex: '1'
  },

  searchResults: {
    width: '100%',
    maxHeight: '350px',
    overflowY: 'auto',
    border: '1px solid #DCE4EB',
    borderRadius: '5px',
    top: '45px',
    position: 'absolute',
    backgroundColor: '#fff',
    zIndex: '10',
    display: 'none'
  },

  searchLoading: {
    padding: '3px',
    boxSizing: 'border-box'
  },

  searchResultsVisible: {
    display: 'block',
    boxShadow: '0 1px 3px 0 rgba(153, 153, 153, .75)',
    position: 'absolute',
    zIndex: '999',
    width: '100%',
    top: '45px',
    backgroundColor: '#f0f0f0',
    borderRadius: '3px'
  },

  searchResultsList: {
    listStyleType: 'none',
    paddingLeft: '0',
    marginBottom: '0',
    position: 'relative',
    margin: '0 0 0 5px'
  },

  searchResultsListItem: {
    boxSizing: 'border-box',
    minHeight: '30px',
    display: 'flex',
    alignItems: 'center',
    '&:nth-of-type(odd)': {
      backgroundColor: '#f9f9f9'
    },
    '&:not(:last-child)': {
      borderBottom: '1px solid #DCE4EB'
    },
    '&:hover': {
      backgroundColor: '#DCE4EB',
      fontWeight: '700',
      position: 'relative',
      '&:after': {
        content: '"GO »"',
        fontSize: '12px',
        color: '#fff',
        backgroundColor: '#D76B35',
        height: '20px',
        width: '40px',
        position: 'absolute',
        right: '10px',
        top: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '4px',
        pointerEvents: 'none'
      }
    }
  },

  searchResultsListItemActive: {
    boxSizing: 'border-box',
    minHeight: '30px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#DCE4EB',
    position: 'relative',
    fontWeight: '700',
    '&:not(:last-child)': {
      borderBottom: '1px solid #DCE4EB'
    },
    '&:after': {
      content: '"GO »"',
      fontSize: '12px',
      color: '#fff',
      backgroundColor: '#D76B35',
      height: '20px',
      width: '40px',
      position: 'absolute',
      right: '10px',
      top: '5px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '4px',
      pointerEvents: 'none'
    }
  },

  searchResultsListItemButton: {
    fontWeight: 'inherit',
    width: '100%',
    minHeight: '30px',
    display: 'block',
    textAlign: 'left',
    transition: '0.2s ease all',
    position: 'relative',
    boxSizing: 'border-box',
    border: 'none',
    outline: 'none',
    pointer: 'cursor',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: '#DCE4EB',
      fontWeight: 'bold'
    }
  }
})

class Searchbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      searchResults: null,
      visibleSuggestions: false,
      mounted: false,
      loading: false,
      activeSuggestion: -1
    }
  }

  componentDidMount() {
    this.setState({ mounted: true })
    document.body.addEventListener('click', this.handleHideSearchResults, true)
    if (this.props.searchTerm) {
      this.setState({
        searchTerm: this.props.searchTerm
      })
    }
  }

  componentWillUnmount() {
    this.setState({ mounted: false })
    document.body.removeEventListener('click', this.handleHideSearchResults, true)
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchTerm !== prevProps.searchTerm) {
      this.setState({
        searchTerm: this.props.searchTerm
      })
    }
  }

  handleSearchResults = nextProps => {
    if (nextProps !== this.state.searchTerm) {
      this.props.handleQueryUpdate(nextProps)
      this.setState({
        searchTerm: nextProps,
        loading: true,
        visibleSuggestions: true,
        searchResults: null
      }, () => {
        if (nextProps.length === 0) {
          this.setState({
            visibleSuggestions: false
          })
        }
        this.props.getData(nextProps)
      })
    }
  }

  handleChange = e => {
    if (e.target.value.length === 0) {
      this.setState({searchResults: null, visibleSuggestions: null, loading: false})
    }
    this.handleSearchResults(e.target.value)
  }

  handleKeyPress = e => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      this.setState({ visibleSuggestions: false })
    } else if (e.key === 'ArrowDown') {
      if (this.props.searchResults) {
        if (this.props.searchResults.length - 1 > this.state.activeSuggestion) {
          this.setState({
            activeSuggestion: this.state.activeSuggestion + 1
          })
        } else {
          this.setState({
            activeSuggestion: 0
          })
        }
      }
    } else if (e.key === 'ArrowUp') {
      if (this.props.searchResults) {
        if (this.props.searchResults && this.state.activeSuggestion > 0) {
          this.setState({
            activeSuggestion: this.state.activeSuggestion - 1
          })
        } else {
          this.setState({
            activeSuggestion: this.props.searchResults.length - 1
          })
        }
      }
    } else if (this.props.searchResults && e.key === 'Enter' && this.state.activeSuggestion > -1) {
      if (this.props.searchResults) {
        let selection = this.props.searchResults[this.state.activeSuggestion]
        this.handleResultSelected(selection)
        this.setState({
          visibleSuggestions: false
        })
      }
    } else if (this.props.searchResults && e.key === 'Enter' && this.state.activeSuggestion === -1) {
      this.handleResultSelected(this.state.searchTerm)
    } else {
      this.setState({
        activeSuggestion: -1
      })
    }
  }

  handleHideSearchResults = () => {
    this.setState({ visibleSuggestions: false })
  }

  handleUnmount = () => {
    this.setState({ mounted: false })
  }

  handleResultsSort = (array, key) => {
    return array.sort(function(a, b) {
      let x = a[key]; let y = b[key]
      return ((x < y) ? -1 : ((x > y) ? 1 : 0))
    })
  }

  handleResultSelected = (selectedResult) => {
    this.props.handleResultClick(selectedResult)
    this.setState({
      searchTerm: selectedResult,
      activeSuggestion: -1
    })
  }

  handleSearchButtonClicked = () => {
    this.handleResultSelected(this.state.searchTerm)
  }

  render() {
    let searchResults = this.props.searchResults
    let itemPropertyName = this.props.itemPropertyName
    let visibleSuggestions = this.state.visibleSuggestions
    let searchTerm = this.state.searchTerm
    let loading = this.state.loading
    return (
      <div className={css(styles.search)}>
        <div className={css(styles.searchbar)}>
          <input
            className={css(styles.searchInput)} type='text'
            placeholder={this.props.placeholder}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyPress} tabIndex={0}
            value={this.state.searchTerm}
          />
          <button className={css(styles.searchButton)} onClick={this.handleSearchButtonClicked}>
            Search
          </button>
          <label className={css(styles.searchLabel)}>{this.props.placeholder}</label>
        </div>
        <div
          className={visibleSuggestions ? css(styles.searchResultsVisible) : css(styles.searchResults)}
        >
          <ul className={css(styles.searchResultsList)} onClick={this.handleUnmount}>
            {
              loading && !searchResults
                ? <li className={`${css(styles.searchLoading)} search__loading`} tabIndex='-1'>
                  <span className='loading'>Loading Results</span>
                  <span className='loading__one'>.</span>
                  <span className='loading__two'>.</span>
                  <span className='loading__three'>.</span>
                </li>
                : searchResults && searchTerm &&
                this.handleResultsSort(searchResults, itemPropertyName) &&
                searchResults.map((item, index) => {
                  return <li key={index}
                    className={this.state.activeSuggestion === index ? css(styles.searchResultsListItemActive) : css(styles.searchResultsListItem)}
                    tabIndex='-1'>
                    <button
                      className={css(styles.searchResultsListItemButton)}
                      onClick={() => this.handleResultSelected(item[itemPropertyName])}
                    >
                      {item[itemPropertyName]}
                    </button>
                  </li>
                })
            }
          </ul>
        </div>
      </div>
    )
  }
}

Searchbar.propTypes = {
  placeholder: PropTypes.string,
  getData: PropTypes.func,
  searchResults: PropTypes.array,
  itemPropertyName: PropTypes.string,
  handleResultClick: PropTypes.func,
  handleQueryUpdate: PropTypes.func,
  searchTerm: PropTypes.string
}

export default Searchbar
