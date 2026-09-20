import { ImageResponse } from "next/og";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export default function AppleIcon() { return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",background:"#0f172a",borderRadius:32}}><div style={{display:"flex",flexDirection:"column",gap:12,width:90,height:90,background:"white",padding:18}}><div style={{height:12,width:54,background:"#059669"}}/><div style={{height:12,width:38,background:"#2563eb"}}/><div style={{height:12,width:54,background:"#f05a47"}}/></div></div>, size); }
