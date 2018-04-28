import { BoolToYesNoPipe } from './bool-to-yes-no.pipe';

describe('BoolToYesNoPipe', () => {
  it('create an instance', () => {
    const pipe = new BoolToYesNoPipe();
    expect(pipe).toBeTruthy();
  });
});
