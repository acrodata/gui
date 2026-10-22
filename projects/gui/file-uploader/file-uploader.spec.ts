import { GuiFileUploader } from './file-uploader';

describe('GuiFileUploader paste handling', () => {
  let uploader: GuiFileUploader;
  let upload: jasmine.Spy;

  beforeEach(() => {
    uploader = Object.create(GuiFileUploader.prototype) as GuiFileUploader;
    (uploader as any).pastedFiles = new WeakSet<File>();
    uploader.lastPasteFileMeta = { size: 0, type: '' };
    upload = spyOn(uploader, 'upload');
  });

  function paste(file: File) {
    const event = {
      clipboardData: {
        items: [{ type: file.type, getAsFile: () => file }],
      },
      preventDefault: jasmine.createSpy(),
    } as unknown as ClipboardEvent;

    uploader.onPaste(event);
    return event;
  }

  it('uploads distinct images with the same size and MIME type', () => {
    const first = new File(['AAAA'], 'first.png', { type: 'image/png' });
    const second = new File(['BBBB'], 'second.png', { type: 'image/png' });

    expect(first.size).toBe(second.size);
    expect(first.type).toBe(second.type);

    paste(first);
    paste(second);

    expect(upload).toHaveBeenCalledTimes(2);
    expect(upload.calls.argsFor(0)[0].data).toBe(first);
    expect(upload.calls.argsFor(1)[0].data).toBe(second);
  });

  it('ignores a repeated dispatch of the same File object', () => {
    const file = new File(['AAAA'], 'image.png', { type: 'image/png' });

    paste(file);
    paste(file);

    expect(upload).toHaveBeenCalledTimes(1);
    expect(upload.calls.argsFor(0)[0].data).toBe(file);
  });
});
