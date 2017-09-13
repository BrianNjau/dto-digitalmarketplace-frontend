import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import includes from 'lodash/includes'
import { uniqueID } from '../shared/utils/helpers'
import * as styles from './ReportItem.scss'

const computeClassname = (base, alt, formatted) =>
  cx(base, {
    [alt]: formatted
  })

const imageRoot = '/static/media/'

const ReportItem = props => {
  const { heading, subitems, media } = props
  const mobile = media === 'mobile'

  return (
    <div className="col-sm-12" id="report-item">
      <div className={styles.reportItem}>
        {heading &&
          <h2 className={`${styles.reportItemHeading} uikit-display-2`}>
            {heading}
          </h2>}
        {subitems.map((subitem, id = uniqueID()) =>
          <p className={`${styles.reportSubitemContainer} ${subitem.fullWidth ? 'col-sm-12' : 'col-sm-6'}`} key={id}>
            {subitem.text &&
              <span className={styles.reportItemText}>
                {subitem.text}
              </span>}
            {subitem.image &&
              <span
                className={computeClassname(
                  styles.reportItemImage,
                  styles.reportFormattedQuoteImage,
                  subitem.formattedImage
                )}
              >
                <img
                  className={
                    includes(
                      ['briefs-by-phase', 'number-of-sellers-per-area-of-expertise', 'seller-applications-per-brief'],
                      subitem.image.replace('768-', '').replace('.svg', '')
                    )
                      ? styles.bigReportImage
                      : styles.reportImage
                  }
                  src={`${imageRoot}${mobile ? subitem.mobileImage : subitem.image}`}
                  alt={subitem.imageAlt}
                />
              </span>}
          </p>
        )}
      </div>
    </div>
  )
}

ReportItem.propTypes = {
  heading: PropTypes.string,
  media: PropTypes.string,
  subitems: PropTypes.array
}

ReportItem.defaultProps = {
  heading: '',
  media: '',
  subitems: []
}

export default ReportItem