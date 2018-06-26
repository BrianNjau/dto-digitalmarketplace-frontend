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

    expect(tree.find('h1').text()).toBe('Invite evaluators')
  })
})
