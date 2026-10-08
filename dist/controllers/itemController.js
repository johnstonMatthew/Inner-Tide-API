"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.createItem = exports.getItem = exports.getItems = void 0;
const item_1 = __importDefault(require("../models/item"));
/**
 * @swagger
 * /api/v1/item:
 *   get:
 *     summary: List Every Item in the Database
 *     responses:
 *       200:
 *         description: A List of Items That Were Found
 *       404:
 *         description: No Items Were Found
*/
const getItems = async (req, res) => {
    // Use req.query Property to Check for any URL Search Filter.  Returns keys/vals After ? 
    const filter = req.query;
    // Returns all Entries Within Event Collection From MongoDB. Filter is a Possible Overload Which is Nullable
    const items = await item_1.default.find(filter);
    if (!items || items.length === 0) {
        return res.status(404).json({ message: 'No Items found' });
    }
    return res.status(200).json(items);
};
exports.getItems = getItems;
/**
 * @swagger
 * /api/v1/item/{id}:
 *   get:
 *     summary: List an Item by It's Id
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: The Automatically Generated Id of the Item to Update
 *     responses:
 *        200:
 *          description: A Single Fish was Found
 *        400:
 *          description: No Fish was Found
 */
const getItem = async (req, res) => {
    // Try to Fetch Selected Game by its id From URL Param
    const item = await item_1.default.findById(req.params.id);
    // Error Handle
    if (!item) {
        return res.status(404).json({ message: 'Item Not Found' });
    }
    // Return Selected Item
    return res.status(200).json(item);
};
exports.getItem = getItem;
/**
 * @swagger
 * /api/v1/item:
 *   post:
 *     summary: Create a New Item
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sprite:
 *                 type: string
 *                 required: true
 *               name:
 *                 type: string
 *                 required: true
 *               description:
 *                 type: string
 *                 required: true
 *               price:
 *                 type: number
 *                 required: true
 *                 minLength: 0
 *               gridSpace:
 *                 type: string
 *                 required: true
 *     responses:
 *       201:
 *         description: Item was Created
 *       400:
 *         description: Invalid Request was Made
 */
const createItem = async (req, res) => {
    console.log("CREATE ITEM CONTROLLER HIT");
    try {
        console.log("Request body:", req.body);
        if (!req.body) {
            return res.status(400).json({
                Err: 'Invalid Request Body'
            });
        }
        const item = await item_1.default.create(req.body);
        return res.status(201).json(item);
    }
    catch (error) {
        console.error("Item Creation Error:", error);
        return res.status(400).json({
            Err: 'Failed to Create Item',
            error: error
        });
    }
};
exports.createItem = createItem;
/**
 * @swagger
 * /api/v1/item/{id}:
 *   put:
 *     summary: Update the Information of an Item by its Id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *           description: The Automatically Generated Id of the Item to Update
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
 *               name:
 *                 type: string
 *                 required: true
 *               description:
 *                 type: string
 *                 required: true
 *               price:
 *                 type: number
 *                 required: true
 *                 minLength: 0
 *               gridSpace:
 *                 type: string
 *                 required: true
 *     responses:
 *       204:
 *         description: Item Information was Successfully Updated
 *       400:
 *         description: Item was not Found
 */
const updateItem = async (req, res) => {
    //Check if the Id in the Request is a Valid Id
    if (!req.params.id) {
        return res.status(400).json({ 'Error': 'Bad Request, Request Must Include an Id Parameter' });
    }
    await item_1.default.findByIdAndUpdate(req.params.id, req.body); // Find the Item by It's Id Then Update it Based on the Request Information
    return res.status(204).json({ 'Message': 'Item Successfully Updated' }); // Send a No Content Status Response
};
exports.updateItem = updateItem;
/**
 * @swagger
 * /api/v1/item/{id}:
 *   delete:
 *     summary: Remove an Item by its Id
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Automatically Generated Id of the Item to Delete
 *     responses:
 *       204:
 *         description: Item was Successfully Delete
 *       400:
 *         description: Item was not Found
 */
const deleteItem = async (req, res) => {
    //Check if the Id in the Request is a Valid Id
    if (!req.params.id) {
        return res.status(400).json({ 'Error': 'Bad Request, Request Must Include an Id Parameter' });
    }
    await item_1.default.findByIdAndDelete(req.params.id); // Find the Item by It's Id Then Delete it
    return res.status(204).json({ 'Message': 'Item Successfully Deleted' }); // Send a No Content Status Response
};
exports.deleteItem = deleteItem;
