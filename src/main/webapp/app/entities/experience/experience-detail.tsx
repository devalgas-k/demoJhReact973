import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './experience.reducer';

export const ExperienceDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const experienceEntity = useAppSelector(state => state.experience.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="experienceDetailsHeading">
          <Translate contentKey="demoJhReact973App.experience.detail.title">Experience</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{experienceEntity.id}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="demoJhReact973App.experience.title">Title</Translate>
            </span>
          </dt>
          <dd>{experienceEntity.title}</dd>
          <dt>
            <span id="company">
              <Translate contentKey="demoJhReact973App.experience.company">Company</Translate>
            </span>
          </dt>
          <dd>{experienceEntity.company}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="demoJhReact973App.experience.description">Description</Translate>
            </span>
          </dt>
          <dd>{experienceEntity.description}</dd>
          <dt>
            <span id="logoCompany">
              <Translate contentKey="demoJhReact973App.experience.logoCompany">Logo Company</Translate>
            </span>
          </dt>
          <dd>
            {experienceEntity.logoCompany ? (
              <div>
                {experienceEntity.logoCompanyContentType ? (
                  <a onClick={openFile(experienceEntity.logoCompanyContentType, experienceEntity.logoCompany)}>
                    <img
                      src={`data:${experienceEntity.logoCompanyContentType};base64,${experienceEntity.logoCompany}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {experienceEntity.logoCompanyContentType}, {byteSize(experienceEntity.logoCompany)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="inProgress">
              <Translate contentKey="demoJhReact973App.experience.inProgress">In Progress</Translate>
            </span>
          </dt>
          <dd>{experienceEntity.inProgress ? 'true' : 'false'}</dd>
          <dt>
            <span id="contract">
              <Translate contentKey="demoJhReact973App.experience.contract">Contract</Translate>
            </span>
          </dt>
          <dd>{experienceEntity.contract}</dd>
          <dt>
            <span id="startDate">
              <Translate contentKey="demoJhReact973App.experience.startDate">Start Date</Translate>
            </span>
          </dt>
          <dd>
            {experienceEntity.startDate ? (
              <TextFormat value={experienceEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="endDate">
              <Translate contentKey="demoJhReact973App.experience.endDate">End Date</Translate>
            </span>
          </dt>
          <dd>
            {experienceEntity.endDate ? <TextFormat value={experienceEntity.endDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="demoJhReact973App.experience.expertise">Expertise</Translate>
          </dt>
          <dd>
            {experienceEntity.expertise
              ? experienceEntity.expertise.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.title}</a>
                    {experienceEntity.expertise && i === experienceEntity.expertise.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/experience" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/experience/${experienceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ExperienceDetail;
