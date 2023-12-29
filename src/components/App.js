import { useRef, useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { fabric } from "fabric";

const TEMPLATE = [
  '{"version":"5.3.0","objects":[{"type":"rect","version":"5.3.0","originX":"left","originY":"top","left":95,"top":81,"width":200,"height":280,"fill":"yellow","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"rx":0,"ry":0}],"background":"pink"}',
  '{"version":"5.3.0","objects":[{"type":"rect","version":"5.3.0","originX":"left","originY":"top","left":292.71,"top":226.04,"width":200,"height":280,"fill":"yellow","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":48.36,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"rx":0,"ry":0}],"background":"pink"}'
];

export default function () {
  const [template, setTemplate] = useState(0)
  const fabricRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    fabricRef.current = initCanvas();

    return () => {
      fabricRef.current.dispose();
      fabricRef.current = null;
    }
  }, [])

  const initCanvas = () => (
    new fabric.Canvas(canvasRef.current, {
      height: 600,
      width: 450,
      backgroundColor: 'pink' ,
      selection: false,
      renderOnAddRemove: true,
    })
  );

  const addRect = (canvi) => {
    const rect = new fabric.Rect({
      height: 280,
      width: 200,
      fill: 'yellow'
    });
    fabricRef.current.add(rect);
    fabricRef.current.renderAll();
  }

  const onExportJson = () => {
    console.log(JSON.stringify(fabricRef.current))
  }

  const onImport = () => {
    const __json = JSON.parse(TEMPLATE[template]);
    fabricRef.current.loadFromJSON(__json, function() {
      fabricRef.current.renderAll(); 
    })
  }

  return <div className="design-app">
    <div className="design-app__content">
      <div className="design-app__preview">
        <canvas id="MY_FABRIC_CANVAS" ref={ canvasRef }  />
      </div>
      <div className="design-app__options">
        Options
        <button onClick={ e => addRect() }>Add Rect</button>
        
        <hr />
        <button onClick={ e => onExportJson() }>Export</button>
        <hr />
        <select value={ template } onChange={ e => setTemplate(e.target.value) }>
          {
            TEMPLATE.map((o, _o_index) => {
              return <option value={ _o_index } key={ _o_index }>{ _o_index }</option>
            })
          }
        </select>
        <button onClick={ e => onImport() }>Import</button>
      </div>
    </div>
  </div>
}