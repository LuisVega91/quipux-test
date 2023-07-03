import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the string unmodified if it is shorter than the limit', () => {
    const result = pipe.transform('hello', 10);
    expect(result).toEqual('hello');
  });

  it('should truncate the string and add ellipsis if it is longer than the limit', () => {
    const result = pipe.transform('hello world', 5);
    expect(result).toEqual('hello...');
  });

});
