"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFunFact = exports.deleteFish = exports.updateFish = exports.createFish = exports.getFish = exports.getFishes = void 0;
const fish_1 = __importDefault(require("../models/fish"));
/**
 * @swagger
 * /api/v1/fish:
 *   get:
 *     summary: List Every Fish in the Database
 *     responses:
 *       200:
 *         description: A List of Fish Were Found
 *       404:
 *         description: No Fish Were Found
*/
const getFishes = async (req, res) => {
    try {
        console.log("GET FISHES CONTROLLER HIT");
        const filter = req.query;
        console.log("Before Fish.find");
        const fish = await fish_1.default.find(filter);
        console.log("After Fish.find");
        return res.status(200).json(fish);
    }
    catch (error) {
        console.error("GET FISHES ERROR");
        console.error(error);
        return res.status(500).json({
            message: error.message,
            stack: error.stack
        });
    }
};
exports.getFishes = getFishes;
/**
 * @swagger
 * /api/v1/fish/{id}:
 *   get:
 *     summary: List an Fish by It's Id
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: The Automatically Generated Id of the Fish to Update
 *     responses:
 *        200:
 *          description: A Single Fish was Found
 *        400:
 *          description: No Fish was Found
 */
const getFish = async (req, res) => {
    // Try to Fetch Selected Game by its id From URL Param
    const fish = await fish_1.default.findById(req.params.id);
    // Error Handle
    if (!fish) {
        return res.status(404).json({ message: 'Fish Not Found' });
    }
    // Return Selected Fish
    return res.status(200).json(fish);
};
exports.getFish = getFish;
/**
 * @swagger
 * /api/v1/fish:
 *   post:
 *     summary: Create a New Fish
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sprite:
 *                 type: string
 *                 required: true
 *               species:
 *                 type: string
 *                 required: true
 *               description:
 *                 type: string
 *                 required: true
 *               price:
 *                 type: number
 *                 required: true
 *                 min: 0
 *               height:
 *                 type: number
 *                 required: true
 *                 min: 1
 *               width:
 *                 type: number
 *                 required: true
 *                 min: 1
 *     responses:
 *       201:
 *         description: Fish was Created
 *       400:
 *         description: Invalid Request was Made
 */
const createFish = async (req, res) => {
    console.log("CREATE FISH CONTROLLER HIT");
    try {
        console.log("Request body:", req.body);
        if (!req.body) {
            return res.status(400).json({
                Err: "Failed to Create Fish"
            });
        }
        const fish = await fish_1.default.create(req.body);
        return res.status(201).json(fish);
    }
    catch (error) {
        console.error("Fish Creation Error:", error);
        return res.status(400).json({
            Err: "Failed to Create Fish",
            Message: error.message,
            ValidationErrors: error.errors
        });
    }
};
exports.createFish = createFish;
/**
 * @swagger
 * /api/v1/fish/{id}:
 *   put:
 *     summary: Update the Information of a Fish by its Id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *           description: The Automatically Generated Id of the Fish to Update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sprite:
 *                 type: string
 *                 required: true
 *               species:
 *                 type: string
 *                 required: true
 *               description:
 *                 type: string
 *                 required: true
 *               price:
 *                 type: number
 *                 required: true
 *                 minLength: 0
 *               height:
 *                 type: number
 *                 required: true
 *                 min: 1
 *               width:
 *                 type: number
 *                 required: true
 *                 min: 1
 *     responses:
 *       204:
 *         description: Fish Information was Successfully Updated
 *       400:
 *         description: Fish was not Found
 */
const updateFish = async (req, res) => {
    //Check if the Id in the Request is a Valid Id
    if (!req.params.id) {
        return res.status(400).json({ 'Error': 'Bad Request, Request Must Include an Id Parameter' });
    }
    await fish_1.default.findByIdAndUpdate(req.params.id, req.body); // Find the Fish by It's Id Then Update it Based on the Request Information
    return res.status(204).json({ 'Message': 'Fish Successfully Updated' }); // Send a No Content Status Response
};
exports.updateFish = updateFish;
/**
 * @swagger
 * /api/v1/fish/{id}:
 *   delete:
 *     summary: Remove an Fish by its Id
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Automatically Generated Id of the Fish to Delete
 *     responses:
 *       204:
 *         description: Fish was Successfully Delete
 *       400:
 *         description: Fish was not Found
 */
const deleteFish = async (req, res) => {
    //Check if the Id in the Request is a Valid Id
    if (!req.params.id) {
        return res.status(400).json({ 'Error': 'Bad Request, Request Must Include an Id Parameter' });
    }
    await fish_1.default.findByIdAndDelete(req.params.id); // Find the Fish by It's Id Then Delete it
    return res.status(204).json({ 'Message': 'Fish Successfully Deleted' }); // Send a No Content Status Response
};
exports.deleteFish = deleteFish;
/**
 * @swagger
 * /api/v1/fish/{id}/funfact:
 *   post:
 *     summary: Add a Fun Fact to an Fish by the Fish's Id
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: The Automatically Generated Id of the Fish to Update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fact:
 *                 type: string
 *     responses:
 *        200:
 *          description: A Fun Fact was Added
 *        400:
 *          description: No Fish was Found / Invalid Request Body
 */
const addFunFact = async (req, res) => {
    try { // Try Catch to Ensure .findById Doesn't Throw an Error, When Invalid Id is Given
        //Check if the Id in the Request is a Valid Id
        if (!req.params.id) {
            return res.status(400).json({ 'Error': 'Bad Request, Request Must Include an Id Parameter' });
        }
        const fish = await fish_1.default.findById(req.params.id); // Fetch 
        if (!fish) {
            return res.status(404).json({ message: 'No Fish Found' });
        }
        // If the Request Body is Invalid (i.e: Like if name Property is Missing) 
        if (!req.body) {
            return res.status(400).json({ 'Error': 'Invalid Request Body' }); // Send a Bad Request Response
        }
        fish.funFacts.push(req.body);
        await fish.save();
        return res.status(200).json(fish);
    }
    catch (err) {
        return res.status(400).json({ message: 'No Fish Found' });
    }
};
exports.addFunFact = addFunFact;
