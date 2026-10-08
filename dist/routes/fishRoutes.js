"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fishController_1 = require("../controllers/fishController");
// Create Router to map URLs Requests to the Proper Methods
const router = express_1.default.Router();
// Map Each Corresponding CRUD Functionality URL to its Proper Function in the Controller 
router.get('/', fishController_1.getFishes);
router.get('/:id', fishController_1.getFish);
console.log("fishRoutes.ts loaded");
router.post('/', fishController_1.createFish);
router.post('/:id/funfact', fishController_1.addFunFact);
router.put('/:id', fishController_1.updateFish);
router.delete('/:id', fishController_1.deleteFish);
//Make the Router Public
exports.default = router;
