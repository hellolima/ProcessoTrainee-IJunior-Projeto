
interface PayloadParams {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface Env {
	DB: string;
	DB_USER: string;
	DB_PASSWORD: string;
	DB_HOST: string;
	SECRET_KEY: string;
	NODE_ENV: string;
	JWT_EXPIRATION: string;
	APP_URL: string;
} 

export {}
declare global {
    namespace Express {
        interface Request{
            user?: PayloadParams;  
        }
    };

    namespace NodeJS {
        interface ProcessEnv extends Env {};
    };
}