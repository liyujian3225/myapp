import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig, SlateNode } from '@wangeditor/editor'
import '@wangeditor/editor/dist/css/style.css' // 引入 css

function MyEditor(props: any) {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null)   // TS 语法

  // 编辑器内容
  const [html, setHtml] = useState('<p>hello</p>')

  // 模拟 ajax 请求，异步设置 html
  useEffect(() => {
    setTimeout(() => {
      setHtml('<p>hello world</p>')
    }, 1500)
  }, [])

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = { }  // TS 语法

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {    // TS 语法
    placeholder: '请输入内容...',
  }

  const { onHandleChange } = props;
  // 监听编辑器内容
  const onChange = (editor: IDomEditor) => {
    setHtml(editor.getHtml());
    const headers = editor.getElemsByTypePrefix('header')
    const catalogHTML = headers.map(header => {
      const text = SlateNode.string(header)
      const { id, type }: any = header
      // @ts-ignore
      return <li id={id} type={type}>{text}</li>
    });
    onHandleChange(catalogHTML);
  }

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  return (
    <>
      <div style={{ border: '1px solid #ccc', zIndex: 100}}>
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={onChange}
          mode="default"
          style={{ height: '500px', overflowY: 'hidden' }}
        />
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
        />
      </div>
    </>
  )
}

export default MyEditor
