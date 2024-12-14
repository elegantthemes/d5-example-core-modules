import { extractLinkTitle } from '..';


describe('extractLinkTitle', () => {
  it('should extract the title from a link', () => {
    const link  = '<a href="https://www.example.com" title="My Title Example">Example</a>';
    const title = extractLinkTitle(link);

    expect(title).toBe('Example');
  });

  it('should extract the title from a link with a class', () => {
    const link  = '<a class="example" href="https://www.example.com" title="My Title Example">Example</a>';
    const title = extractLinkTitle(link);

    expect(title).toBe('Example');
  });

  it('should extract the title from a link with a target', () => {
    const link  = '<a href="https://www.example.com" target="_blank" title="My Title Example">Example</a>';
    const title = extractLinkTitle(link);

    expect(title).toBe('Example');
  });

  it('should extract the title from a link with a rel', () => {
    const link  = '<a href="https://www.example.com" rel="noopener noreferrer" title="My Title Example">Example</a>';
    const title = extractLinkTitle(link);

    expect(title).toBe('Example');
  });

  it('should extract the title from a link with a class, target, and rel', () => {
    const link  = '<a class="example" href="https://www.example.com" target="_blank" rel="noopener noreferrer" title="My Title Example">Example</a>';
    const title = extractLinkTitle(link);

    expect(title).toBe('Example');
  });

  it('should extract the title from a link with special character within the title', () => {
    const link  = '<a class="example" href="https://www.example.com" target="_blank" rel="noopener noreferrer" title="My Title Example">Example >></a>';
    const title = extractLinkTitle(link);

    expect(title).toBe('Example >>');
  });

  it('should extract the title from a link with HTML tag within the title', () => {
    const link  = '<a class="example" href="https://www.example.com" target="_blank" rel="noopener noreferrer" title="My Title Example"><strong>Strong</strong> Example</a>';
    const title = extractLinkTitle(link);

    expect(title).toBe('<strong>Strong</strong> Example');
  });
});
