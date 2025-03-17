import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { CannedDxRoutes } from '../app/modules/toolbox/canned_dx/canned_dx.route';
import { InsuranceRoutes } from '../app/modules/toolbox/insurance/insurance.route';
import { DisclaimerRoutes } from '../app/modules/toolbox/disclaimer/disclaimer.route';
import { PainRoutes } from '../app/modules/pain/pain.route';
import { DieasesRoutes } from '../app/modules/diseases/dieases.route';
import { MedicalTermsRoutes } from '../app/modules/medical_terms/medical_terms.routes';
import { FacilityRoutes } from '../app/modules/facility/facility.route';
import { PatientRoutes } from '../app/modules/patient/patient.route';
import { ReportRoutes } from '../app/modules/report/report.route';
import { BillRotues } from '../app/modules/bill/bill.route';
const router = express.Router();

const apiRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path:"/canned-dx",
    route: CannedDxRoutes,
  },
  {
    path:"/insurance",
    route: InsuranceRoutes,
  },
  {
    path:'/disclaimer',
    route:DisclaimerRoutes
  },
  {
    path:"/pain",
    route:PainRoutes
  },
  {
    path:"/dieases",
    route: DieasesRoutes
  },
  {
    path:"/medical-terms",
    route: MedicalTermsRoutes
  },{
    path:"/facility",
    route: FacilityRoutes
  },
  {
    path:"/patient",
    route: PatientRoutes
  },
  {
    path:"/report",
    route:ReportRoutes
  },
  {
    path:"/bill",
    route: BillRotues
  }
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
