"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const itemController_1 = require("../controllers/itemController");
// Create Router to map URLs Requests to the Proper Methods
const router = express_1.default.Router();
// Map Each Corresponding CRUD Functionality URL to its Proper Function in the Controller 
router.get('/', itemController_1.getItems);
router.get('/:id', itemController_1.getItem);
router.post('/', itemController_1.createItem);
router.put('/:id', itemController_1.updateItem);
router.delete('/:id', itemController_1.deleteItem);
//Make the Router Public
exports.default = router;
