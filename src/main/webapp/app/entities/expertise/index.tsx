import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Expertise from './expertise';
import ExpertiseDetail from './expertise-detail';
import ExpertiseUpdate from './expertise-update';
import ExpertiseDeleteDialog from './expertise-delete-dialog';

const ExpertiseRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Expertise />} />
    <Route path="new" element={<ExpertiseUpdate />} />
    <Route path=":id">
      <Route index element={<ExpertiseDetail />} />
      <Route path="edit" element={<ExpertiseUpdate />} />
      <Route path="delete" element={<ExpertiseDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ExpertiseRoutes;
