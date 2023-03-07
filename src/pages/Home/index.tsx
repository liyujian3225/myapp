import React, { useState, useEffect, useRef } from 'react'
import MyEditor from "@/components/Editor";
import style from "./index.less"

function App(props: any) {
  const [catalog, setCatalog] = useState([]);
  const refContainer = useRef(null);

  useEffect(() => {
    console.log(refContainer)
    refContainer.current.addEventListener("mousedown", event => {
      if (event.target.tagName !== 'LI') return
      event.preventDefault()
      const id = event.target.id
      console.log(id)
      // editor.scrollToElem(id) // 滚动到标题
    }, [])
  });

  return (
    <>
      <div className={style.leftArea}>
        <ul className={style.headerContainer} ref={refContainer}>
          {catalog.map(item => item)}
        </ul>
      </div>
      <div className={style.rightArea}>
        <MyEditor onHandleChange={(catalog: React.SetStateAction<never[]>) => setCatalog(catalog)}/>
      </div>
    </>
  )
}

export default App;
