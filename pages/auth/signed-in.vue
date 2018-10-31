<template>
	<p>Signing in...</p>
</template>

<script>
import { setToken, checkSecret, extractInfoFromHash } from '~/utils/auth'
import jwtDecode from 'jwt-decode'
import user from '@/apis/user'

export default {
	async mounted () {
		const { token, secret } = extractInfoFromHash()
		if (!checkSecret(secret) || !token) {
			console.error('Something happened with the Sign In request')
		}
		const userInfo = jwtDecode(token)
		// craete auth0 user
		const auth0User = {
			auth0Sub: userInfo.sub,
			auth0User: JSON.stringify(userInfo)
		}
		const auth0UserInfo = await user.auth0Create({ auth0User })
		console.log(auth0UserInfo)
		setToken({ token: auth0UserInfo.authToken })
		this.$store.commit('SET_USER', auth0UserInfo)
		this.$router.replace('/user')
	}
}
</script>
	