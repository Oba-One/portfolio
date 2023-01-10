class MediaWorker extends Worker {
  constructor() {
    super(new URL('./Worker.js', import.meta.url));
  }
}