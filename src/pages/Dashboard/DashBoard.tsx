import DashBoardCreate from "@/components/DashBoard_Info/DashBoardCreate"
import DashBoardInfo from "@/components/DashBoard_Info/DashBoardInfo"

const DashBoard = () => {
  return (
    <div className="max-w-6xl mx-auto">
        <DashBoardCreate/>
        <DashBoardInfo/>
    </div>
  )
}

export default DashBoard