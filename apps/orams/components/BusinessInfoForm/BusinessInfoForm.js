import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {Form, Control} from 'react-redux-form';

import Layout from 'shared/Layout';

import BaseForm     from 'shared/form/BaseForm';
import SubmitForm   from 'shared/form/SubmitForm';
import ErrorBox     from 'shared/form/ErrorBox';
import StatefulError from 'shared/form/StatefulError';
import {required} from 'shared/validators';

import formProps    from 'shared/formPropsSelector';
import StepNav      from 'orams/components/StepNav';


class BusinessInfoForm extends BaseForm {

    static propTypes = {
        action: PropTypes.string,
        csrf_token: PropTypes.string,
        form: PropTypes.object.isRequired,
        returnLink: PropTypes.string
    }

    render() {
        const {action, csrf_token, model, form, children, onSubmit, onSubmitFailed, nextRoute} = this.props;
        return (
            <Layout>
                <header>
                    <h1 className="uikit-display-5" tabIndex="-1">More about your business</h1>
                </header>
                <article role="main">
                    <ErrorBox focusOnMount={true} model={model}/>
                    <Form model={model}
                          action={action}
                          method="post"
                          id="BusinessDetails__create"
                          valid={form.valid}
                          component={SubmitForm}
                          onCustomSubmit={onSubmit}
                          onSubmitFailed={onSubmitFailed}
                    >
                        {csrf_token && (
                            <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token}/>
                        )}

                        <fieldset>
                            <legend>Diversity and inclusion (optional)</legend>
                            <p>The Marketplace is committed to providing a diverse and inclusive environment.<br/>
                                Responses are optional and for demographic purposes only.</p>
                            <span className="uikit-control-input uikit-control-input--full">
                              <Control.checkbox
                                  model={`${model}.seller_type.indigenous`}
                                  id="indigenous"
                                  name="indigenous"
                                  value="Indigenous"
                                  mapProps={{
                                    className: 'uikit-control-input__input'
                                  }}
                              />
                              <label className="uikit-control-input__text" htmlFor="indigenous">Indigenous
                                  <p>Your business is at least 50% Indigenous owned and listed on <a
                                  href="http://www.supplynation.org.au/search" rel="external" target="_blank">Supply Nation.</a></p>
                              </label>
                            </span>

                        </fieldset>

                        {children}

                        <StepNav buttonText="Update Profile" to={nextRoute}/>
                    </Form>
                </article>
            </Layout>
        )
    }
}

BusinessInfoForm.defaultProps = {
    title: 'More about your business'
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...formProps(state, 'businessInfoForm')
    }
}

export {
    mapStateToProps,
    BusinessInfoForm as Form
}

export default connect(mapStateToProps)(BusinessInfoForm);
