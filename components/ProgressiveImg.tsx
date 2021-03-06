import {useEffect, useState} from 'react';
// 这是图片预加载
const ProgressiveImg = ({ src, ...props }) => {
  const placeholderSrc = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODBweCIgIGhlaWdodD0iODBweCIgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iLTIwMCAtMjAwIDUwMCA1MDAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBjbGFzcz0ibGRzLXN0cmlwZSIgc3R5bGU9ImJhY2tncm91bmQ6IHJnYigyNTQsIDI1MCwgMTk5KSBub25lIHJlcGVhdCBzY3JvbGwgMCUgMCU7Ij4KICAgIDxkZWZzPgogICAgICA8cGF0dGVybiBpZD0iYmxhaCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiPgogICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDcuOCAwKSI+CiAgICAgICAgICA8ZyB0cmFuc2Zvcm09InJvdGF0ZSgyMCA1MCA1MCkgc2NhbGUoMS4yKSI+CiAgICAgICAgICAgIDxyZWN0IHg9Ii0yMCIgeT0iLTEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTIwIiAgZmlsbD0ib3JhbmdlIi8+CiAgICAgICAgICAgIDxyZWN0IHg9Ii0xMCIgeT0iLTEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTIwIiAgZmlsbD0iI2ZmZmZjYiIvPgogICAgICAgICAgICA8cmVjdCB4PSIwIiB5PSItMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMjAiICBmaWxsPSJvcmFuZ2UiLz4KICAgICAgICAgICAgPHJlY3QgeD0iMTAiIHk9Ii0xMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEyMCIgIGZpbGw9IiNmZmZmY2IiLz4KICAgICAgICAgICAgPHJlY3QgeD0iMjAiIHk9Ii0xMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEyMCIgIGZpbGw9Im9yYW5nZSIvPgogICAgICAgICAgICA8cmVjdCB4PSIzMCIgeT0iLTEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTIwIiAgZmlsbD0iI2ZmZmZjYiIvPgogICAgICAgICAgICA8cmVjdCB4PSI0MCIgeT0iLTEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTIwIiAgZmlsbD0ib3JhbmdlIi8+CiAgICAgICAgICAgIDxyZWN0IHg9IjUwIiB5PSItMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMjAiICBmaWxsPSIjZmZmZmNiIi8+CiAgICAgICAgICAgIDxyZWN0IHg9IjYwIiB5PSItMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMjAiICBmaWxsPSJvcmFuZ2UiLz4KICAgICAgICAgICAgPHJlY3QgeD0iNzAiIHk9Ii0xMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEyMCIgIGZpbGw9IiNmZmZmY2IiLz4KICAgICAgICAgICAgPHJlY3QgeD0iODAiIHk9Ii0xMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEyMCIgIGZpbGw9Im9yYW5nZSIvPgogICAgICAgICAgICA8cmVjdCB4PSI5MCIgeT0iLTEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTIwIiAgZmlsbD0iI2ZmZmZjYiIvPgogICAgICAgICAgICA8cmVjdCB4PSIxMDAiIHk9Ii0xMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEyMCIgIGZpbGw9Im9yYW5nZSIvPgogICAgICAgICAgICA8cmVjdCB4PSIxMTAiIHk9Ii0xMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEyMCIgIGZpbGw9Im9yYW5nZSIvPgogICAgICAgICAgPC9nPgogICAgICAgICAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJ0cmFuc2xhdGUiIHZhbHVlcz0iMCAwOzI2IDAiIGtleVRpbWVzPSIwOzEiICByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyI+PC9hbmltYXRlVHJhbnNmb3JtPgogICAgICAgIDwvZz4KICAgICAgPC9wYXR0ZXJuPgogICAgPC9kZWZzPgogICAgPHJlY3QgIGZpbGw9InVybCgjYmxhaCkiIHJ4PSIxNSIgcnk9IjE1IiB4PSI1IiB5PSIzNiIgc3Ryb2tlPSJvcmFuZ2UiIHN0cm9rZS13aWR0aD0iNSIgd2lkdGg9IjkwIiBoZWlnaHQ9IjI4Ii8+CiAgPC9zdmc+Cg==';
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
  const customClass =
    placeholderSrc && imgSrc === placeholderSrc ? "loading" : "loaded";
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
    };
  }, [src,setImgSrc]);
  return (
    <img
      {...{ src: imgSrc, ...props }}
      alt={props.alt || ""}
      className={`image ${customClass}`}
    />
  );
};
export default ProgressiveImg;
