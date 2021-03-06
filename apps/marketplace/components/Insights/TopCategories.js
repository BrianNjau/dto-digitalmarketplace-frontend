import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import Chart from 'chart.js'

import styles from '../../main.scss'
import insightStyles from './insights.scss'

export class TopCategories extends Component {
  constructor(props) {
    super(props)
    this.chartRef = React.createRef()
  }

  componentDidMount() {
    if (!this.chartRef.current || !this.props.insightData) {
      return
    }
    const counts = this.props.insightData.briefData.topCategories
    const chart = new Chart(this.chartRef.current, {
      type: 'horizontalBar',
      data: {
        datasets: [
          {
            data: counts.map(a => a.count),
            backgroundColor: '#065688'
          }
        ],
        labels: counts.map(a => a.name)
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              scaleLabel: {
                display: true,
                labelString: 'Opportunities posted'
              }
            }
          ]
        }
      }
    })
    chart.update()
  }

  render() {
    return (
      <React.Fragment>
        <div className={`row ${styles.marginBottom1}`}>
          <div className="col-xs-12 col-md-12">
            <AUheading size="lg" level="2">
              Top categories for opportunities posted since 29 August 2016
            </AUheading>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className={insightStyles['chart-md-height-5x']}>
              <canvas
                ref={this.chartRef}
                aria-label="Top categories for opportunities posted since 29 August 2016"
                /* eslint-disable-next-line jsx-a11y/no-interactive-element-to-noninteractive-role */
                role="img"
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

TopCategories.defaultProps = {
  insightData: {}
}

TopCategories.propTypes = {
  insightData: PropTypes.object.isRequired
}

export default TopCategories
