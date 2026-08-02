import "./footer.css"

const lastBlockData=[
  {
    id:1,
    title:"Resume Analysis",
    description:"Upload your resume and get Ai-powered analysis with key skills and suggestions."
  },
  {
    id:2,
    title:"Al-Powered Questions",
    description:"Get role-specific interview questions tailored to your experience and skills."
  },
  {
    id:3,
    title:"Smart Feedback",
    description:"Receive instant Al feedback and detailed analysis to improve your answers."
  },
  {
    id:4,
    title:"Performance Analytics",
    description:"Track your progress with insightful analytics and performance trends."
  },{
    id:5,
    title:"Learning Roadmap",
    description:"Get a personalized learning plan to improve your weak areas and grow faster."
  },{
    id:6,
    title:"Voice Interviews",
    description:"Practice real-time voice interviews with Al for a real interview experience."
  },

]

export default function Footer(){
  return(
<div className="last-part">
  <div className="last-top">

    <div className="last-top-one">Everything You Need to Succeed</div>
    <div className="last-top-two">Our Al coach helps you practice, improve, and ace your interviews.</div>
     </div>
 <div className="last-blocks">
        {lastBlockData.map((item) => (
          <div className="last-block" key={item.id}>
            <div className="last-block-icon"></div>
            <div className="last-block-title">{item.title} </div>
            <div className="last-block-dis"> {item.description}</div>

          </div>
        ))}
  </div>

</div>
  )
}
