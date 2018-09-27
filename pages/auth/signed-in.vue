<template>
	<p>Signing in...</p>
</template>

<script>
import { setToken, checkSecret, extractInfoFromHash } from '~/utils/auth'

export default {
	async mounted () {
		const { token, secret } = extractInfoFromHash()
		if (!checkSecret(secret) || !token) {
			console.error('Something happened with the Sign In request')
		}
		await setToken(token)
		this.$router.replace('/')
	}
}
</script>
	