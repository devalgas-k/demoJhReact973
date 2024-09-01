import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IExperience } from 'app/shared/model/experience.model';
import { getEntities as getExperiences } from 'app/entities/experience/experience.reducer';
import { IExpertise } from 'app/shared/model/expertise.model';
import { getEntity, updateEntity, createEntity, reset } from './expertise.reducer';

export const ExpertiseUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const experiences = useAppSelector(state => state.experience.entities);
  const expertiseEntity = useAppSelector(state => state.expertise.entity);
  const loading = useAppSelector(state => state.expertise.loading);
  const updating = useAppSelector(state => state.expertise.updating);
  const updateSuccess = useAppSelector(state => state.expertise.updateSuccess);

  const handleClose = () => {
    navigate('/expertise' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getExperiences({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...expertiseEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...expertiseEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="demoJhReact973App.expertise.home.createOrEditLabel" data-cy="ExpertiseCreateUpdateHeading">
            <Translate contentKey="demoJhReact973App.expertise.home.createOrEditLabel">Create or edit a Expertise</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="expertise-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('demoJhReact973App.expertise.title')}
                id="expertise-title"
                name="title"
                data-cy="title"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 256, message: translate('entity.validation.maxlength', { max: 256 }) },
                  pattern: { value: /^[A-Z].*$/, message: translate('entity.validation.pattern', { pattern: '^[A-Z].*$' }) },
                }}
              />
              <ValidatedField
                label={translate('demoJhReact973App.expertise.description')}
                id="expertise-description"
                name="description"
                data-cy="description"
                type="textarea"
              />
              <ValidatedField
                label={translate('demoJhReact973App.expertise.level')}
                id="expertise-level"
                name="level"
                data-cy="level"
                type="text"
                validate={{
                  min: { value: 20, message: translate('entity.validation.min', { min: 20 }) },
                  max: { value: 100, message: translate('entity.validation.max', { max: 100 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/expertise" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ExpertiseUpdate;
