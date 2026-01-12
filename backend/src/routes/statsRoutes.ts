// // import express from 'express';
// // import { getPublicStats } from '../controllers/statsController';

// // const router = express.Router();

// // // Endpoint: GET /api/stats/public
// // router.get('/public', getPublicStats);

// // export default router;
// import express from 'express';
// import { getPublicStats, trackVisit } from '../controllers/statsController';

// const router = express.Router();

// // GET /api/stats (Ambil Data)
// // Note: Saya ubah path dari '/public' menjadi '/' agar lebih bersih di frontend (/api/stats)
// router.get('/', getPublicStats);

// // POST /api/stats/visit (Rekam Kunjungan Baru)
// router.post('/visit', trackVisit);

// export default router;
import express from 'express';
import { getPublicStats, trackVisit, getWallOfFame } from '../controllers/statsController';

const router = express.Router();

// GET /api/stats (Untuk mengambil data angka)
router.get('/', getPublicStats);

router.get('/public', getPublicStats);

router.get('/wall-of-fame', getWallOfFame);

// POST /api/stats/visit (Untuk menambah jumlah visitor)
router.post('/visit', trackVisit);

export default router;