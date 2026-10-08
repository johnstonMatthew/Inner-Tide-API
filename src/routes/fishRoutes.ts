import express, { Router } from 'express';
import { getFishes, getFish, createFish, updateFish, deleteFish, addFunFact } from '../controllers/fishController';

// Create Router to map URLs Requests to the Proper Methods
const router: Router = express.Router();

// Map Each Corresponding CRUD Functionality URL to its Proper Function in the Controller 
router.get('/', getFishes);
router.get('/:id', getFish);
console.log("fishRoutes.ts loaded");
router.post('/', createFish);
router.post('/:id/funfact', addFunFact);
router.put('/:id', updateFish);
router.delete('/:id', deleteFish);

//Make the Router Public
export default router;