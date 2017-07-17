"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("@reactivex/rxjs");
const text_encoding_1 = require("text-encoding");
function responseToRXNode(response) {
    const observable = new rxjs_1.Observable(observer => {
        const readable = response.body;
        readable.setEncoding('utf-8');
        readable.on('readable', () => {
            let chunk = readable.read();
            while (chunk != null) {
                observer.next(chunk);
                chunk = readable.read();
            }
        });
        readable.on('end', () => {
            return observer.complete();
        });
    });
    return observable;
}
exports.responseToRXNode = responseToRXNode;
function responseToRXBrowser(response) {
    const observable = new rxjs_1.Observable(observer => {
        const firstReader = response.body.getReader();
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
    const decoder = new text_encoding_1.TextDecoder('utf-8');
    return observable.map(uint8array => decoder.decode(uint8array));
}
exports.responseToRXBrowser = responseToRXBrowser;
function responseToRX(response) {
    return 'getReader' in response.body ? responseToRXBrowser(response) : responseToRXNode(response);
}
exports.responseToRX = responseToRX;
exports.default = responseToRX;
