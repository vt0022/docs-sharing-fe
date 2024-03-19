import { useEffect, useState } from 'react'
import Splash from '../scenes/splash/Splash'
import { useSelector } from 'react-redux'
import AuthNavigator from './AuthNavigator'
import { authSelector } from '../redux/reducers/userSlice'
import MainNavigator from './MainNavigator'

const AppRouters = () => {
  const [isShowSplash, setIsShowSplash] = useState(true)
  const auth = useSelector(authSelector)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false)
    }, 1500)

    return () => clearTimeout(timeout)
  }, [])

  return <>{isShowSplash ? <Splash /> : auth.accesstoken ? <MainNavigator /> : <AuthNavigator />}</>
}

export default AppRouters
