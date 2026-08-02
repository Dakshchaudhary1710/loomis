import "./header.css";

const landpageTop=[
  {
id:1,
title:"Home"
  },
  {
    id:2,
title:"Features"
  },
 { 
  id:3, 
title:"How It Works"
 }
 ,{
  id:4,
title:"About Us"
 },{id:5,
  title:"Contact"
 },
]

export default function Header(){
  return(
    <div className="full-head">
<div className="left-part">
  <div className="left-title-icon"></div>
  <div className="left-title"> Ai Interview Coach</div>
</div>
<div className="middle-part">
{landpageTop.map((item)=>(
 <div className="middle-elements">{item.title}</div>
))}
</div>
<div className="right-part">
  <div className="right-end">
    <div className="right-end-1">login</div>
    <button className="right-end-2">Get Started Free</button>
  </div>
</div>
    </div>

  )
}