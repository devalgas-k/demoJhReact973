import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IEmployee } from 'app/shared/model/employee.model';
import { getEntities } from './employee.reducer';

export const Employee = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const employeeList = useAppSelector(state => state.employee.entities);
  const loading = useAppSelector(state => state.employee.loading);
  const totalItems = useAppSelector(state => state.employee.totalItems);

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
      <h2 id="employee-heading" data-cy="EmployeeHeading">
        <Translate contentKey="demoJhReact973App.employee.home.title">Employees</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="demoJhReact973App.employee.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/employee/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="demoJhReact973App.employee.home.createLabel">Create new Employee</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {employeeList && employeeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="demoJhReact973App.employee.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('firstName')}>
                  <Translate contentKey="demoJhReact973App.employee.firstName">First Name</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('lastName')}>
                  <Translate contentKey="demoJhReact973App.employee.lastName">Last Name</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('email')}>
                  <Translate contentKey="demoJhReact973App.employee.email">Email</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('phoneNumber')}>
                  <Translate contentKey="demoJhReact973App.employee.phoneNumber">Phone Number</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('hireDate')}>
                  <Translate contentKey="demoJhReact973App.employee.hireDate">Hire Date</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('salary')}>
                  <Translate contentKey="demoJhReact973App.employee.salary">Salary</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('commissionPct')}>
                  <Translate contentKey="demoJhReact973App.employee.commissionPct">Commission Pct</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('level')}>
                  <Translate contentKey="demoJhReact973App.employee.level">Level</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('contract')}>
                  <Translate contentKey="demoJhReact973App.employee.contract">Contract</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('cv')}>
                  <Translate contentKey="demoJhReact973App.employee.cv">Cv</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="demoJhReact973App.employee.manager">Manager</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="demoJhReact973App.employee.department">Department</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {employeeList.map((employee, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/employee/${employee.id}`} color="link" size="sm">
                      {employee.id}
                    </Button>
                  </td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phoneNumber}</td>
                  <td>{employee.hireDate ? <TextFormat type="date" value={employee.hireDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{employee.salary}</td>
                  <td>{employee.commissionPct}</td>
                  <td>{employee.level}</td>
                  <td>
                    <Translate contentKey={`demoJhReact973App.Contract.${employee.contract}`} />
                  </td>
                  <td>
                    {employee.cv ? (
                      <div>
                        {employee.cvContentType ? (
                          <a onClick={openFile(employee.cvContentType, employee.cv)}>
                            <Translate contentKey="entity.action.open">Open</Translate>
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {employee.cvContentType}, {byteSize(employee.cv)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{employee.manager ? <Link to={`/employee/${employee.manager.id}`}>{employee.manager.id}</Link> : ''}</td>
                  <td>{employee.department ? <Link to={`/department/${employee.department.id}`}>{employee.department.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/employee/${employee.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/employee/${employee.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                        to={`/employee/${employee.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
              <Translate contentKey="demoJhReact973App.employee.home.notFound">No Employees found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={employeeList && employeeList.length > 0 ? '' : 'd-none'}>
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

export default Employee;
