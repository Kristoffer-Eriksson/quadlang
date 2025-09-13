import { Renderer } from './renderer';

function quadlang_init() {
    const canvas = document.querySelector<HTMLCanvasElement>('#quadlang-main-canvas');
    if (canvas === null) {
        console.error('Unable to find #quadlang-main-canvas');
        return;
    }
    const renderer = new Renderer(canvas);
    window.addEventListener("resize", renderer.resize);
    renderer.start();
}

if (document.readyState === 'complete') {
    quadlang_init();
} else {
    document.addEventListener('DOMContentLoaded', quadlang_init);
}