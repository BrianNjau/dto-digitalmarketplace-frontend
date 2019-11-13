import React from 'react'

import AUheading from '@gov.au/headings/lib/js/react.js'
import ClosedDate from 'shared/ClosedDate'
import { rootPath } from 'marketplace/routes'

import OverviewHeaderDraftActionsList from './OverviewHeaderDraftActionsList'

import styles from '../Overview.scss'

const OverviewHeader = props => {
  const { brief, flowName, handleDeleteClick, isClosed, isPublished, isPartOfTeam, isTeamLead, teams } = props

  return (
    <div className={styles.header}>
      <small className={styles.tagLine}>{brief.title || `New ${flowName} request`}</small>
      {brief.internalReference && (
        <small className={`${styles.internalReference} ${styles.tagLine}`}>{brief.internalReference}</small>
      )}
      <AUheading className={styles.overviewHeading} size="xl" level="1">
        Overview
      </AUheading>
      <div className={styles.headerMenu}>
        {!isPublished && (
          <OverviewHeaderDraftActionsList
            brief={brief}
            handleDeleteClick={handleDeleteClick}
            isPartOfTeam={isPartOfTeam}
            isTeamLead={isTeamLead}
            teams={teams}
          />
        )}
        {isPublished && !isClosed && (
          <div className={styles.headerMenuClosingTime}>
            Closing{' '}
            <strong>
              <ClosedDate countdown date={brief.dates.closing_time} />
            </strong>
          </div>
        )}
        <ul className={styles.menuList}>
          {isPublished && (
            <li>
              <a href={`${rootPath}/digital-marketplace/opportunities/${brief.id}`}>View opportunity</a>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default OverviewHeader
