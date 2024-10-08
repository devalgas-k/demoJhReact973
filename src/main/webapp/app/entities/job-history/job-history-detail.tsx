import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { DurationFormat } from 'app/shared/DurationFormat';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './job-history.reducer';

export const JobHistoryDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const jobHistoryEntity = useAppSelector(state => state.jobHistory.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="jobHistoryDetailsHeading">
          <Translate contentKey="demoJhReact973App.jobHistory.detail.title">JobHistory</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{jobHistoryEntity.id}</dd>
          <dt>
            <span id="startDate">
              <Translate contentKey="demoJhReact973App.jobHistory.startDate">Start Date</Translate>
            </span>
          </dt>
          <dd>
            {jobHistoryEntity.startDate ? <TextFormat value={jobHistoryEntity.startDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="endDate">
              <Translate contentKey="demoJhReact973App.jobHistory.endDate">End Date</Translate>
            </span>
          </dt>
          <dd>{jobHistoryEntity.endDate ? <TextFormat value={jobHistoryEntity.endDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="language">
              <Translate contentKey="demoJhReact973App.jobHistory.language">Language</Translate>
            </span>
          </dt>
          <dd>{jobHistoryEntity.language}</dd>
          <dt>
            <span id="file">
              <Translate contentKey="demoJhReact973App.jobHistory.file">File</Translate>
            </span>
          </dt>
          <dd>
            {jobHistoryEntity.file ? (
              <div>
                {jobHistoryEntity.fileContentType ? (
                  <a onClick={openFile(jobHistoryEntity.fileContentType, jobHistoryEntity.file)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {jobHistoryEntity.fileContentType}, {byteSize(jobHistoryEntity.file)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="date">
              <Translate contentKey="demoJhReact973App.jobHistory.date">Date</Translate>
            </span>
          </dt>
          <dd>{jobHistoryEntity.date ? <TextFormat value={jobHistoryEntity.date} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="duration">
              <Translate contentKey="demoJhReact973App.jobHistory.duration">Duration</Translate>
            </span>
          </dt>
          <dd>
            {jobHistoryEntity.duration ? <DurationFormat value={jobHistoryEntity.duration} /> : null} ({jobHistoryEntity.duration})
          </dd>
          <dt>
            <Translate contentKey="demoJhReact973App.jobHistory.job">Job</Translate>
          </dt>
          <dd>{jobHistoryEntity.job ? jobHistoryEntity.job.id : ''}</dd>
          <dt>
            <Translate contentKey="demoJhReact973App.jobHistory.department">Department</Translate>
          </dt>
          <dd>{jobHistoryEntity.department ? jobHistoryEntity.department.id : ''}</dd>
          <dt>
            <Translate contentKey="demoJhReact973App.jobHistory.employee">Employee</Translate>
          </dt>
          <dd>{jobHistoryEntity.employee ? jobHistoryEntity.employee.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/job-history" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/job-history/${jobHistoryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default JobHistoryDetail;
