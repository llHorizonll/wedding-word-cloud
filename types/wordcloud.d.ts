declare module 'wordcloud' {
  function WordCloud(
    element: HTMLCanvasElement,
    options: {
      list: [string, number][];
      weightFactor: number;
      fontFamily: string;
      color: string;
      rotateRatio: number;
      rotationSteps: number;
      backgroundColor: string;
      minSize: number;
      gridSize?: number;
    }
  ): void;
  export default WordCloud;
} 