import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import configureStore from 'marketplace/store'
import BriefInviteAssessorsForm from './BriefInviteAssessorsForm'

Enzyme.configure({ adapter: new Adapter() })

const store = configureStore()

describe('BriefInviteAssessorForm', () => {
  test('has initial empty state', () => {
    const tree = mount(
      <Provider store={store}>
        <BriefInviteAssessorsForm />
      </Provider>
    )

    expect(tree.contains('Invite evaluators')).toBeTruthy()
  })

  test('displays submitted invites', () => {
    const tree = mount(
      <Provider store={store}>
        <BriefInviteAssessorsForm
          briefAssessorSubmitSuccess
          submittedAssessors={[{ email_address: 'test@test.com' }]}
        />
      </Provider>
    )

    expect(tree.contains('Invitations sent')).toBeTruthy()
    expect(
      tree.contains(
        <ul>
          <li>test@test.com</li>
        </ul>
      )
    ).toBeTruthy()
  })

  test('displays alert when invite limit reached', () => {
    const tree = mount(
      <Provider store={store}>
        <BriefInviteAssessorsForm maxAssessors={1} assessors={['test']} />
      </Provider>
    )

    expect(tree.contains('You cannot invite any more evaluators')).toBeTruthy()
  })

  test('displays multiple email address fields', () => {
    const tree = mount(
      <Provider store={store}>
        <BriefInviteAssessorsForm briefInviteAssessorsForm={{ assessors: ['test', 'anothertest'] }} />
      </Provider>
    )

    expect(tree.find('[label="Email address"]')).toHaveLength(2)
  })
})
