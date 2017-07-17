import test from 'ava';
import responseToRX from '../lib';

test('title', t => {
  t.not(responseToRX, undefined);
});
