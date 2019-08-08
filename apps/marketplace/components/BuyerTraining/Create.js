import React from 'react'
import AUheading from '@gov.au/headings/lib/js/react.js'
import { rootPath } from 'marketplace/routes'

import styles from '../../main.scss'

const Create = () => (
  <React.Fragment>
    <AUheading level="1" size="xl">
      Get training to build digital skills
    </AUheading>
    <AUheading level="2" size="sm">
      Use this service to:
    </AUheading>
    <p>
      Request proposals from specific sellers to build digital skills and expertise.
    </p>
    <AUheading level="2" size="sm">
      What you get:
    </AUheading>
    <p>
      Proposals and/or a completed response template used by your agency.
    </p>
    <AUheading level="2" size="sm">
      Before you start:
    </AUheading>
    <ul>
      <li>
        The Learning Design Standards can be used to help structure your training approach.
      </li>
      <li>
        View the support article to see recommended questions and find appropriate sellers to approach.
      </li>
      <li>
        Downlad the draft questions and requirements documents to prepare your request offline before publishing.
      </li>
    </ul>
    <a href={`${rootPath}/buyer-rfx/create`} className={`au-btn ${styles['space-top-double']}`}>
      Create opportunity
    </a>
  </React.Fragment>
)

export default Create
