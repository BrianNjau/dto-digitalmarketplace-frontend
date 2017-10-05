/* eslint-disable */
import React, { Component } from 'react'
import { withRouter, Switch, Route, Link } from 'react-router-dom'
import { uniqueID } from 'shared/utils/helpers'
import { connect } from 'react-redux'
import styles from './ResultsTable.scss'
import PageAlert from '@gov.au/page-alerts'

class ResultsTable extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render(props) {
    const { suppliers, alert } = this.props.data
    return (
      <div>
        {alert &&
          <PageAlert as={alert.type}>
            <h4>
              {alert.message}
            </h4>
          </PageAlert>}
        <div className={styles.tableContainer}>
          {suppliers.map((supplier, id = uniqueID()) =>
            <div key={id} className={styles.tableRow}>
              <div className="row">
                <div className="col-xs-12 col-sm-12">
                  <span className={styles.name}>
                    <a href="#">
                      {supplier.name}
                    </a>
                  </span>
                  <span className={styles.priceElements}>
                    <div className={styles.price}>
                      {supplier.price}
                    </div>
                    <div className={styles.incGst}>inc GST</div>
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-sm-12">
                  <span className={styles.phone}>
                    {supplier.phone}
                  </span>
                  <span className={styles.email}>
                    <a href={'mailto:' + supplier.email}>
                      {supplier.email}
                    </a>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

ResultsTable.propTypes = {}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => ({})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResultsTable))