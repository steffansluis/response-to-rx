import { Observable } from '@reactivex/rxjs';
import { Response } from 'node-fetch';
export declare function responseToRXNode(response: Response): Observable<{}>;
export declare function responseToRXBrowser(response: Response): void;
export declare function responseToRX(response: Response): void | Observable<{}>;
export default responseToRX;
