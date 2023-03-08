import MyEditor from '@/components/Editor';
import React, { useEffect, useRef, useState } from 'react';
import style from './index.less';

function App() {
  const [catalog, setCatalog] = useState([]);
  const refCatalog = useRef(null);
  const refEditor = useRef(null);

  const onClickCatalog = (event: {
    target: { tagName: string; id: any };
    preventDefault: () => void;
  }) => {
    if (event.target.tagName !== 'LI') return;
    event.preventDefault();
    const id = event.target.id;
    refEditor.current.onHandleCatalog(id);
  };

  useEffect(() => {
    if (!refCatalog.current) return;
    refCatalog.current.onclick = function (event) {
      onClickCatalog(event);
    };
  }, []);

  return (
    <>
      <div className={style.leftArea}>
        <ul className={style.headerContainer} ref={refCatalog}>
          {catalog.map(({ id, type, text }) => (
            <li id={id} type={type} key={id}>
              {text}
            </li>
          ))}
        </ul>
      </div>
      <div className={style.rightArea}>
        <MyEditor
          ref={refEditor}
          onHandleChange={(catalog: React.SetStateAction<never[]>) => setCatalog(catalog)}
        />
      </div>
    </>
  );
}

export default App;
