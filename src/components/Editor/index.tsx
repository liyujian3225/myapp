import { IDomEditor, IEditorConfig, IToolbarConfig, SlateNode } from '@wangeditor/editor';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import style from './index.less';

const MyEditor = forwardRef((props: any, ref) => {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null); // TS 语法

  // 编辑器内容
  const [html, setHtml] = useState('<p>hello</p>');

  // 模拟 ajax 请求，异步设置 html
  useEffect(() => {
    setTimeout(() => {
      setHtml('<p>hello world</p>');
    });
  }, []);

  useImperativeHandle(ref, () => ({
    onHandleCatalog: (id: string) => {
      if (editor === null) return;
      editor.scrollToElem(id);
    },
  }));

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {
    toolbarKeys: ['bold', 'italic'],
  };

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    // TS 语法
    placeholder: '请输入内容...',
  };

  // 监听编辑器内容
  const { onHandleChange } = props;
  const onChange = (editor: IDomEditor) => {
    setHtml(editor.getHtml());
    const headers = editor.getElemsByTypePrefix('header');
    const catalogList = headers.map((header) => {
      const text = SlateNode.string(header);
      const { id, type }: any = header;
      return { id, type, text };
    });
    onHandleChange(catalogList);
  };

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor === null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <>
      <div className={style.editorContainer}>
        <Editor
          className={style.editorDom}
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={onChange}
          mode="default"
        />
        <Toolbar
          className={style.toolBarDom}
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
        />
      </div>
    </>
  );
});

export default MyEditor;
