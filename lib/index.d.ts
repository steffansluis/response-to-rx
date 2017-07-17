import { Observable } from '@reactivex/rxjs';
import { Response } from 'node-fetch';
export declare function responseToRXNode(response: Response): Observable<{}>;
export declare function responseToRXBrowser(response: Response): Observable<string>;
export declare function responseToRX(response: Response): Observable<{}>;
export default responseToRX;
