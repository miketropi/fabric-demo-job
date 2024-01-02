import { useRef, useEffect, useState, Fragment } from "react";
import { useAppContext } from "../context/AppContext";
import { fabric } from "fabric";
import { copyToClipboard } from '../lib/helpers'
import bg1 from '../../images/bento-lunch-box-1.jpg';
import bg2 from '../../images/bento-lunch-box-2.jpg';
import thumb1 from '../../images/Unicorn-Product-Icon-School-Supplies_3.webp'
import thumb2 from '../../images/Jungle-Category-Icon-Designer-Label-v2_2.png'

const TEMPLATE = [
  {
    name: 'Pony',
    template: '{"version":"5.3.0","objects":[{"type":"image","version":"5.3.0","originX":"left","originY":"top","left":0,"top":80,"width":546,"height":502,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":0.83,"scaleY":0.83,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"http://127.0.0.1:8080/images/bento-lunch-box-1.jpg?ae29f69632a2d6b928af26b3de93037b","crossOrigin":null,"filters":[]},{"type":"text","version":"5.3.0","originX":"left","originY":"top","left":163,"top":370,"width":188.07,"height":27.12,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":0.69,"scaleY":0.69,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"fontFamily":"Arial","fontWeight":"normal","fontSize":24,"text":"Hello this is a text","underline":false,"overline":false,"linethrough":false,"textAlign":"center","fontStyle":"normal","lineHeight":1.16,"textBackgroundColor":"","charSpacing":0,"styles":[],"direction":"ltr","path":null,"pathStartOffset":0,"pathSide":"left","pathAlign":"baseline"}],"background":"pink"}',
    'thumb': thumb1,

  },
  {
    name: 'Animal',
    template: '{"version":"5.3.0","objects":[{"type":"image","version":"5.3.0","originX":"left","originY":"top","left":-0.73,"top":83,"width":544,"height":508,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":0.83,"scaleY":0.83,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"http://127.0.0.1:8080/images/bento-lunch-box-2.jpg?1071aad1698c19b2439589fa49e7a9d2","crossOrigin":null,"filters":[]},{"type":"text","version":"5.3.0","originX":"left","originY":"top","left":155,"top":368,"width":188.07,"height":27.12,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":0.75,"scaleY":0.75,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"fontFamily":"Arial","fontWeight":"normal","fontSize":24,"text":"Hello this is a text","underline":false,"overline":false,"linethrough":false,"textAlign":"center","fontStyle":"normal","lineHeight":1.16,"textBackgroundColor":"","charSpacing":0,"styles":[],"direction":"ltr","path":null,"pathStartOffset":0,"pathSide":"left","pathAlign":"baseline"}],"background":"pink"}',
    thumb: thumb2
  }
];

const BACKGROUND = [bg1, bg2];

export default function () {
  const [template, setTemplate] = useState(0);
  const [background, setBackground] = useState(0);
  const [name, setName] = useState('Hello Sunny!')
  const fabricRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    fabricRef.current = initCanvas();

    return () => {
      fabricRef.current.dispose();
      fabricRef.current = null;
    }
  }, [])

  useEffect(() => {
    // console.log(fabricRef.current)
    const objArr = fabricRef.current.getObjects();
    // console.log(objs);
    objArr.forEach(_o => {
      if(_o.type == 'text') {
        _o.set('text', name);
        fabricRef.current.renderAll();
      }
    });
  }, [name]);

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

  const onAddImage = () => {
    const _image = BACKGROUND[background];
    fabric.Image.fromURL(_image, (img) => {
      fabricRef.current.add(img); 
    });
  }

  const onAddText = () => {
    fabricRef.current.add(new fabric.Text('Hello this is a text', { 
      fontFamily: 'Arial', 
      left: 100, 
      top: 100,
      textAlign: 'center',
      fontSize: 24,
    }));
  }

  const onExportJson = () => {
    let jsonString = JSON.stringify(fabricRef.current);
    copyToClipboard(jsonString);
    console.log(jsonString)
  }

  const onImport = (_index) => {
    const __json = JSON.parse(TEMPLATE[_index].template);
    fabricRef.current.loadFromJSON(__json, function() {
      fabricRef.current.renderAll(); 
    }, function(o, object) {
      
      if(object.type == 'text') {
        object.set('text', name);
        fabricRef.current.renderAll();
      }
      // canvas.sendToBack(o[0]);
    })
  }

  const __c = () => {
    return <>
      Build Template Demo
        <hr />
        {/* <button onClick={ e => addRect() }>Add Rect</button> */}
        <select value={ background } onChange={ e => setBackground(e.target.value) }>
          {
            BACKGROUND.map((o, _o_index) => {
              return <option value={ _o_index } key={ _o_index }>BG_{ _o_index }</option>
            })
          }
        </select><br />
        <button onClick={ e => onAddImage() }>Add Background</button>
        <hr />
        <button onClick={ e => onAddText() }>Add Text</button>
        <hr />
        <button onClick={ e => onExportJson() }>Copy To Clipboard</button>
        <hr />
        <select value={ template } onChange={ e => setTemplate(e.target.value) }>
          {
            TEMPLATE.map((o, _o_index) => {
              return <option value={ _o_index } key={ _o_index }>{ _o_index }</option>
            })
          }
        </select><br />
        <button onClick={ e => onImport() }>Load Template</button>
    </>
  }

  const __user = () => {
    return <>
      Select design
      <ul className="__opts">
        {
          TEMPLATE.map((t, t_index) => {
            return <li key={ t_index } onClick={ e => onImport(t_index) }>
              <img src={ t.thumb } />
            </li>
          })
        }
      </ul>
      <hr />
      Your Name <br />
      <input type="text" value={ name } onInput={ e => setName(e.target.value) } />
    </>
  }

  return <div className="design-app">
    <div className="design-app__content">
      <div className="design-app__preview">
        <canvas id="MY_FABRIC_CANVAS" ref={ canvasRef }  />
      </div>
      <div className="design-app__options">
        { __user() }
      </div>
    </div>
  </div>
}

