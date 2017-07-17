import { Observable } from '@reactivex/rxjs';
import { Response } from 'node-fetch';
import { TextDecoder } from 'text-encoding';

export function responseToRXNode(response: Response) {
  const observable = new Observable(observer => {
    const readable = response.body;
    readable.setEncoding('utf-8');

    readable.on('readable', () => {
      let chunk = readable.read() as string;
      while (chunk != null) {
        observer.next(chunk);
        chunk = readable.read() as string;
      }
    });

    readable.on('end', () => {
      return observer.complete();
    });
  });

  return observable;
}

export function responseToRXBrowser(response: Response) {
  const observable = new Observable(observer => {
    const firstReader = (response.body as any).getReader();

    const read = async (reader) => {
      const result = await reader.read();
      if (result.done) {
        return observer.complete();
      }

      observer.next(result.value);
      return read(reader);
    };

    read(firstReader);
  });

  const decoder = new TextDecoder('utf-8');
  return observable.map(uint8array => decoder.decode(uint8array) as string);
}

export function responseToRX(response: Response) {
  return 'getReader' in response.body ? responseToRXBrowser(response) : responseToRXNode(response);
}

export default responseToRX;
