import master from './master/master.route';
import { Router } from 'express';



const router: Router = Router();
router.use('/master', master);




export default router;
