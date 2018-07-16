import React from 'react'
import AUheading from '@gov.au/headings/lib/js/react.js'
import styles from './BriefChoice.scss'

const BriefChoice = () => (
  <div className={styles.container}>
    <div className={`row ${styles.headingRow}`}>
      <div className="col-xs-12">
        <AUheading level="1" size="xl">
          Create a new brief
        </AUheading>
      </div>
    </div>
    <div className={`row ${styles.flex}`}>
      <div className={`col-xs-12 col-md-3 ${styles.flexColumn}`}>
        <span />
        <AUheading level="2" size="md">
          Digital outcome
        </AUheading>
        <p>Find a team to help you work towards a digital project or goal, for example, a website.</p>
        <ul className={styles.tickList}>
          <li>Receive written proposals from sellers.</li>
          <li>Request case studies, work history, references and/or presentations.</li>
        </ul>
        <p className={styles.flexGrow}>
          <strong>Receive responses within:</strong>
          <br />1 - 2 weeks
        </p>
        <p>
          <a href="/buyers/frameworks/digital-marketplace/requirements/digital-outcome">
            <button className="au-btn">Get started</button>
          </a>
        </p>
      </div>
      <div className="col-xs-12 col-md-1">
        <div className={styles.separator} />
      </div>
      <div className={`col-xs-12 col-md-3 ${styles.flexColumn}`}>
        <span />
        <AUheading level="2" size="md">
          Training
        </AUheading>
        <p>Build and embed skills to support digital services, for example, coaching in agile practices.</p>
        <ul className={styles.tickList}>
          <li>Receive written proposals, costs and résumés from sellers.</li>
          <li>Request case studies, references, interview and/or presentations.</li>
        </ul>
        <p className={styles.flexGrow}>
          <strong>Receive responses within:</strong>
          <br />1 - 2 weeks
        </p>
        <p>
          <a href="/buyers/frameworks/digital-marketplace/requirements/training">
            <button className="au-btn">Get started</button>
          </a>
        </p>
      </div>
      <div className="col-xs-12 col-md-1">
        <div className={styles.separator} />
      </div>
      <div className={`col-xs-12 col-md-3 ${styles.flexColumn}`}>
        <span />
        <AUheading level="2" size="md">
          Digital specialist
        </AUheading>
        <p>Find a person with specialised digital skills, for example, a developer.</p>
        <ul className={styles.tickList}>
          <li>Receive seller résumés.</li>
          <li>Request references, interviews, scenarios and/or presentations.</li>
        </ul>
        <p className={styles.flexGrow}>
          <strong>Receive responses within:</strong>
          <br />1 - 2 weeks
        </p>
        <p>
          <a href="/buyers/frameworks/digital-marketplace/requirements/digital-professionals">
            <button className="au-btn">Get started</button>
          </a>
        </p>
      </div>
    </div>
  </div>
)

export default BriefChoice
