import { useSelector } from 'react-redux'

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth)
  console.log(userInfo)
  return (
    <div>
      <h1>welcome</h1>
    </div>
  )
}

export default ProfileScreen
