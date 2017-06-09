import React, {Component} from 'react';
import {connect} from 'react-redux';
import {convertApplicationToSeller, rejectApplication} from '../../redux/modules/applications';
import {Modal} from '../../../../shared/Modal/Modal';
import {ConnectedRevertedForm} from '../RevertNotification/RevertNotification'
import format from 'date-fns/format';

import {templateString} from '../../revertEmailTemplate';
import './AppList.css'

class AppList extends Component {

  static propTypes = {
    meta: React.PropTypes.object.isRequired,
    applications: React.PropTypes.array,
    onRejectClick: React.PropTypes.func.isRequired,
    onAcceptClick: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      msg: '',
      updated: false,
      responseModalOpen: false
    };
  }

  sortDate(applications) {
    return applications.sort(function (a, b) {
     return new Date(a.submitted_at) - new Date(b.submitted_at);
    });
  }

  toggleModal(id, msg) {
    this.setState({
      modalOpen: !this.state.modalOpen,
      applicationID: id || null,
      msg: msg
    });
  };

  toggleResponseModal() {
    this.setState({
      responseModalOpen: !this.state.responseModalOpen
    })
  }

  render() {
    const {
      meta = {},
      applications = [],
      onRejectClick,
      onAcceptClick
    } = this.props;

    let revertedAppID = this.state.applicationID || null;
    let revertedApp = (!revertedAppID ? null : applications.filter(x => x.id === revertedAppID)[0]);

    let {revertStatus, name: revertName} = (!revertedApp ? {} : revertedApp);

    return (
      <div styleName="appList">
        <h2>{meta.heading}</h2>
        <Modal show={typeof revertStatus === 'boolean' || this.state.responseModalOpen}>
          <div styleName={`callout--${(revertStatus ? 'info' : 'warning')}`}>
            {(revertStatus ? (this.state.msg !== '' ?
                <h4>{`Reversion email sent successfully to ${revertName}`}</h4> :
                <h4>{`Application from ${revertName} successfully reverted without email notification`}</h4>) :
                <h4>{`Reversion email was not sent to ${revertName}`}</h4>
            )}
          </div>
          <button
            type="button"
            style={{width: '90px', height: '30px'}}
            onClick={() => this.toggleResponseModal()}>
            close
          </button>
        </Modal>

        {this.state.applicationID &&
        <div id="modal-wrapper">
          <Modal show={ this.state.modalOpen }>
            <ConnectedRevertedForm
              defaultMessage={templateString}
              onClose={(id, msg) => this.toggleModal(id, msg)}
              appID={this.state.applicationID}
              revertStatus={revertStatus}
            />
          </Modal>
        </div>}
        <table className="content-table">

          <thead>
          <tr>
            <th>submitted_at</th>
            <th>name</th>
            <th>type</th>
            <th>jira</th>
            <th>actions</th>
          </tr>
          </thead>

          <tbody>

          {(this.sortDate(applications) || applications).map((a, i) => {
            return (
              <tr key={i}>
                <td>{format(new Date(a.submitted_at), 'YYYY-MM-DD HH:mm')}</td>
                <td><a target="_blank" href={meta.url_preview.concat(a.id) }>{a.name || "[no name]"}
                  {a.supplier_code && (<span className="badge--default">Existing</span>)}
                  {(a.recruiter === 'yes' || a.recruiter === 'both') && (
                    <span className="badge--beta">Recruiter</span>)}
                </a></td>
                <td>{a.type}</td>
                <td>
                  {a.tasks && a.tasks.subtasks.map((t, i) =>
                    <a target="_blank" rel="external" styleName={t.status} key={t.key} href={t.link}>{t.summary}</a>
                  )}
                </td>
                <td>
                  { (a.status === 'submitted' && !a.revertStatus) && <span>
                  <button onClick={e => {
                    e.preventDefault();
                    onRejectClick(a.id);
                  }} name="Reject" styleName="reject">Reject</button>

                  <button onClick={e => {
                    e.preventDefault();
                    onAcceptClick(a.id);
                  }} name="Accept">Accept</button>

                  <button onClick={e => {
                    e.preventDefault();
                    this.toggleModal(a.id)
                    this.toggleResponseModal()
                  }} name="Revert" styleName="revert">Revert</button>
                    </span>
                  }
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = ({applications, meta, onRejectClick, onAcceptClick}, ownProps) => {
  return {
    ...ownProps,
    applications,
    meta,
    onRejectClick,
    onAcceptClick
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAcceptClick: (id) => {
      dispatch(convertApplicationToSeller(id))
    },
    onRejectClick: (id) => {
      dispatch(rejectApplication(id))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppList);
