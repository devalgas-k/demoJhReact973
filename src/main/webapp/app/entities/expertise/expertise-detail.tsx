import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './expertise.reducer';

export const ExpertiseDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const expertiseEntity = useAppSelector(state => state.expertise.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="expertiseDetailsHeading">
          <Translate contentKey="demoJhReact973App.expertise.detail.title">Expertise</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{expertiseEntity.id}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="demoJhReact973App.expertise.title">Title</Translate>
            </span>
          </dt>
          <dd>{expertiseEntity.title}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="demoJhReact973App.expertise.description">Description</Translate>
            </span>
          </dt>
          <dd>{expertiseEntity.description}</dd>
          <dt>
            <span id="level">
              <Translate contentKey="demoJhReact973App.expertise.level">Level</Translate>
            </span>
          </dt>
          <dd>{expertiseEntity.level}</dd>
        </dl>
        <Button tag={Link} to="/expertise" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/expertise/${expertiseEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ExpertiseDetail;
