import 'dotenv/config'
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    MESSAGE_MICROSERVICE_HOST: string;
    MESSAGE_MICROSERVICE_PORT: number;

    USER_MICROSERVICE_HOST: string;
    USER_MICROSERVICE_PORT: number;
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    MESSAGE_MICROSERVICE_HOST: joi.string().required(),
    MESSAGE_MICROSERVICE_PORT: joi.number().required(),

    USER_MICROSERVICE_HOST: joi.string().required(),
    USER_MICROSERVICE_PORT: joi.number().required(),
}).unknown(true);

const {error, value} = envsSchema.validate(process.env);

if(error){
    throw new Error(`Config validation error: ${error.message}`);
}
const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    messagesMicroserviceHost: envVars.MESSAGE_MICROSERVICE_HOST,
    messagesMicroservicePort: envVars.MESSAGE_MICROSERVICE_PORT,

    usersMicroserviceHost: envVars.USER_MICROSERVICE_HOST,
    usersMicroservicePort: envVars.USER_MICROSERVICE_PORT,
};