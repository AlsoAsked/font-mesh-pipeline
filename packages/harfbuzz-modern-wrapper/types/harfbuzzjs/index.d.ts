declare module "@alsoasked/harfbuzzjs/hb.wasm" {
  export class HBBinary {}

  // I don't know why, but webpack interprets
  // the imported module as a promise
  declare const instance: Promise<HBBinary>;
  export default instance;
}

declare module "@alsoasked/harfbuzzjs/hbjs.js" {
  export class HBBlob {
    destroy();
  }

  export class HBFace {
    upem: number;

    destroy();
  }

  export type SVGPathCommand =
    | { type: "M"; values: [number, number] }
    | { type: "L"; values: [number, number] }
    | { type: "Q"; values: [number, number, number, number] }
    | { type: "C"; values: [number, number, number, number, number, number] }
    | { type: "Z"; values: [] };

  export class HBFont {
    glyphName(glyphId: number): string;
    glyphToPath(glyphId: number): string;
    glyphToJson(glyphId: number): SVGPathCommand[];

    destroy();
  }

  export class HBBuffer {
    addText(text: string);
    guessSegmentProperties();
    setDirection(dir: "ltr" | "rtl" | "ttb" | "btt");
    setLanguage(language: string);
    setScript(script: string);
    json(): {
      g: number;
      cl: number;
      ax: number;
      ay: number;
      dx: number;
      dy: number;
    }[];

    destroy();
  }

  export class HBHandle {
    createBlob(blob: Uint8Array): HBBlob;
    createFace(blob: HBBlob, index: number): HBFace;
    createFont(face: HBFace): HBFont;
    createBuffer(): HBBuffer;

    shape(font: HBFont, buffer: HBBuffer);
  }

  declare const hbjs: (instance: { exports: HBBinary }) => HBHandle;
  export default hbjs;
}
