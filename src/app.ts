import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';// Accepts the JSON Body in the POST and PUT Commands
import swaggerJsDoc from 'swagger-jsdoc'; //Generates the API Documentation
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';

import fishRouter from './routes/fishRoutes';
import itemRouter from './routes/itemRoutes';

const app: Application = express();

// Configuring the Application to Parse HTTP Request Bodies
app.use(bodyParser.json());

// Setup the Database Connection
const dbUri = process.env.DB!;

console.log("DB variable exists:", !!process.env.DB);

mongoose.connect(dbUri)
.then(() => { console.log('Connected to MongoDB') })
.catch((err: Error) => { console.log(`Connection Failed: ${err.message}`)});

app.get('/test', (req: Request, res: Response) => {
    res.json({ message: 'This is the correct server' });
});

// Dispatch the URL
app.use('/api/v1/fish', fishRouter);
app.use('/api/v1/item', itemRouter);

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

const openApiSpecs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve);

// Hardcoding the Swagger CSS and JS Links Using the public Content Delivery Network (CND)
app.get('/api-docs', (req: Request, res: Response) => {
    const html: string = swaggerUi.generateHTML(openApiSpecs, {
        customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
        customJs: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js'
        ]
    });

    res.send(html);
});
console.log("Fish Router Loaded");
app.listen(4000, () => { console.log('Server Running on Port 4000') } );
