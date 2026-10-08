import express, { Router } from 'express';
import { getItems, getItem, createItem, updateItem, deleteItem } from '../controllers/itemController';

// Create Router to map URLs Requests to the Proper Methods
const router: Router = express.Router();

// Map Each Corresponding CRUD Functionality URL to its Proper Function in the Controller 
router.get('/', getItems);
router.get('/:id', getItem);

router.post('/', createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

//Make the Router Public
export default router;