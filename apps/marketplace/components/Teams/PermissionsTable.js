import React from 'react'

import { AUcheckbox } from '@gov.au/control-input'

import commonStyles from './TeamStages.scss'

const PermissionsTable = props => (
  <table className={commonStyles.stageTable}>
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Create drafts</th>
        <th scope="col">Publish opportunities</th>
        <th scope="col">Answer seller questions</th>
        <th scope="col">Download responses</th>
        <th scope="col">Create work orders</th>
        <th scope="col">Download reporting data</th>
      </tr>
    </thead>
    <tbody>
      {props.teamMembers.map(teamMember => (
        <tr key={`item.${teamMember.name}`}>
          <td>{teamMember.name}</td>
          <td>
            <AUcheckbox id="create-drafts-checkbox" label="" name="permissions" />
          </td>
          <td>
            <AUcheckbox id="publish-opportunities-checkbox" label="" name="permissions" />
          </td>
          <td>
            <AUcheckbox id="answer-seller-questions-checkbox" label="" name="permissions" />
          </td>
          <td>
            <AUcheckbox id="download-responses-checkbox" label="" name="permissions" />
          </td>
          <td>
            <AUcheckbox id="create-work-orders-checkbox" label="" name="permissions" />
          </td>
          <td>
            <AUcheckbox id="download-reporting-data-checkbox" label="" name="permissions" />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default PermissionsTable
