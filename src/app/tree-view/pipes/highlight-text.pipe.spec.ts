import { HighlightTextPipe } from './highlight-text.pipe';

describe('Highlighttext pipe unit tests', () => {
  let pipeComp: HighlightTextPipe;
  let sanitizerSpy;

  beforeAll(() => {
    sanitizerSpy = {
      bypassSecurityTrustHtml: (val) => val
    };
    pipeComp = new HighlightTextPipe(sanitizerSpy);
  });

  it('should be truthy', () => {
    expect(pipeComp).toBeDefined();
  });

  it('should add mark tag with class highlight if matching text found', () => {
    let result = pipeComp.transform('hello world', 'hello');
    expect(result).toBe('<mark class="search-highlight">hello</mark> world');
  });

  it('should return same input if matching not found', () => {
    let result = pipeComp.transform('hello world', 'test');
    expect(result).toBe('hello world');
  });

  it('should return same input if search text is empty', () => {
    let result = pipeComp.transform('hello world', '');
    expect(result).toBe('hello world');
  });
});