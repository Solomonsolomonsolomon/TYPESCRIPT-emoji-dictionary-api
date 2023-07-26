import { Response, Request, NextFunction } from "express";
export declare function generateApiKey(apikey?: string): string;
export declare function getHostName(req: Request, res: Response): void;
export declare function addApiKey(req: Request, res: Response): Promise<void>;
export declare function verifyKey(req: Request, res: Response, next: NextFunction): void;
