"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser")); // Accepts the JSON Body in the POST and PUT Commands
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc")); //Generates the API Documentation
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const mongoose_1 = __importDefault(require("mongoose"));
const fishRoutes_1 = __importDefault(require("./routes/fishRoutes"));
const itemRoutes_1 = __importDefault(require("./routes/itemRoutes"));
const app = (0, express_1.default)();
// Configuring the Application to Parse HTTP Request Bodies
app.use(body_parser_1.default.json());
// Setup the Database Connection
const dbUri = process.env.DB;
mongoose_1.default.connect(dbUri)
    .then(() => { console.log('Connected to MongoDB'); })
    .catch((err) => { console.log(`Connection Failed: ${err.message}`); });
app.get('/test', (req, res) => {
    res.json({ message: 'This is the correct server' });
});
// Dispatch the URL
app.use('/api/v1/fish', fishRoutes_1.default);
app.use('/api/v1/item', itemRoutes_1.default);
// Configuration for the Swagger API Documentation
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'InnerTide API',
            version: '1.0.0'
        }
    },
    apis: ['./dist/controllers/*.js'] // Location of API Method
};
const openApiSpecs = (0, swagger_jsdoc_1.default)(options);
app.use('/api-docs', swagger_ui_express_1.default.serve);
// Hardcoding the Swagger CSS and JS Links Using the public Content Delivery Network (CND)
app.get('/api-docs', (req, res) => {
    const html = swagger_ui_express_1.default.generateHTML(openApiSpecs, {
        customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
        customJs: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js'
        ]
    });
    res.send(html);
});
console.log("Fish Router Loaded");
app.listen(4000, () => { console.log('Server Running on Port 4000'); });
