import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IMessage } from 'app/shared/model/message.model';
import { getEntities } from './message.reducer';

export const Message = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const messageList = useAppSelector(state => state.message.entities);
  const loading = useAppSelector(state => state.message.loading);
  const totalItems = useAppSelector(state => state.message.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      })
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (location.search !== endURL) {
      navigate(`${location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  return (
    <div>
      <h2 id="message-heading" data-cy="MessageHeading">
        <Translate contentKey="demoJhReact973App.message.home.title">Messages</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="demoJhReact973App.message.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/message/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="demoJhReact973App.message.home.createLabel">Create new Message</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {messageList && messageList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="demoJhReact973App.message.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('name')}>
                  <Translate contentKey="demoJhReact973App.message.name">Name</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('email')}>
                  <Translate contentKey="demoJhReact973App.message.email">Email</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('phone')}>
                  <Translate contentKey="demoJhReact973App.message.phone">Phone</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('message')}>
                  <Translate contentKey="demoJhReact973App.message.message">Message</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('file')}>
                  <Translate contentKey="demoJhReact973App.message.file">File</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('city')}>
                  <Translate contentKey="demoJhReact973App.message.city">City</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('otherCountry')}>
                  <Translate contentKey="demoJhReact973App.message.otherCountry">Other Country</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('date')}>
                  <Translate contentKey="demoJhReact973App.message.date">Date</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="demoJhReact973App.message.subject">Subject</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {messageList.map((message, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/message/${message.id}`} color="link" size="sm">
                      {message.id}
                    </Button>
                  </td>
                  <td>{message.name}</td>
                  <td>{message.email}</td>
                  <td>{message.phone}</td>
                  <td>{message.message}</td>
                  <td>
                    {message.file ? (
                      <div>
                        {message.fileContentType ? (
                          <a onClick={openFile(message.fileContentType, message.file)}>
                            <Translate contentKey="entity.action.open">Open</Translate>
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {message.fileContentType}, {byteSize(message.file)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{message.city}</td>
                  <td>{message.otherCountry}</td>
                  <td>{message.date ? <TextFormat type="date" value={message.date} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{message.subject ? <Link to={`/subject/${message.subject.id}`}>{message.subject.name}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/message/${message.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/message/${message.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/message/${message.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="demoJhReact973App.message.home.notFound">No Messages found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={messageList && messageList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Message;
