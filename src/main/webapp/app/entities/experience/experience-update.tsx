import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IExpertise } from 'app/shared/model/expertise.model';
import { getEntities as getExpertise } from 'app/entities/expertise/expertise.reducer';
import { IExperience } from 'app/shared/model/experience.model';
import { Contract } from 'app/shared/model/enumerations/contract.model';
import { getEntity, updateEntity, createEntity, reset } from './experience.reducer';

export const ExperienceUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const expertise = useAppSelector(state => state.expertise.entities);
  const experienceEntity = useAppSelector(state => state.experience.entity);
  const loading = useAppSelector(state => state.experience.loading);
  const updating = useAppSelector(state => state.experience.updating);
  const updateSuccess = useAppSelector(state => state.experience.updateSuccess);
  const contractValues = Object.keys(Contract);

  const handleClose = () => {
    navigate('/experience' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getExpertise({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...experienceEntity,
      ...values,
      expertise: mapIdList(values.expertise),
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
          contract: 'CDI',
          ...experienceEntity,
          expertise: experienceEntity?.expertise?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="demoJhReact973App.experience.home.createOrEditLabel" data-cy="ExperienceCreateUpdateHeading">
            <Translate contentKey="demoJhReact973App.experience.home.createOrEditLabel">Create or edit a Experience</Translate>
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
                  id="experience-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('demoJhReact973App.experience.title')}
                id="experience-title"
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
                label={translate('demoJhReact973App.experience.company')}
                id="experience-company"
                name="company"
                data-cy="company"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 256, message: translate('entity.validation.maxlength', { max: 256 }) },
                  pattern: { value: /^[A-Z].*$/, message: translate('entity.validation.pattern', { pattern: '^[A-Z].*$' }) },
                }}
              />
              <ValidatedField
                label={translate('demoJhReact973App.experience.description')}
                id="experience-description"
                name="description"
                data-cy="description"
                type="textarea"
              />
              <ValidatedBlobField
                label={translate('demoJhReact973App.experience.logoCompany')}
                id="experience-logoCompany"
                name="logoCompany"
                data-cy="logoCompany"
                isImage
                accept="image/*"
              />
              <ValidatedField
                label={translate('demoJhReact973App.experience.inProgress')}
                id="experience-inProgress"
                name="inProgress"
                data-cy="inProgress"
                check
                type="checkbox"
              />
              <ValidatedField
                label={translate('demoJhReact973App.experience.contract')}
                id="experience-contract"
                name="contract"
                data-cy="contract"
                type="select"
              >
                {contractValues.map(contract => (
                  <option value={contract} key={contract}>
                    {translate('demoJhReact973App.Contract.' + contract)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('demoJhReact973App.experience.startDate')}
                id="experience-startDate"
                name="startDate"
                data-cy="startDate"
                type="date"
              />
              <ValidatedField
                label={translate('demoJhReact973App.experience.endDate')}
                id="experience-endDate"
                name="endDate"
                data-cy="endDate"
                type="date"
              />
              <ValidatedField
                label={translate('demoJhReact973App.experience.expertise')}
                id="experience-expertise"
                data-cy="expertise"
                type="select"
                multiple
                name="expertise"
              >
                <option value="" key="0" />
                {expertise
                  ? expertise.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.title}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/experience" replace color="info">
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

export default ExperienceUpdate;
