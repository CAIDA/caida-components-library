// import React, { Component } from 'react'
//
// import Searchbar from './components/searchbar/Searchbar'
// import axios from 'axios'
//
// export default class ExampleComponent extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       mounted: false,
//       searchResults: null
//     }
//   }
//
//   componentDidMount() {
//     this.setState({ mounted: true })
//   }
//
//   componentWillUnmount() {
//     this.setState({ mounted: false })
//   }
//
//   getData = (nextProps) => {
//     if (this.state.mounted) {
//       this.setState({ searchTerm: nextProps })
//       // Update URL to desired API Endpoint
//       axios.get(`https://test.ioda.caida.org/metadata/search/asn?name=${nextProps}&limit=11`)
//         .then(res => {
//           // Update searchResults state value to array of data
//           this.setState({ searchResults: res.data.data.metadata })
//         })
//         .catch(error => {
//           console.log(error)
//         })
//     }
//   }
//
//   render() {
//     return (
//       <div>
//         <Searchbar placeholder={'input label'}
//           getData={this.getData}
//           itemPropertyName={'name'}
//           itemPropertyUrl={'code'}
//           itemUrlString1={'https://ioda.caida.org/ioda/dashboard#view=inspect&entity='}
//           itemUrlString2={'&last-view=overview'}
//           searchResults={this.state.searchResults}
//         />
//       </div>
//     )
//   }
// }
export * from './components'
