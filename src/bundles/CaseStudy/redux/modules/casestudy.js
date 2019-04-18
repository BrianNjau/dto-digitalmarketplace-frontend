export const ASSESSMENT_SAVE_FAILED = 'ASSESSMENT_SAVE_FAILED';
export const ASSESSMENT_DELETE_FAILED = 'ASSESSMENT_DELETE_FAILED';

export const assessmentSaveFailed = (data) => ({ type: ASSESSMENT_SAVE_FAILED, data });
export const deleteFailed = (data) => ({ type: ASSESSMENT_DELETE_FAILED, data });

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    default:
      state.assessmentForm = {
        status: 'unassessed'
      }
      state.assignToAssessorForm = {
        assessor_user_id: null
      }
      return state;
  }
}


export const assessmentSave = (assessment) => {
  return (dispatch, getState, api) => {
    const state = getState();
    let {
      casestudy
    } = state;

    let approved_criteria = []
    for (let ac in assessment.approved_criteria) {
      approved_criteria.push(ac)
    }
    let toSave = {
      approved_criteria: approved_criteria,
      status: assessment.status,
      comment: assessment.comment
    }
    return api(state.meta.url_case_study_assessment_update, {
      method: 'PUT',
      body: JSON.stringify(toSave),
      headers: {
        'X-CSRFToken': state.form_options.csrf_token
      }
    })
    .then((response) => {
      if (response.status != 200) {
        return response
          .text()
          .then((text) => {
            return dispatch(assessmentSaveFailed({
              error: text,
              casestudy: casestudy
            }));
          });
      }
      return response
        .json()
        .then((json) => {
          if (json.errors) {
            return dispatch(assessmentSaveFailed({
              error: json.errors.map(i => i.message).join('<br/>'),
              casestudy: casestudy
            }));
          } else {
            document.location.href = "/admin/casestudy-assessment"
          }
        })
    })
  }
};

export const assignToAssessorSave = (values) => {
  return (dispatch, getState, api) => {
    const state = getState();
    let {
      casestudy
    } = state;

    let toSave = {
      assessor_user_id: assessor_user_id.value
    } = values
    return api(state.meta.url_case_study_assessment_add, {
      method: 'POST',
      body: JSON.stringify(toSave),
      headers: {
        'X-CSRFToken': state.form_options.csrf_token
      }
    })
    .then((response) => {
      if (response.status != 200) {
        return response
          .text()
          .then((text) => {
            return dispatch(assessmentSaveFailed({
              error: text,
              casestudy: casestudy
            }));
          });
      }
      return response
        .json()
        .then((json) => {
          if (json.errors) {
            return dispatch(assessmentSaveFailed({
              error: json.errors.map(i => i.message).join('<br/>'),
              casestudy: casestudy
            }));
          } else {
            document.location.href = "/admin/casestudy-assessment"
          }
        })
    })
  }
}

export const deleteCaseStudyAssessment = (values) => {
  return (dispatch, getState, api) => {
    const state = getState();
    let {
      casestudy
    } = state;

    let toDelete = {
      assessor_user_id: assessor_user_id.value
    } = values
    
    let deleteAssessentURL = ("/admin/casestudy/" + casestudy.id + "/assessment/" + toDelete)

    return api((deleteAssessentURL), {
      method: 'DELETE',
      body: JSON.stringify(toDelete),
      headers: {
        'X-CSRFToken': state.form_options.csrf_token
      }
    })
    .then((response) => {
      if (response.status != 200) {
        return response
          .text()
          .then((text) => {
            return dispatch(deleteFailed({
              error: text,
              casestudy: casestudy
            }));
          });
      }
      return response
        .json()
        .then((json) => {
          if (json.errors) {
            return dispatch(deleteFailed({
              error: json.errors.map(i => i.message).join('<br/>'),
              casestudy: casestudy
            }));
          } else {
            document.location.href = ("/admin/casestudy/" + casestudy.id + "/assessment?role=manager")
          }
        })
    })
  }
}
