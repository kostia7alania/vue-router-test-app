const isSubscribed = () => Promise.resolve(!!window.localStorage.getItem("has-license"))

const subscribersMiddleware = async ({ /* to, from, */ redirect }) => {
  if (!await isSubscribed()) {
    console.log("isn't subscribed, redirect to license")
    redirect({ name: 'license' })
  }
}

export default subscribersMiddleware
