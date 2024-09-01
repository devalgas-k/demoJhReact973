import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './message.reducer';

export const MessageDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const messageEntity = useAppSelector(state => state.message.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="messageDetailsHeading">
          <Translate contentKey="demoJhReact973App.message.detail.title">Message</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{messageEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="demoJhReact973App.message.name">Name</Translate>
            </span>
          </dt>
          <dd>{messageEntity.name}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="demoJhReact973App.message.email">Email</Translate>
            </span>
          </dt>
          <dd>{messageEntity.email}</dd>
          <dt>
            <span id="phone">
              <Translate contentKey="demoJhReact973App.message.phone">Phone</Translate>
            </span>
          </dt>
          <dd>{messageEntity.phone}</dd>
          <dt>
            <span id="message">
              <Translate contentKey="demoJhReact973App.message.message">Message</Translate>
            </span>
          </dt>
          <dd>{messageEntity.message}</dd>
          <dt>
            <span id="file">
              <Translate contentKey="demoJhReact973App.message.file">File</Translate>
            </span>
          </dt>
          <dd>
            {messageEntity.file ? (
              <div>
                {messageEntity.fileContentType ? (
                  <a onClick={openFile(messageEntity.fileContentType, messageEntity.file)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {messageEntity.fileContentType}, {byteSize(messageEntity.file)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="city">
              <Translate contentKey="demoJhReact973App.message.city">City</Translate>
            </span>
          </dt>
          <dd>{messageEntity.city}</dd>
          <dt>
            <span id="otherCountry">
              <Translate contentKey="demoJhReact973App.message.otherCountry">Other Country</Translate>
            </span>
          </dt>
          <dd>{messageEntity.otherCountry}</dd>
          <dt>
            <span id="date">
              <Translate contentKey="demoJhReact973App.message.date">Date</Translate>
            </span>
          </dt>
          <dd>{messageEntity.date ? <TextFormat value={messageEntity.date} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <Translate contentKey="demoJhReact973App.message.subject">Subject</Translate>
          </dt>
          <dd>{messageEntity.subject ? messageEntity.subject.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/message" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/message/${messageEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default MessageDetail;
