/* eslint-disable react/jsx-no-bind */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import format from 'date-fns/format'
import get from 'lodash/get'

import './scss/Datefield.scss'

class Datefield extends React.Component {
  constructor(props) {
    super(props)
    const { date, model, setDate } = this.props
    if (date && typeof date === 'string') {
      const propDate = new Date(date)
      this.state = {
        day: format(propDate, 'DD'),
        month: format(propDate, 'MM'),
        year: format(propDate, 'YYYY')
      }
    } else {
      setDate(model, '2017-01-01')
    }
  }

  state = {
    day: null,
    month: null,
    year: null
  }

  onChange(e) {
    const { model, setDate } = this.props
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        const { year, month, day } = this.state
        const date = format(
          new Date(Number((year && year.length === 2 ? '20' : '') + year), Number(month) - 1, Number(day)),
          'YYYY-MM-DD'
        )
        setDate(model, date)
      }
    )
  }

  render() {
    const { id, htmlFor, label, description } = this.props
    const { day, month, year } = this.state
    return (
      <div styleName="date-input">
        <label htmlFor={htmlFor} className="question-heading">
          {label}
        </label>
        {description &&
          <p className="hint" id={`${id}-hint`}>
            {description}
          </p>}

        <div styleName="fields flush">
          <label htmlFor={htmlFor} styleName="date-heading">
            Day
          </label>
          <input type="text" name="day" id="day" maxLength="2" onChange={this.onChange.bind(this)} defaultValue={day} />
        </div>

        <div styleName="slashSpacer">/</div>

        <div styleName="fields flush">
          <label htmlFor={htmlFor} styleName="date-heading">
            Month
          </label>
          <input
            type="text"
            name="month"
            id="month"
            maxLength="2"
            onChange={this.onChange.bind(this)}
            defaultValue={month}
          />
        </div>

        <div styleName="slashSpacer">/</div>

        <div styleName="fields">
          <label htmlFor={htmlFor} styleName="date-heading">
            Year
          </label>
          <input
            type="text"
            name="year"
            id="year"
            maxLength="4"
            onChange={this.onChange.bind(this)}
            defaultValue={year}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  date: get(state, ownProps.model)
})

const mapDispatchToProps = dispatch => ({
  setDate: (model, date) => dispatch(actions.change(model, date))
})

Datefield.defaultProps = {
  description: null
}

Datefield.propTypes = {
  id: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  model: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  description: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(Datefield)