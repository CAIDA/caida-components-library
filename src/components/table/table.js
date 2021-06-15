import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css, StyleSheet } from 'aphrodite-jss'

import iconSortAsc from 'images/icons/icon-asc.png';
import iconSortDesc from 'images/icons/icon-desc.png';
import iconSortUnsorted from 'images/icons/icon-sortUnsort.png';

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

})

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      sortedColumn: {
        name: '',
        position: '',
        arrow: ''
      }
    }
    this.headers = this.props.headers
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({
        data: this.props.data,
        sortedColumn: {
          name: this.props.initialColumnSorted,
          position: this.props.initialSortDirection,
          arrow: this.props.initialSortDirection === 'desc' ? iconSortDesc : iconSortAsc
        }
      })
    }
  }

  compare(key, order) {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0
      }

      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key]
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key]

      let comparison = 0
      if (varA > varB) {
        comparison = 1
      } else if (varA < varB) {
        comparison = -1
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      )
    }
  }

  sortByColumn(event) {
    let colToSort, position, data;
    if (event.target.value) {
      colToSort = Object.keys(this.props.headers).find(key => this.props.headers[key] === event.target.value);
    } else {
      colToSort = Object.keys(this.props.headers).find(key => this.props.headers[key] === event.target.parentNode.value);
    }
    position = this.props.headers[colToSort]

    // Update state of table to sort rows and add icon
    if (event.target.value) {
      this.setState( {
        sortedColumn: {
          name: colToSort,
          position: event.target.value !== position
            ? 'asc'
            : this.state.sortedColumn.position === 'asc'
              ? 'desc'
              : 'asc',
          arrow: event.target.value !== position
            ? iconSortUnsorted
            : this.state.sortedColumn.position === 'asc'
              ? iconSortDesc
              : iconSortAsc
        }
      }, () => {
        data = this.props.data.sort(this.compare(colToSort, this.state.sortedColumn.position))
        this.setState({
          data: data
        })
      })
    } else {
      this.setState( {
        sortedColumn: {
          name: colToSort,
          position: event.target.parentNode.value !== position
            ? 'asc'
            : this.state.sortedColumn.position === 'asc'
              ? 'desc'
              : 'asc',
          arrow: event.target.parentNode.value !== position
            ? iconSortUnsorted
            : this.state.sortedColumn.position === 'asc'
              ? iconSortDesc
              : iconSortAsc
        }
      }, () => {
        data = this.props.data.sort(this.compare(colToSort, this.state.sortedColumn.position))
        this.setState({
          data: data
        })
      })
    }
  }

  generateKeys(prefix) {
    var key = (prefix) ? prefix : '';
    return (key + Math.random().toString(34).slice(2));
  }

  render() {
    const unsortedIconAltText = 'unsorted'
    return (
      <table className='table'>
        <thead>
          <tr className='table__header'>
            {
              Object.values(this.props.headers).map(header => {
                return <th className='table__header-col' key={header}>
                  <button onClick={(event) => this.sortByColumn(event)} value={header}>
                    {header}
                    {
                      header === this.props.headers[this.state.sortedColumn.name]
                        ? <img className='table__header-sort' src={this.state.sortedColumn.arrow} alt={this.state.sortedColumn.arrow} onClick={(event) => this.sortByColumn(event)} />
                        : <img className='table__header-sort' src={iconSortUnsorted} alt={unsortedIconAltText} />
                    }
                  </button>
                </th>
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            this.state.data && this.state.data.map(cell => {
              return <tr key={this.generateKeys('cell-')}>

                </tr>
            })
          }
        </tbody>
      </table>
    )
  }
}

export default Table

Table.propTypes = {
  headers: PropTypes.object.required,
  initialColumnSorted: PropTypes.string.required,
  initialSortDirection: PropTypes.string.required,
  data: PropTypes.array.required
}
