import { Response } from 'express';
export const emptyCheck = <T>(data: T, response: Response): T | number => {
    if (data) {
        response.send(data);
        return data;
    } else {
        response.send(404);
        return 404;
    }
};
