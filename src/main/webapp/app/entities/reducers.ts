import region from 'app/entities/region/region.reducer';
import country from 'app/entities/country/country.reducer';
import location from 'app/entities/location/location.reducer';
import department from 'app/entities/department/department.reducer';
import task from 'app/entities/task/task.reducer';
import employee from 'app/entities/employee/employee.reducer';
import job from 'app/entities/job/job.reducer';
import jobHistory from 'app/entities/job-history/job-history.reducer';
import expertise from 'app/entities/expertise/expertise.reducer';
import experience from 'app/entities/experience/experience.reducer';
import message from 'app/entities/message/message.reducer';
import subject from 'app/entities/subject/subject.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  region,
  country,
  location,
  department,
  task,
  employee,
  job,
  jobHistory,
  expertise,
  experience,
  message,
  subject,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
