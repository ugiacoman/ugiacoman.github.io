import React from 'react'
import { Link } from 'react-router'
import sortBy from 'lodash/sortBy'
import { prefixLink } from 'gatsby-helpers'
import Helmet from "react-helmet"
import access from 'safe-access'
import { config } from 'config'
import include from 'underscore.string/include'
import Bio from 'components/Bio'
import axios from 'axios'

class BlogIndex extends React.Component {
  
  render () {
  // var url = "//blooming-gorge-88603.herokuapp.com/?username=Uli bot&text=Someone visited your website!&emoji=:partyparrot"
  // axios.get(url)
  //   .then(function (response) {
  //   })
  //   .catch(function (error) {
  //   })    
    const pageLinks = []
    // Sort pages.
    const sortedPages = sortBy(this.props.route.pages, (page) =>
      access(page, 'data.date')
    ).reverse()
    sortedPages.forEach((page) => {
      if (access(page, 'file.ext') === 'md' && !include(page.path, '/404')) {
        const title = access(page, 'data.title') || page.path
        pageLinks.push(
          <li
            key={page.path}
          >
            <Link 
            to={prefixLink(page.path)}>{title}</Link>
          </li>
        )
      }
    })
    return (
      <div>
        <Helmet
          title={config.authorName}
          meta={[
            {"name": "description", "content": "Sample blog"},
            {"name": "keywords", "content": "blog, articles"},
          ]}
        />
        <Bio />
        <h4>Writings: </h4>
        <ul>
          {pageLinks}
        </ul>
        <amp-pixel src="https://blooming-gorge-88603.herokuapp.com/?username=Uli bot&text=Someone visited your website.&emoji=:partyparrot"></amp-pixel>
      </div>
    )
  }
}

BlogIndex.propTypes = {
  route: React.PropTypes.object,
}

export default BlogIndex
